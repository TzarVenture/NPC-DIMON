import { NextResponse } from "next/server";

const API_EMAIL = process.env.SHIPROCKET_API_EMAIL;
const API_PASSWORD = process.env.SHIPROCKET_API_PASSWORD;

export async function POST() {
  const res = await fetch(
    `${process.env.SHIPROCKET_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: API_EMAIL, password: API_PASSWORD }),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json({ token: data.token });
}
