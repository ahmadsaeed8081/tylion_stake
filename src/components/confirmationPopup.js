import React from "react";

const ConfirmationPopup = ({ setOpen, unstaking,unstaking_req }) => {
  return (
    <div className="confirmation-popup-body flex flex-col justify-between">
      <h1 className="title">Warning: 10% Emergency Unstaking Fee</h1>
      <p className="desc">
        Please note that there is a 10% fee for emergency unstaking. Are you
        sure you want to proceed?
      </p>
      <div className="actions flex items-center justify-center w-full">
        <button
          className="btn-c button"
          onClick={(e) => {
            setOpen(false);
            unstaking_req();
          }}
        >
          Unstake Request
        </button>
        <button
          className="btn-c button"
          style={{ backgroundColor:"hsla(11,80%,45%,1)",border:"red" }}
          onClick={(e) => {
            setOpen(false);
            unstaking();
          }}
        >
        Immediate Unstake

        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
