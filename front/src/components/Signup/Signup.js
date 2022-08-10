import React from "react";
import Layout from "../Layout/Layout";
const Signup = ({ firstName, onSubmit}) => {
  const customer = {firstName};
  return (
    <Layout>
      <div>
        Signup Page{" "}
        <form aria-label='signup form' onSubmit={() => onSubmit(customer)}>
          <label htmlFor="">First Name</label>
          <input type='text' placeholder="firstName" value={firstName} />
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
