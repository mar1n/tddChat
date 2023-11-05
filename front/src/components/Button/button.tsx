import React from "react";

interface buttonProps {
  label: string;
  callback: () => void;
  className: string;
  disabled?: boolean;
  name?: string;
  type?: "button" | "submit";
}

const Button: React.FC<buttonProps> = ({ label, name, callback, className, type, disabled }) => {
  return (
    <button type={type} className={className} name={name} onClick={() => callback()} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
