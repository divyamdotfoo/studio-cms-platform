import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const password = searchParams.get("password");
  const user = searchParams.get("user");
  const otp = searchParams.get("otp");

  /* ──────────────────────────────────────────────────
   * Step 1 — Password verification + send OTP email
   * ?password=<user-entered-password>
   * ────────────────────────────────────────────────── */
  if (password) {
    if (password !== process.env.ad_pass) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const otpCode = String(Math.floor(100000 + Math.random() * 900000));

    const resend = new Resend(process.env.resend);
    const { error } = await resend.emails.send({
      from: "Divyam <onboarding@resend.dev>",
      to: process.env.ad_email!,
      subject: "Admin Login OTP",
      html: `<p>Your OTP for the Vision Architect's Admin Panel is:</p><h1 style="letter-spacing:8px;font-size:36px;">${otpCode}</h1><p>This code is valid for a single use.</p><p style="color:#9ca3af;font-size:11px;margin-top:32px;">this email is automated by the site manager</p>`,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    const hashedOtp = await Bun.password.hash(otpCode);

    return NextResponse.json({
      redirect: `/admin/login?otp=${encodeURIComponent(hashedOtp)}`,
    });
  }

  /* ──────────────────────────────────────────────────
   * Step 2 — OTP verification + set auth cookie
   * ?user=<otp-entered>&otp=<hashed-otp>
   * ────────────────────────────────────────────────── */
  if (user && otp) {
    const isValid = await Bun.password.verify(user, otp);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    const token = await Bun.password.hash(process.env.secret!);

    const response = NextResponse.json({ redirect: "/admin" });
    response.cookies.set("secret", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
