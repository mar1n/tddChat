import React, {FC} from "react";
import Input from "../Input/input";
import Button from "../Button/button";

interface formSiginProp {
    clickSubmit(e: React.FormEvent): void;
    email: string;
    handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
    password: string;
    buttonSwitch: boolean;
}

const FormSigin:FC<formSiginProp> = ({ clickSubmit, email, handleChange, password, buttonSwitch }) => {
    return <form aria-label="signin form" onSubmit={clickSubmit}>
        <label htmlFor="email">Email</label>
        <Input className="inputNameSigin" name="email" placeholder="email" value={email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <Input className="inputPasswordSigin" name="password" placeholder="password" value={password} onChange={handleChange} />
        <Button className="submitButton" role="submit" label="submit" type="submit" disabled={buttonSwitch} />
    </form>
}

export default FormSigin;