import { ReactNode } from "react";

type CustomButtonPropsType = {
  children: ReactNode;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function CustomButton({
  children,
  handleClick,
  type,
}: CustomButtonPropsType) {
  return (
    <button
      type={type}
      className="px-5 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
