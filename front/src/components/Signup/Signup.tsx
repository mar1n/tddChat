import React, { FC, useState } from "react";
import Layout from "../Layout/Layout";
import Button from "../Button/button";
import Input from "../Input/input";
import { server } from "../../store/reducers/helper";
const domainName = server("rea");
import axios from "axios";

const Signup: FC = () => {
  const [customer, setCustomer] = useState<{
    firstName: string;
    email: string;
    password: string;
  }>({ firstName: "", email: "", password: "" });
  const [validationError, setValidationError] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [buttonSwitch, setButtonSwitch] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((customer) => ({
      ...customer,
      [e.target.name]: e.target.value,
    }));
    setButtonSwitch(false);
  };
  const clickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonSwitch(true);
    try {
      await axios({
        method: "POST",
        url: `${domainName}/user/signup`,
        data: { firstName, email, password },
      });

      setCustomer({ firstName: "", email: "", password: "" });
      setButtonSwitch(false);
      setConfirmationMessage("We send you email with link.");
    } catch (err: any) {
      setValidationError(err.response.data.error);
      setButtonSwitch(true);
    }
  };
  const { firstName, email, password } = customer;

  return (
    <Layout>
      <div>
        Signup Page{" "}
        <div className='confirmationMessage'>{confirmationMessage}</div>
        <form aria-label='signup form' onSubmit={clickSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <Input className="firstNameSignup" name="firstName" placeholder="firstName" value={firstName} onChange={handleChange} />
          <label htmlFor='email'>Email</label>
          <Input className="emailSignup" name="email" placeholder="email" value={email} onChange={handleChange} />
          <label htmlFor='password'>Password</label>
          <Input className="passwordSignup" name="password" placeholder="password" value={password} onChange={handleChange} />
          <Button
            label='submit'
            className='submitSignup'
            role='submit'
            type='submit'
            disabled={buttonSwitch}
          />
        </form>
        <div className='error'>{validationError}</div>
      </div>
    </Layout>
  );
};

export default Signup;
