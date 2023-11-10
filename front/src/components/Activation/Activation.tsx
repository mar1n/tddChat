import React, { FC, useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import ActivationLink from "./ActivationLink";
import { useParams } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import { server } from "../../store/reducers/helper";
const domainName = server("rea");

interface ActivationValues {
  name: string;
  token: string;
  show: boolean;
  success: string;
}

const Activation: FC = () => {
  let { id } = useParams();

  const [values, setValues] = useState<ActivationValues>({
    name: "",
    token: "",
    show: false,
    success: "",
  });

  const [validationError, setValidationError] = useState<string>("");

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

  const clickActivate = async (): Promise<void> => {
    setValues({ ...values, show: false });

    try {
      const {
        data: { message },
      } = await axios({
        method: "GET",
        url: `${domainName}/user/activation/${token}`,
        data: { token },
      });

      setValues({ ...values, show: false, success: message });
    } catch (err: any) {
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

  return (
    <Layout>
      Activation Page
      <ActivationLink
        name={name}
        clickActivate={clickActivate}
        show={show}
        success={success}
        validationError={validationError}
      />
    </Layout>
  );
};

export default Activation;
