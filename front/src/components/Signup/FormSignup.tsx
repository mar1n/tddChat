import React, {FC} from "react";
import Input from "../Input/input";
import Button from "../Button/button";

interface formSignupProps {
    clickSubmit(e: React.FormEvent):void;
    firstName: string;
    handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
    password: string;
    email: string;
    buttonSwitch: boolean;
}

const FormSignup:FC<formSignupProps> = ({ clickSubmit, firstName, handleChange, password, email, buttonSwitch}) => {
    return <form aria-label="signup form" onSubmit={clickSubmit}>
        <label htmlFor="firstName">First Name</label>
        <Input className="firstNameSignup" name="firstName" placeholder="firstName" value={firstName} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <Input className="emailSignup" name="email" placeholder="email" value={email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <Input className="inputPasswordSigin" name="password" placeholder="password" value={password} onChange={handleChange} />
        <Button className="submitButton" role="submit" label="submit" type="submit" disabled={buttonSwitch} />
    </form>
}

export default FormSignup;