import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { inspect } from "util";

export async function POST(req: NextRequest) {
  const body = await req.json();

  /* Log the full request payload with unlimited depth */
  console.log(inspect(body, { depth: null, colors: true }));

  const deploymentStatus = body.deployment_status;
  const deployment = body.deployment;

  if (!deploymentStatus || !deployment) {
    return NextResponse.json(
      { message: "Not a deployment_status event" },
      { status: 200 }
    );
  }

  if (deploymentStatus.state !== "success") {
    return NextResponse.json(
      { message: `Ignored deployment status: ${deploymentStatus.state}` },
      { status: 200 }
    );
  }

  const adEmail = process.env.ad_email;
  const devEmail = process.env.dev_email;
  const resendKey = process.env.resend;

  if (!adEmail || !devEmail || !resendKey) {
    console.error("Missing env vars: ad_email, dev_email, or resend");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const resend = new Resend(resendKey);

  const { error } = await resend.emails.send({
    from: "Divyam <onboarding@resend.dev>",
    to: [adEmail, devEmail],
    subject: "Website Updated — New Changes Deployed",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
        <h2>Deployment Successful</h2>
        <p>The website has been updated with the latest changes and is now live.</p>
        <p style="color:#9ca3af;font-size:11px;margin-top:32px;">this email is automated by the site manager</p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send deployment email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Deployment success email sent" },
    { status: 200 }
  );
}
