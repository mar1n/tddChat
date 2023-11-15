import React from "react";

interface buttonProps {
  label: string;
  onClick?(): void;
  className: string;
  role: string;
  disabled?: boolean;
  name?: string;
  type?: "button" | "submit";
}

const Button: React.FC<buttonProps> = ({ label, role, name, onClick, className, type, disabled }) => {
  return (
      <button type={type} role={role} className={className} name={name} onClick={() => { if(onClick)  return onClick()  }} disabled={disabled}>
        {label}
      </button>
    );
};

export default Button;
