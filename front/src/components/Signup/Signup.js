import React, { useState } from "react";
import Layout from "../Layout/Layout";

const Signup = ({ firstName, onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName });
  const handleChangeFirstName = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      firstName: target.value,
    }));
  };
  return (
    <Layout>
      <div>
        Signup Page{" "}
        <form aria-label='signup form' onSubmit={() => onSubmit(customer)}>
          <label htmlFor='firstName'>First</label>
          <input
            type='text'
            placeholder='firstName'
            value={firstName}
            onChange={handleChangeFirstName}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
