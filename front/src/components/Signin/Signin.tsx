import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

const Signin = () => {
    const [customer, setCustomer] = useState<{
      firstName: string;
      email: string;
      password: string;
    }>({ firstName: "", email: "", password: "" });
  //   const [validationError, setValidationError] = useState<string>("");
  const [buttonSwitch, setButtonSwitch] = useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomer((customer) => ({
        ...customer,
        [e.target.name]: e.target.value,
      }));
      setButtonSwitch(false);
    };
  //   const clickSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setButtonSwitch(true);
  //     try {
  //       await axios({
  //         method: "POST",
  //         url: `http://localhost:500/signup`,
  //         data: { firstName, email, password },
  //       });

  //       setCustomer({ firstName: "", email: "", password: "" });
  //       setButtonSwitch(false);
  //     } catch (err: any) {
  //       console.log("test error", err.response.data.error);
  //       setValidationError(err.response.data.error);
  //       setButtonSwitch(true);
  //     }
  //   };
    const { firstName, email, password } = customer;

  return (
    <Layout>
      <div>
        Signin Page{" "}
        <form aria-label='signin form'>
          {/* <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            placeholder='firstName'
            name='firstName'
            value={firstName}
            onChange={handleChange}
          />
         */}
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
        {/* <div className='error'>{validationError}</div> */}
      </div>
    </Layout>
  );
};

export default Signin;
