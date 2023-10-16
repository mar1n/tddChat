import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import { server } from "../../store/reducers/helper";
const domainName = server("real");

const Activation = () => {
  let { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: false,
    success: "",
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
  const { name, token, show, success } = values;

  const clickActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setValues({ ...values, show: false });
    try {

      const {data: { message}} = await axios({
        method: "GET",
        url: `${domainName}/user/activation/${token}`,
        data: { token },
      });

      //console.log("response", response);
      //console.log("response", response.data.message);
      

      setValues({ ...values, show: false, success: message });
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
      <span>{success}</span>
      <span>{validationError}</span>
    </div>
  );
  return <Layout>Activation Page{activationLink()}</Layout>;
};

export default Activation;
