import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import jwt from "jsonwebtoken";

import axios from "axios";
const Activation = () => {

  let { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: false,
  });

  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    let tokenDecode = id !== undefined ? id : "";
    if (id) {
      try {
        const { name }: any = jwt.decode(id);
        setValues({ ...values, name, token: tokenDecode });
      } catch (error) {
        setValidationError("Invalid token");
      }
    }
  }, []);
  const { name, token, show } = values;

  const clickActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setValues({ ...values, show: false });
    try {

      await axios({
        method: "GET",
        url: `${domainName}/user/activation/${token}`,
        data: { token },
      });

      setValues({ ...values, show: false });
    } catch (err: any) {
      console.log("err activation", err);
      
      const {
        response: {
          status,
          data: { error },
        },
      } = err;
      if (status === 401) {
        setValidationError(error);
      }
      setValidationError(error);
    }
  };

  const activationLink = () => (
    <div>
      <h1>Hey {name}, active your account</h1>
      <button onClick={clickActivate} disabled={show}>
        Activate Account
      </button>
      <span>{validationError}</span>
    </div>
  );
  return <Layout>Activation Page{activationLink()}</Layout>;
};

export default Activation;
