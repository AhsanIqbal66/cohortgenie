"use client"
import { FC } from "react";
import { ErrorMessage, Field } from "formik";
import { InputFieldProps } from "@/types";
import { Eye } from 'lucide-react';
const InputField: FC<InputFieldProps> = ({
  type = "text",
  name = "",
  placeholder = "",
  label,
  isLargeLabel,
  disabled = false,
  onKeyDown = () => { },
  icon = false,
  passwordicon = false,
  id,
  inputOuterHolderClassName = "",
  readOnly = false,
  textareaClass,
  className = "",
  onBlur,
  min,
  // onChange = () => { },
}) => {
  return (
    <div className={`${inputOuterHolderClassName}`}>
      {label && (
        <label
          className={`font-medium text-secondary-text leading-none mb-2 block ${isLargeLabel ? "text-lg" : "text-sm"
            }`}
        >
          {label}
        </label>
      )}
      {type !== "textarea" ? <div className={`w-full flex items-center bg-[#F5F5F5]  rounded-sm py-3 px-4  shadow-[0_1px_2px_0_#1018280D] ${className}  ${icon ? "pl-3.5" : "px-2"} ${readOnly === true || disabled ? "bg-[#FAFAFA]" : ""}`}>
        {icon && <div className="text-[#0D0D0D] text-sm font-medium">{icon}</div>}
        <Field
          onBlur={onBlur}
          type={type}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          className={`w-full focus:outline-none border-none text-sm   placeholder:text-[#c5c5c5] text-secondary-text bg-transparent focus:shadow-[0] ${readOnly === true || disabled ? "cursor-not-allowed text-[#c5c5c5]" : "text-black"}`}
          onKeyDown={onKeyDown}
          // onChange={onChange}
          id={id}
          readOnly={readOnly}
        />
        {passwordicon && (
          <div
            onClick={passwordicon.onClick}
            className="cursor-pointer pr-3 text-[#A0AEC0] text-sm"
          >
            <Eye />
          </div>
        )}
      </div> : <Field
        as="textarea"
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        className={`${textareaClass} w-full border-[#E9E9E9] dark:border-gray-500 rounded-sm focus:outline-none text-sm text-black placeholder:text-[#A0AEC0]  bg-transparent focus:shadow-[0] min-h-[70px]`}
        onKeyDown={onKeyDown}
        id={id}
        min={min}
      />}
      <ErrorMessage name={name} component="p" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

export default InputField;

// ${box ? "mt-3 border p-3 pl-5 rounded-lg" : "mt-3 md:mt-5 border-b pb-1"
// } ${style}