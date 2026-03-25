import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, idea, email } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: "Missing idea" }, { status: 400 });
    }

    const subject = `Idea from the Void: ${idea.split(" ").slice(0, 6).join(" ")}`;

    // Email to Harshad
    await resend.emails.send({
      from: "Harshad Portfolio <onboarding@resend.dev>",
      to: "harshadshinde@gmail.com",
      subject,
      html: `
        <h2>Idea from the Void</h2>
        ${name ? `<p><strong>From:</strong> ${name}</p>` : "<p><em>Anonymous</em></p>"}
        <p><strong>Idea:</strong> ${idea}</p>
        ${email ? `<p><strong>Reply to:</strong> ${email}</p>` : ""}
      `,
    });

    // Confirmation email to visitor
    if (email) {
      await resend.emails.send({
        from: "Harshad Portfolio <onboarding@resend.dev>",
        to: email,
        subject: "Your idea landed safely",
        html: `
          <p>Hi${name ? ` ${name}` : ""},</p>
          <p>Your idea made it through the void:</p>
          <blockquote style="border-left: 3px solid #E8630A; padding-left: 12px; color: #555;">${idea}</blockquote>
          <p>Harshad will read it. Thanks for being curious enough to explore.</p>
          <p style="color: #999; font-size: 12px;">— Harshad's World</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Idea email error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
