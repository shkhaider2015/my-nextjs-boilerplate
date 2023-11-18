"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "@/components/Common/InputField";

export const schema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().min(1, "Email is required").email("Invalid"),
  password: z.string(),
  confirmPassword: z.string(),
  gender: z.string().min(0),
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
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form
        className="w-1/3 h-3/4 bg-gray-900 rounded flex flex-col items-center pl-4 pr-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-center mt-4 font-bold pb-4">Register</h2>
        <Controller
          name="fullName"
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <InputField
              error={error ? error.message : undefined}
              onChange={onChange}
              value={value}
              placeholder="Full Name"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <InputField
              error={error ? error.message : undefined}
              onChange={onChange}
              value={value}
              placeholder="Email"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <InputField
              error={error ? error.message : undefined}
              onChange={onChange}
              value={value}
              placeholder="Password"
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <InputField
              error={error ? error.message : undefined}
              onChange={onChange}
              value={value}
              placeholder="Confirm Password"
            />
          )}
        />

        {/* <div className="w-9/12 h-8  mt-5 border-white rounded-lg">
          <input
            className="w-full h-full rounded-lg text-black"
            {...register("fullName")}
            type="text"
          />
        </div>
        {errors?.fullName && <p>{errors.fullName.message}</p>}
        <div className="w-9/12 h-8  mt-5 border-white rounded-lg">
          <input
            className="w-full h-full rounded-lg text-black"
            {...register("email")}
            type="text"
          />
        </div>
        {errors?.email && <p>{errors.email.message}</p>}
        <div className="w-9/12 h-8  mt-5 border-white rounded-lg">
          <input
            className="w-full h-full rounded-lg text-black"
            {...register("password")}
            type="text"
          />
        </div>
        {errors?.password && <p>{errors.password.message}</p>}
        <div className="w-9/12 h-8  mt-5 border-white rounded-lg">
          <input
            className="w-full h-full rounded-lg text-black"
            {...register("confirmPassword")}
            type="text"
          />
        </div>
        {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <div className="w-9/12 mt-5 flex justify-start items-center">
          <input type="radio" {...register("gender")} id="male" />
          <label className="ml-1" htmlFor="male">
            Male
          </label>
          <input
            className="ml-5"
            type="radio"
            {...register("gender")}
            id="female"
          />
          <label className="ml-1" htmlFor="female">
            Female
          </label>
        </div>
        {errors?.gender && <p>{errors.gender.message}</p>} */}

        <button
          type="submit"
          className="w-9/12 bg-slate-600 pt-2 pb-2 mt-12 rounded-lg hover:bg-slate-100 hover:text-black "
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default RegisterScreen;
