import { IUser } from "@/app/interfaces/user";
import { hashPassword, isValidEmail } from "@/app/lib/func";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: IUserRequest, res: NextApiResponse) {
  const { email, password, fullName } = req.body;
  const errors: string[] = [];

  if (!isValidEmail(email)) errors.push("Email is not valid");
  if (password.length < 6) errors.push("Password is too short");
  if (password.length > 20) errors.push("Password is too long");

  if (errors.length > 0) {
    res.status(400).json({
      message: errors.join(" - "),
    });
    return;
  }

  try {
    const user = await prisma.user.create({
      data: { email, password: hashPassword(password), fullName },
    });
    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({
        message: error.message,
      });
    }
    console.log("Error ", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export async function GET(req: NextApiRequest) {
    
}

export async function PATCH(req: NextApiRequest) {}

export async function DELETE(req: NextApiRequest) {}

interface IUserRequest extends NextApiRequest {
  body: IUser;
}
