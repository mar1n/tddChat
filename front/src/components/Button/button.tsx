import React from "react";

interface buttonProps {
  label: string;
  callback: () => void;
  className: string;
  role: string;
  disabled?: boolean;
  name?: string;
  type?: "button" | "submit";
}

const Button: React.FC<buttonProps> = ({ label, role, name, callback, className, type, disabled }) => {
  return (
    <button type={type} role={role} className={className} name={name} onClick={() => callback()} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
