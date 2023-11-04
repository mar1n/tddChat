import React from "react";

interface buttonProps {
  txt: string;
  onClick: () => void;
  className: string;
  name?: string;
  type?: "button" | "submit";
}

const Button: React.FC<buttonProps> = ({ txt, name, onClick, className, type }) => {
  return (
    <button type={type} className={className} name={name} onClick={() => onClick()}>
      {txt}
    </button>
  );
};

export default Button;
