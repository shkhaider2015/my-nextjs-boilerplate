import { IRequestContentReturn } from "@/interfaces/common";
import { hashPassword, requestPostContent } from "@/lib/func";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  let data: FormData | null = null;
  const errors: string[] = [];

  const contentType: IRequestContentReturn = await requestPostContent(req);

  if (!contentType.data) {
    return NextResponse.json({ message: contentType.message }, { status: 401 });
  } else {
    data = contentType.data;
  }

  if (!data) {
    throw { message: "Something wrong happen" };
  }

  let email = data?.get("email")?.toString();
  let password = data.get("password")?.toString();

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and Password are required fields",
      },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email, password: hashPassword(password) },
    });

    if(!user) throw({custom_message: "Invalid credentials"})
    

    return NextResponse.json(
      {
        message: "Successfully logged In",
        data: exclude(user, ['password'])
      },
      { status: 200 }
    );
    
  } catch (error:any) {
     return NextResponse.json(
      {
        message: error?.custom_message ? error?.custom_message : "Something went wrong",
      },
      { status: 400 }
    );
  }

}

// Function to exclude user password returned from prisma
function exclude(user:any, keys:string[]) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}