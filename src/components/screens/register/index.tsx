"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const schema = z.object({
    fullName: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, "Email is required").email("Invalid"),
    password: z.string(),
    confirmPassword: z.string(),
    gender: z.string(),
  });
  
 export type FormValues = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender?: "male" | "female";
  };

  const RegisterScreen = () => {
    // const session = await getServerSession();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const onSubmit = handleSubmit((data) => console.log(data));
  
    return (
      <main className="w-screen h-screen flex justify-center items-center">
        <form
          className="w-1/3 h-3/4 bg-gray-900 rounded flex flex-col items-center"
          onSubmit={onSubmit}
        >
          <h2 className="text-center mt-4 font-bold pb-4">Register</h2>
          <div className="w-9/12 h-8  mt-5 border-white rounded-lg">
            <input
              className="w-full h-full rounded-lg text-black"
              {...register("fullName")}
              type="text"
            />
          </div>
          <div className="w-9/12 h-8  mt-5 border-white rounded-lg">
            <input
              className="w-full h-full rounded-lg text-black"
              {...register("email")}
              type="text"
            />
          </div>
          <div className="w-9/12 h-8  mt-5 border-white rounded-lg">
            <input
              className="w-full h-full rounded-lg text-black"
              {...register("password")}
              type="text"
            />
          </div>
          <div className="w-9/12 h-8  mt-5 border-white rounded-lg">
            <input
              className="w-full h-full rounded-lg text-black"
              {...register("confirmPassword")}
              type="text"
            />
          </div>
  
          <div className="flex flex-row justify-start items-center">
            <label htmlFor="male">Male</label>
            <input type="radio" {...register("gender")} id="male" />
            <label htmlFor="female">Female</label>
            <input type="radio" {...register("gender")} id="female" />
          </div>
  
          <button type="submit">Submit</button>
        </form>
      </main>
    );
  }

export default RegisterScreen