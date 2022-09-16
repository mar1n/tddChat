import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useParams, useLocation } from "react-router-dom";
import jwt_decode, { JwtPayload } from "jwt-decode";
//import jwt_decode from "jwt-decode";
// interface token {
//     name: string
// }
const Activation = () => {
  let { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  console.log("id", id);
  console.log("useParams", useParams());
  console.log("match", useLocation());
  useEffect(() => {
    let tokenDecode = id !== undefined ? id : "";
    if(id) {
      let nameFromToken: any = jwt_decode<JwtPayload>(id!);
      console.log("decode", nameFromToken.name);
      setValues({ ...values, name: nameFromToken.name, token: tokenDecode });
    }
  }, []);
  const { name } = values;
  const activationLink = () => (
    <div>
      <h1>Hey {name}, active your account</h1>
      <button>Activate Account</button>
    </div>
  );
  return <Layout>Activation Page{activationLink()}</Layout>;
};

export default Activation;
