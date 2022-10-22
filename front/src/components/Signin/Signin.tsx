import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { autheticate} from "../utils/helper";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const history = useNavigate();
  const [customer, setCustomer] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [validationError, setValidationError] = useState<string>("");
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
      const response = await axios({
        method: "POST",
        url: `http://localhost:500/signin`,
        data: { email, password },
      });
      autheticate(response, () => {
        setCustomer({ email: "", password: "" });
        setButtonSwitch(false);
        history("/");
      });
    } catch (err: any) {
      setValidationError(err.response.data.error);
      setButtonSwitch(true);
    }
  };
  const { email, password } = customer;

  return (
    <Layout>
      <div>
        Signin Page{" "}
        <form aria-label='signin form' onSubmit={clickSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            placeholder='email'
            value={email}
            onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            placeholder='password'
            value={password}
            onChange={handleChange}
          />
          <button role='submit' type='submit' disabled={buttonSwitch}>
            Submit
          </button>
        </form>
        <div className='error'>{validationError}</div>
      </div>
    </Layout>
  );
};

export default Signin;
