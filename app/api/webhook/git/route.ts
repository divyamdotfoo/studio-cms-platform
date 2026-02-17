import { NextRequest, NextResponse } from "next/server";
import { inspect } from "util";

export async function POST(req: NextRequest) {
  const body = await req.json();

  /* Log the full request payload with unlimited depth */
  console.log(inspect(body, { depth: null, colors: true }));

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });

  // const action = body.action;
  // const deploymentStatus = body.deployment_status;

  // if (!deploymentStatus) {
  //   return NextResponse.json(
  //     { message: "Not a deployment_status event" },
  //     { status: 200 }
  //   );
  // }

  // /* Only send mail when state is "success" */
  // if (deploymentStatus.state !== "success") {
  //   return NextResponse.json(
  //     { message: `Ignored deployment status: ${deploymentStatus.state}` },
  //     { status: 200 }
  //   );
  // }

  // const adEmail = process.env.ad_email;
  // const devEmail = process.env.dev_email;
  // const resendKey = process.env.resend;

  // if (!adEmail || !devEmail || !resendKey) {
  //   console.error("Missing env vars: ad_email, dev_email, or resend");
  //   return NextResponse.json(
  //     { error: "Server misconfigured" },
  //     { status: 500 }
  //   );
  // }

  // const environment = deploymentStatus.environment ?? "production";
  // const deploymentUrl =
  //   deploymentStatus.environment_url || deploymentStatus.target_url || "";
  // const description = deploymentStatus.description ?? "";

  // const resend = new Resend(resendKey);

  // const { error } = await resend.emails.send({
  //   from: "Divyam <onboarding@resend.dev>",
  //   to: [adEmail, devEmail],
  //   subject: "Website Updated — New Changes Deployed",
  //   html: `
  //     <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
  //       <h2 style="color:#10b981;">Deployment Successful</h2>
  //       <p>The website has been updated with the latest changes and is now live.</p>
  //       <table style="margin:16px 0;font-size:14px;line-height:1.6;">
  //         <tr><td style="padding-right:12px;font-weight:600;">Environment</td><td>${environment}</td></tr>
  //         ${
  //           description
  //             ? `<tr><td style="padding-right:12px;font-weight:600;">Description</td><td>${description}</td></tr>`
  //             : ""
  //         }
  //         ${
  //           deploymentUrl
  //             ? `<tr><td style="padding-right:12px;font-weight:600;">URL</td><td><a href="${deploymentUrl}">${deploymentUrl}</a></td></tr>`
  //             : ""
  //         }
  //         <tr><td style="padding-right:12px;font-weight:600;">Deployed at</td><td>${new Date(
  //           deploymentStatus.updated_at
  //         ).toLocaleString()}</td></tr>
  //       </table>
  //       <p style="color:#6b7280;font-size:13px;">This is an automated notification from the GitHub deployment webhook.</p>
  //     </div>
  //   `,
  // });

  // if (error) {
  //   console.error("Failed to send deployment email:", error);
  //   return NextResponse.json(
  //     { error: "Failed to send email" },
  //     { status: 500 }
  //   );
  // }

  // return NextResponse.json(
  //   { message: "Deployment success email sent" },
  //   { status: 200 }
  // );
}
