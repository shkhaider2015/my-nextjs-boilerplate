"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { ReactNode, useState } from "react";

const InputField: React.FC<IInputField> = ({
  type,
  icon = ()=>{},
  value,
  error,
  ...rest
}) => {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

  const _togglePassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <div className="w-full h-14 mt-3">
      <div className="flex w-full items-center border-2 border-white h-8 bg-white focus-within:border-gray-300 pr-2 pl-1">
        {icon()}
        <input
          className="w-full h-full text-black focus:outline-none ml-1"
          type={type === "password" && isPasswordShow ? "text" : type}
          value={value || ''}
          {...rest}
        />
        {type === "password" && isPasswordShow && (
          <EyeSlashIcon
            className="h-6 text-gray-600"
            onClick={_togglePassword}
          />
        )}
        {type === "password" && !isPasswordShow && (
          <EyeIcon className="h-6 text-gray-600" onClick={_togglePassword} />
        )}
      </div>
      <div className="w-full mt-1 text-sm pl-1 pr-2 text-red-400">
        {error ? error : "" }
        </div>
    </div>
  );
};

interface IInputField extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: () => any;
  error?: string
}

export default InputField;
