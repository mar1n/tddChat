import React, { FC } from "react";

interface inputProps {
    name: string;
    className: string;
    type: string;
    placeholder: string;
    value: string;
    onChange(): void;
}


const Input:FC<inputProps> = ({ name, className, type, placeholder, value, onChange}) => {
    return <input name={name} className={className} type={type} placeholder={placeholder} value={value} onChange={onChange} />
}

export default Input;