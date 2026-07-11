let cachedToken = null;

export async function getShiprocketToken() {
  const API_EMAIL = process.env.SHIPROCKET_API_EMAIL;
  const API_PASSWORD = process.env.SHIPROCKET_API_PASSWORD;
  const API_URL = process.env.SHIPROCKET_API_URL || 'https://apiv2.shiprocket.in/v1/external';

  if (!API_EMAIL || !API_PASSWORD) {
    throw new Error("Shiprocket API credentials missing in environment variables.");
  }

  if (cachedToken) {
    return cachedToken;
  }

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: API_EMAIL, password: API_PASSWORD }),
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Shiprocket authentication failed: ${res.statusText} (${errorDetails})`);
  }

  const data = await res.json();
  cachedToken = data.token;
  return cachedToken;
}

export async function getShippingRates(deliveryPostcode, weight = 0.5, isRetry = false) {
  const API_URL = process.env.SHIPROCKET_API_URL || 'https://apiv2.shiprocket.in/v1/external';
  const pickupPostcode = process.env.SHIPROCKET_PICKUP_POSTCODE || '110001';
  
  const token = await getShiprocketToken();
  const queryParams = new URLSearchParams({
    pickup_postcode: pickupPostcode,
    delivery_postcode: deliveryPostcode,
    weight: String(weight),
    cod: '0',
    mode: 'Surface'
  });

  const res = await fetch(`${API_URL}/courier/serviceability?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    if (res.status === 401 && !isRetry) {
      cachedToken = null;
      return getShippingRates(deliveryPostcode, weight, true);
    }
    throw new Error(`Failed to fetch shipping rates: ${res.statusText}`);
  }

  const result = await res.json();
  
  if (!result.status || result.status !== 200) {
    throw new Error(result.message || "Failed to fetch shipping rates from Shiprocket");
  }

  const availableCouriers = result.data?.available_courier_companies;
  if (!availableCouriers || availableCouriers.length === 0) {
    throw new Error("Pincode is not serviceable for shipping.");
  }

  // Find the cheapest courier option
  const cheapest = availableCouriers.reduce((min, cur) => {
    return Number(cur.rate) < Number(min.rate) ? cur : min;
  }, availableCouriers[0]);

  return {
    courierName: cheapest.courier_name,
    rate: Number(cheapest.rate),
    etd: cheapest.etd || "",
    courierCompanyId: cheapest.courier_company_id,
  };
}

export async function createShiprocketOrder(order, shippingCharge, isRetry = false) {
  if (!order || !order.shippingAddress) {
    throw new Error("Cannot create Shiprocket order: Shipping address is missing on the order.");
  }

  const API_URL = process.env.SHIPROCKET_API_URL || 'https://apiv2.shiprocket.in/v1/external';
  const token = await getShiprocketToken();

  const nameParts = order.customer.name.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || ".";

  const dateObj = new Date(order.createdAt || Date.now());
  const orderDate = dateObj.toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
    .slice(0, 16);

  const orderData = {
    order_id: order._id.toString(),
    order_date: orderDate,
    pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",
    billing_customer_name: firstName,
    billing_last_name: lastName,
    billing_address: order.shippingAddress.address,
    billing_city: order.shippingAddress.city,
    billing_pincode: order.shippingAddress.pincode,
    billing_state: order.shippingAddress.state,
    billing_country: "India",
    billing_email: order.customer.email,
    billing_phone: order.customer.phone,
    shipping_is_billing: true,
    order_items: [
      {
        name: order.product.selectedSize
          ? `${order.product.title} - Size ${order.product.selectedSize}`
          : order.product.title,
        sku: order.product.productId.toString(),
        units: order.product.quantity || 1,
        selling_price: order.product.price,
      }
    ],

    payment_method: "Prepaid",
    sub_total: order.amount - shippingCharge,
    shipping_charges: shippingCharge,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5
  };

  const res = await fetch(`${API_URL}/orders/create/adhoc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData)
  });

  if (!res.ok) {
    if (res.status === 401 && !isRetry) {
      cachedToken = null;
      return createShiprocketOrder(order, shippingCharge, true);
    }
    const errDetails = await res.json().catch(() => ({}));
    throw new Error(`Shiprocket order creation failed: ${JSON.stringify(errDetails)}`);
  }

  const data = await res.json();
  return {
    shiprocketOrderId: data.order_id,
    shipmentId: data.shipment_id,
  };
}

export async function assignAwb(shipmentId, isRetry = false) {
  const API_URL = process.env.SHIPROCKET_API_URL || 'https://apiv2.shiprocket.in/v1/external';
  const token = await getShiprocketToken();

  const res = await fetch(`${API_URL}/courier/assign/awb`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shipment_id: shipmentId })
  });

  if (!res.ok) {
    if (res.status === 401 && !isRetry) {
      cachedToken = null;
      return assignAwb(shipmentId, true);
    }
    const errDetails = await res.json().catch(() => ({}));
    throw new Error(`AWB assignment failed: ${JSON.stringify(errDetails)}`);
  }

  const data = await res.json();
  const awbData = data.response?.data;
  if (!awbData) {
    throw new Error(`Shiprocket AWB response was invalid: ${JSON.stringify(data)}`);
  }

  return {
    awbCode: awbData.awb_code,
    courierName: awbData.courier_name,
    trackingUrl: `https://shiprocket.co/tracking/${awbData.awb_code}`,
  };
}
