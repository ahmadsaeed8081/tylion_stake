import React from "react";

const ConnectWalletNew = () => {
  return (
    <div className="connect-wallet-new flex">
      <div className="wallet-wrapper flex flex-col">
        <div className="card-hdr flex flex-col items-center">
          <div className="tag" style={{fontFamily: "roboto"}}>Claim WBTC</div>
          <div className="hdr-desc" style={{ textAlign:"center" ,fontSize: 12 , fontFamily: "roboto"}}>
          Claim your WBTC rewards based on the Kore tokens you've staked. Your reward is dependent on the proportion of Kore compared to the total of Kore staked in each pool.          </div>
        </div>
        <div className="meta flex flex-col">
          <div className="item flex items-center justify-between">
            <div className="lbl">Total Reward:</div>
            <div className="val">0.00</div>
          </div>
          <div className="item flex items-center justify-between">
            <div className="lbl">Total Kore:</div>
            <div className="val">0.00</div>
          </div>
          <div className="item flex items-center justify-between">
            <div className="lbl">Percentage:</div>
            <div className="val">0.00</div>
          </div>
        </div>
        <div className="action flex w-full">
          <button className="btn button">Claim Now</button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletNew;
