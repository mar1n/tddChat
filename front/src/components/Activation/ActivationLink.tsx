import React, { FC } from "react";
import Button from "../Button/button";

interface ActivationLinkProps {
  clickActivate: () => Promise<void>;
  show: boolean;
  success: string;
  validationError: string;
  name: string;
}

const ActivationLink: FC<ActivationLinkProps> = ({
  name,
  clickActivate,
  show,
  success,
  validationError,
}) => {
  return (
    <div>
      <h1>Hey {name}, active your account</h1>
      <Button
        label='Activate Account'
        callback={clickActivate}
        className='activateButton'
        disabled={show}
      />
      <span>{success}</span>
      <span>{validationError}</span>
    </div>
  );
};

export default ActivationLink;
