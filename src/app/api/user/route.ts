import { IUser } from "@/interfaces/user";
import {
  _isJSON,
  hashPassword,
  isValidEmail,
  requestPostContent,
} from "@/lib/func";
import prisma from "@/lib/prisma";
import { IRequestContentReturn, TIsJSON } from "@/interfaces/common";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { serialize } from "object-to-formdata";

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
  let fullName = data.get("fullName")?.toString();

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and Password are required fields",
      },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) errors.push("Email is not valid");
  if (password.length < 6) errors.push("Password is too short");
  if (password.length > 20) errors.push("Password is too long");

  if (errors.length > 0) {
    return NextResponse.json(
      {
        message: errors.length > 1 ? errors : errors.join(""),
      },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: { email, password: hashPassword(password), fullName },
    });
    return NextResponse.json(
      {
        message: "User created successfully",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code == 'P2002')
      {
        return NextResponse.json(
          {
            message: "This email is already registered",
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }
    console.log("Error ", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 400 }
    );
  }
}

export async function GET(req: NextApiRequest) {}

export async function PATCH(req: NextApiRequest) {}

export async function DELETE(req: NextApiRequest) {}

// interface IUserRequest extends NextApiRequest {
//   body: IUser;
// }
