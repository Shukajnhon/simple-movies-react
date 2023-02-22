import React from "react";

const Input = ({className, type, placeholder, ...props}) => {
  return <input type={type} {...props} />;
};

export default Input;
