import React, { useState } from "react";
import Layout from "../Layout/Layout";

interface signup {
  onSubmit: (firstName:string) => void
}

const Signup = ({ onSubmit }: signup) => {
  const [customer, setCustomer] = useState<{firstName: string}>({ firstName: "" });
  const handleChangeFirstName = (e:  React.ChangeEvent<HTMLInputElement>) => {
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
        <form aria-label='signup form' onSubmit={() => onSubmit(firstName)}>
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
