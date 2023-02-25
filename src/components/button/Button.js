import React from "react";

const Button = ({
  onClick,
  className = "",
  full = false,
  children,
  bgColor = "primary",
  type = "button",
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 ${
        full ? "w-full" : "w-auto"
      } rounded-lg ${className}  text-white ${bgClassName} font-medium capitalize  mt-auto`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
