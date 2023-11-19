'use client'
import React from "react";

const RadioButton:React.FC<IRadioButton> = ({error, label, isLabelLeft, ...rest}) => {
  return (
    <div className="w-full h-14 mt-3">
      <div className="w-full flex items-center justify-start cursor-not-allowed">
        {isLabelLeft && label &&  <label className={``} htmlFor="radioButton">{label}</label>}
        <input className={` ${isLabelLeft ? "ml-3" : "" } `} type="radio" name="" id="radioButton" {...rest} />
        {!isLabelLeft && label &&  <label className={`ml-3`} htmlFor="radioButton">{label}</label>}
      </div>
      <div className="w-full text-left pl-1 text-sm pr-2 text-red-400">{error}</div>
    </div>
  );
};

interface IRadioButton extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  isLabelLeft?: boolean
}

export default RadioButton;
