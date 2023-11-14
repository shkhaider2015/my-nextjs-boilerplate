import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  return NextResponse.json(
    { message: "Auth API" },
    { status: 200 }
  );
}