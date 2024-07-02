import { ChangeEvent } from "react";
export interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
export function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className=" block mb-2 text-sm font-bold text-black pt-4"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className=" text-gray-900 text-sm  block w-full p-2.5"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}
