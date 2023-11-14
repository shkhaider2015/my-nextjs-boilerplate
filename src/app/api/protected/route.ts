import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  return NextResponse.json(
    { message: "Protected API" },
    { status: 200 }
  );
}
