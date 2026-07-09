// app/checkout/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function CheckoutPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { id } = await params;
      const response = await fetch(`/api/products/${id}`);
      const result = await response.json();
      setProduct(result.data);
      if (result.data?.images?.length > 0) {
        setSelectedImage(result.data.images[0]);
      }
    };
    fetchProduct();
  }, [params]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product.sizes?.length > 0 && !selectedSize) {
        alert("Select a size before placing the order.");
        return;
      }

      const payload = {
        customer: { name: formData.name, email: formData.email, phone: formData.phone },
        shippingAddress: {
          address: formData.address, city: formData.city,
          state: formData.state, pincode: formData.pincode, country: formData.country,
        },
        product,
        selectedSize,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!result.success) { alert(result.message || "Failed to create order"); return; }

      // Ensure Razorpay SDK is available — load it on-demand if the async
      // script hasn't fired onLoad yet (e.g. slow network / first render).
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          if (document.querySelector('script[src*="razorpay"]') && !window.Razorpay) {
            // Script tag exists but hasn't finished — wait for it
            const existing = document.querySelector('script[src*="razorpay"]');
            existing.addEventListener("load", resolve, { once: true });
            existing.addEventListener("error", reject, { once: true });
          } else {
            const s = document.createElement("script");
            s.src = "https://checkout.razorpay.com/v1/checkout.js";
            s.onload = resolve;
            s.onerror = reject;
            document.body.appendChild(s);
          }
        }).catch(() => { alert("Razorpay SDK failed to load. Please check your internet connection."); return; });
        if (!window.Razorpay) return; // guard after catch
      }
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: result.razorpayOrderId,
        amount: product.price * 100,
        currency: "INR",
        name: "IT World",
        description: product.title,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        handler: async (razorpayResponse) => {
          try {
            const verifyResponse = await fetch("/api/orders/verifyorder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: razorpayResponse.razorpay_order_id,
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpaySignature: razorpayResponse.razorpay_signature,
              }),
            });
            const verifyResult = await verifyResponse.json();
            if (verifyResult.success) {
              alert("Payment Successful");
              setFormData({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", country: "India" });
              setSelectedSize("");
            } else {
              alert(verifyResult.message || "Payment Verification Failed");
            }
          } catch (err) {
            console.error(err);
            alert("Payment Verification Failed");
          }
        },
        theme: { color: "#0d0d0d" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const discount = product?.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  // ── Skeleton ─────────────────────────────────────────────
  if (!product) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="text-[10px] tracking-[.3em] uppercase text-[#444] font-sans animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-transparent border border-[#2a2a2a] text-[#e8e0d0] placeholder-[#444] px-4 py-3 text-sm font-sans tracking-wide focus:outline-none focus:border-[#8a7a5a] transition-colors duration-300";

  return (
    <>
 <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="afterInteractive"
      onLoad={() => setRazorpayLoaded(true)}
      onError={() => console.error("Razorpay script failed to load")}
    />
      <div className="min-h-screen bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">

          {/* Page eyebrow */}
          <div className="mb-10 md:mb-14">
            <p className="text-[9px] tracking-[.3em] uppercase text-[#444] font-sans">
             DIMON — Checkout
            </p>
            <div className="w-8 h-px bg-[#2a2a2a] mt-3" />
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* ── LEFT: Images ── */}
            <div className="lg:w-[47%]">
              <div className="sticky top-8 space-y-3">

                {/* Main image */}
                <div className="overflow-hidden bg-[#0d0d0d] border border-[#1a1a1a] aspect-square md:aspect-[4/5]">
                  <img
                    src={selectedImage || product.image}
                    alt={product.title}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top grayscale-[20%] brightness-[0.85] hover:grayscale-0 hover:brightness-95 transition-all duration-700"
                  />
                </div>

                {/* Thumbnails */}
                {product.images?.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{scrollbarWidth: "none"}}>
                    {product.images.map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border transition-all duration-300 ${
                          selectedImage === imgUrl
                            ? "border-[#8a7a5a]"
                            : "border-[#1e1e1e] opacity-50 hover:opacity-80 hover:border-[#3a3a3a]"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`View ${i + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Product + Form ── */}
            <div className="lg:w-[53%] flex flex-col space-y-10">

              {/* Product info */}
              <div>
                {/* Title row */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-[9px] tracking-[.25em] uppercase text-[#555] font-sans mb-2">
                      {product.category} · SKU {product.sku}
                    </p>
                    <h1
                      className="text-2xl md:text-3xl text-[#e8e0d0] font-normal tracking-[.04em] leading-snug"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {product.title}
                    </h1>
                  </div>
                  {product.isLimited && (
                    <span className="shrink-0 border border-[#2a2a2a] text-[#8a7a5a] text-[8px] px-3 py-1.5 tracking-[.2em] uppercase font-sans">
                      Limited
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mt-5">
                  <span className="text-3xl md:text-4xl text-[#c8b99a] font-sans font-normal">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-base text-[#444] line-through font-sans">
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                  {discount && (
                    <span className="text-sm text-[#8a7a5a] font-sans">{discount}% off</span>
                  )}
                </div>

                {product.isLimited && product.stock && (
                  <p className="text-[9px] tracking-[.15em] uppercase text-[#5a4a3a] font-sans mt-2">
                    Only {product.stock} pieces exist
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {[product.gender, product.ageCategory].filter(Boolean).map((tag) => (
                    <span key={tag}
                      className="border border-[#2a2a2a] text-[#555] text-[9px] px-3 py-1 tracking-[.1em] uppercase font-sans">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mt-7">
                  {[
                    { label: "Material", value: product.material },
                    { label: "Fit", value: product.fit },
                    { label: "Color", value: Array.isArray(product.colors) ? product.colors.join(" + ") : product.colors },
                    { label: "Gender", value: product.gender },
                  ].map(({ label, value }) => value && (
                    <div key={label} className="bg-[#0d0d0d] px-4 py-3">
                      <p className="text-[9px] tracking-[.15em] uppercase text-[#555] font-sans mb-1">{label}</p>
                      <p className="text-sm text-[#b0a898] font-sans">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Size selector */}
                {product.sizes?.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[9px] tracking-[.2em] uppercase text-[#555] font-sans mb-3">
                      Size {selectedSize && <span className="text-[#8a7a5a]">— {selectedSize}</span>}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button key={size} type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-xs tracking-[.12em] uppercase font-sans border transition-all duration-300 ${
                            selectedSize === size
                              ? "border-[#8a7a5a] text-[#e8e0d0] bg-[#1a1612]"
                              : "border-[#2a2a2a] text-[#555] hover:border-[#3a3a3a] hover:text-[#888]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {product.description && (
                  <div className="mt-8">
                    <div className="w-8 h-px bg-[#2a2a2a] mb-4" />
                    <p className="text-[9px] tracking-[.25em] uppercase text-[#555] font-sans mb-3">
                      About {product.title}
                    </p>
                    <p className="text-sm text-[#666] font-sans leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#1a1a1a]" />
                <p className="text-[9px] tracking-[.25em] uppercase text-[#333] font-sans">Delivery</p>
                <div className="flex-1 h-px bg-[#1a1a1a]" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">

                <p className="text-[9px] tracking-[.2em] uppercase text-[#555] font-sans mb-4">
                  Contact Information
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                  <input type="text" name="name" placeholder="Full Name"
                    value={formData.name} onChange={handleChange}
                    className={inputClass} required />
                  <input type="tel" name="phone" placeholder="Phone Number"
                    value={formData.phone} onChange={handleChange}
                    className={inputClass} required />
                </div>
                <input type="email" name="email" placeholder="Email Address"
                  value={formData.email} onChange={handleChange}
                  className={inputClass} required />

                <p className="text-[9px] tracking-[.2em] uppercase text-[#555] font-sans pt-4 pb-1">
                  Shipping Address
                </p>

                <textarea name="address" placeholder="Flat, House no., Building, Apartment"
                  value={formData.address} onChange={handleChange}
                  className={`${inputClass} resize-none`} rows={3} required />

                <div className="grid grid-cols-2 gap-3">
                  <input type="text" name="city" placeholder="City / Town"
                    value={formData.city} onChange={handleChange}
                    className={inputClass} required />
                  <input type="text" name="state" placeholder="State"
                    value={formData.state} onChange={handleChange}
                    className={inputClass} required />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input type="text" name="pincode" placeholder="Pincode"
                    value={formData.pincode} onChange={handleChange}
                    className={inputClass} required />
                  <input type="text" name="country" value={formData.country}
                    className={`${inputClass} text-[#444] cursor-not-allowed`}
                    readOnly />
                </div>

                {/* CTA */}
                <div className="pt-6 pb-4">
                  <button type="submit"
                    className="w-full border border-[#8a7a5a] text-[#8a7a5a] py-4 text-[10px] tracking-[.25em] uppercase font-sans hover:bg-[#8a7a5a] hover:text-[#080808] transition-all duration-500">
                    Acquire · ₹{product.price.toLocaleString("en-IN")}
                  </button>
                  <p className="text-center text-[9px] tracking-[.15em] uppercase text-[#333] font-sans mt-4">
                    Secured via Razorpay
                  </p>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}