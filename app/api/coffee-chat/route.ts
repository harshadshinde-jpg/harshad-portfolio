import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, what, email, time, notes } = await req.json();

    if (!name || !what || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Harshad Portfolio <onboarding@resend.dev>",
      to: "harshadshinde@gmail.com",
      subject: `Coffee Chat Request from ${name}`,
      html: `
        <h2>Coffee Chat Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>What they're working on:</strong> ${what}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Preferred time:</strong> ${time || "Not specified"}</p>
        ${notes ? `<p><strong>Discussion topic:</strong> ${notes}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Coffee chat email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
