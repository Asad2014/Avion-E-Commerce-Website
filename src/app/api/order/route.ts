

import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.contactNumber || !body.address || !body.cart || body.cart.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid order data" }, { status: 400 });
    }

    const orderData = {
      _type: "order",
      name: body.name,
      email: body.email,
      contactNumber: body.contactNumber,
      address: body.address,
      city: body.city,
      postalCode: body.postalCode,
      country: body.country,
      cart: body.cart,
      totalAmount: body.totalAmount,
      paymentMethod: body.paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const response = await client.create(orderData);

    return NextResponse.json({ success: true, orderId: response._id });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
