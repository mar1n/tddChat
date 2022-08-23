import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

// interface signup {
//   onSubmit: (firstName: string) => void;
// }

const Signup = () => {
  const [customer, setCustomer] = useState<{
    firstName: string;
    email: string;
    password: string;
  }>({ firstName: "", email: "", password: "" });
  const [validationError, setValidationError] = useState<string>("")
  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((customer) => ({
      ...customer,
      [e.target.name]: e.target.value,
    }));
  };
  const clickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios({
        method: 'POST',
        url: `http://localhost:500/signup`,
        data: {firstName, email, password}
      })

      setCustomer({ firstName: "", email: "", password: ""})
    } catch (err) {
      console.log("test error")
      setValidationError("Error on screen")
    }


  };
  const { firstName, email, password } = customer;
  
  return (
    <Layout>
      <div>
        Signup Page{" "}
        <form aria-label='signup form' onSubmit={clickSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            placeholder='firstName'
            name='firstName'
            value={firstName}
            onChange={handleChangeFirstName}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            placeholder='email'
            value={email}
            onChange={handleChangeFirstName}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            placeholder='password'
            value={password}
            onChange={handleChangeFirstName}
          />
          <input type="submit" value="submit" />
        </form>
        <div className="error">{validationError}</div>
      </div>
    </Layout>
  );
};

export default Signup;
