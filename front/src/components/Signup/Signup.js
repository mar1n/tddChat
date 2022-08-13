import React, { useState } from "react";
import Layout from "../Layout/Layout";

const Signup = ({ onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName: "" });
  const handleChangeFirstName = (e) => {
    setCustomer((customer) => ({
      ...customer,
      [e.target.name]: e.target.value,
    }));
  };
  const { firstName } = customer;
  return (
    <Layout>
      <div>
        Signup Page{" "}
        <form aria-label='signup form' onSubmit={() => onSubmit(customer)}>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            placeholder='firstName'
            name="firstName"
            value={firstName}
            onChange={handleChangeFirstName}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id=""
            placeholder='email'
            // value={email}
            onChange={handleChangeFirstName}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
