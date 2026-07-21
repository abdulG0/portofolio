import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, consultationType, company, description } = body;

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here you would typically send an email or save to a database
    // For now, we'll just log it and return success
    console.log("[v0] Consultation request received:", {
      name,
      email,
      phone,
      consultationType,
      company,
      description,
      timestamp: new Date().toISOString(),
    });

    // Example: Send email via service (Resend, SendGrid, etc.)
    // await sendConsultationEmail({ name, email, phone, consultationType, company, description });

    return NextResponse.json(
      { success: true, message: "Consultation request received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Consultation request error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
