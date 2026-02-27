import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function GET() {
  const store = await headers();
  const secret = store.get("secret");

  if (!secret || secret !== process.env.PAYLOAD_SECRET!)
    return NextResponse.json({}, { status: 500 });

  revalidatePath("/");

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);

  return NextResponse.json({ cron: "successfull" }, { status: 200 });
}
