"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "@/components/Common/InputField";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import RadioButton from "@/components/Common/RadioButton";

const schema = z
  .object({
    fullName: z.string().min(1,"Full name is required" ),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid Email address" }),
    password: z.string().min(6, { message: "Password is minimum 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    gender: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: "male" | "female";
};

type Schema = z.infer<typeof schema>;

const RegisterScreen = () => {
  // const session = await getServerSession();
  const { handleSubmit, control } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Schema> = (data) =>
    console.log("Data : ", data);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form
        className="w-1/3 h-3/4 bg-gray-900 rounded flex flex-col items-center pl-4 pr-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center mt-4 font-bold pb-4">Register</h2>
        <Controller
          name="fullName"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputField
              error={error ? error.message : undefined}
              onChange={onChange}
              value={value}
              placeholder="Email"
              icon={() => <EnvelopeIcon className="h-8 w-5 text-gray-400" />}
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
              type="password"
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
              type="password"
            />
          )}
        />
        <div className="w-full flex justify-start items-center">
          <Controller
            name="gender"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error },
              formState,
            }) => (
              <RadioButton
                label="Male"
                error={error ? error.message : undefined}
                onChange={(e) => onChange(e.target.checked ? "male" : null)}
                checked={value === "male"}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error },
              formState,
            }) => (
              <RadioButton
                label="Female"
                // error={error ? error.message : undefined}
                onChange={(e) => onChange(e.target.checked ? "female" : null)}
                checked={value === "female"}
              />
            )}
          />
        </div>

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
