import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const BRIDGEE_API_BASE = process.env.BRIDGEE_API_BASE_URL ?? "https://api.usebridgee.com";
const BRIDGEE_API_KEY = process.env.BRIDGEE_API_KEY;

export async function POST(request: Request) {
  if (!BRIDGEE_API_KEY) {
    return NextResponse.json(
      { isSuccess: false, statusCode: "500", message: "Server is missing BRIDGEE_API_KEY." },
      { status: 500 },
    );
  }

  const body = await request.json();

  const res = await fetch(`${BRIDGEE_API_BASE}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": BRIDGEE_API_KEY,
      "Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => null);

  if (!json) {
    return NextResponse.json(
      { isSuccess: false, statusCode: String(res.status), message: "Unexpected response from Bridgee." },
      { status: res.status },
    );
  }

  return NextResponse.json(json, { status: res.status });
}