import { IRequestContentReturn, TIsJSON } from "@/interfaces/common";
import { SHA256 as sha256 } from "crypto-js";
import { NextRequest } from "next/server";
import { serialize } from "object-to-formdata";

export const hashPassword = (value: string) => {
  return sha256(value).toString();
};

export const isValidEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const _isJSON = (req: NextRequest) => {
  const contentType = req.headers.get("content-type");
  let isJson: TIsJSON = null;

  if (!contentType) isJson = null;
  else if (contentType === "application/json") isJson = "JSON";
  else if (contentType.includes("multipart/form-data")) isJson = "Form";
  else isJson = "WRONG";

  return isJson;
};

export const requestPostContent = async (
  req: NextRequest
): Promise<IRequestContentReturn> => {
  let result: IRequestContentReturn = {
    data: null,
    message: "",
  };
  const contentType: TIsJSON = _isJSON(req);
  if (!contentType) {
    result.message = "Data in a body is not known";
  }

  if (contentType === "JSON") result.data = serialize(await req.json());
  if (contentType === "Form") result.data = await req.formData();
  if (contentType === "WRONG") {
    result.message = "Only JSON or Form data is valid";
  }

  return result;
};

