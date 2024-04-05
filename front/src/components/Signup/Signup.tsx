import React, { FC, useState } from "react";
import "./signup.css"
import Layout from "../Layout/Layout";
import FormSignup from "./FormSignup";
import { server } from "../../store/reducers/helper";
const domainName = server("production");
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
      <div className="signup">
        Signup Page{" "}
        <div className='confirmationMessage'>{confirmationMessage}</div>
        <FormSignup
          clickSubmit={clickSubmit}
          firstName={firstName}
          handleChange={handleChange}
          password={password}
          email={email}
          buttonSwitch={buttonSwitch}
        />
        <div className='error'>{validationError}</div>
      </div>
    </Layout>
  );
};

export default Signup;
