import React, { useEffect, useState } from "react";
import Timer from "../../components/Timer";
import Modal from "../../components/Modal";

import {
  ArrowDownIcon,
  QuestionIcon,
  ArrowDownIcon2,
  ArrowUpIcon,
} from "../../assets/Icons";
import ConfirmationPopup from "../../components/confirmationPopup";
import Web3 from "web3";
import { useNetwork, useSwitchNetwork } from "wagmi";
import moment from "moment";
import { useAccount, useDisconnect } from "wagmi";
import ToggleButton from "../../components/ToggleButton";
import {
  stake1_address,
  stake2_address,
  stake3_address,
  stake1_abi,
  stake2_3_abi,
  token_abi,
  Stake2_token_Address,
} from "../../components/config";
import {
  useContractReads,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
const stake2_Contract = {
  address: stake2_address,
  abi: stake2_3_abi,
};
const stakeTokem_Contract = {
  address: Stake2_token_Address,
  abi: token_abi,
};

const FistBox = ({
  stakeType,
  headerTabsList,
  selectedTab2,
  setSelectedTab2,
  boxNumb,
  setBoxNumb,
  tokensList,
  hide5,
  setHide5,
  hide6,
  setHide6,
  token5,
  setToken5,
  token6,
  setToken6,
}) => {
  const APRList = [
    { value: "0", lbl: "365 Days", APR: "580%" },
    { value: "1", lbl: "120 Days", APR: "240%" },
    { value: "2", lbl: "90 Days", APR: "190%" },
    { value: "3", lbl: "60 Days", APR: "140%" },
    { value: "4", lbl: "30 Days", APR: "90%" },
    { value: "5", lbl: "7 Days", APR: "35%" },
  ];
  const [selectedAPR, set_selectedAPR] = useState(APRList[0]);
  const [hideTime, set_hideTime] = useState(false);

  const [open, setOpen] = useState(false);

  const [expend, setExpend] = useState(false);
  const [totalReward, set_totalReward] = useState(0);
  const [Total_withdraw, set_Total_withdraw] = useState(0);

  const [stakeAmount, setStakedAmount] = useState(0);
  const [curr_time, set_currTime] = useState(0);
  const [selectedAmount_forReward, setSelectedAmount_forReward] =
    useState(null);

  const [All_investments_ForReward, set_All_investments_ForReward] = useState(
    []
  );
  const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
  const [allInvestments, set_investmentList] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const { chain } = useNetwork();

  const { address, isConnecting, isDisconnected } = useAccount();
  let count = 0;
  const networkId = 137;

  const {
    data: stakeResult,
    isLoading: isLoading_stake,
    isSuccess: stakeSuccess,
    write: staking,
  } = useContractWrite({
    address: stake2_address,
    abi: stake2_3_abi,
    functionName: "Stake",
    args: [stakeAmount * 10 ** 18, selectedAPR.value],
    onSuccess(data) {
      test();
      console.log("Success", data);
    },
  });

  const { config: appConfig } = usePrepareContractWrite({
    address: Stake2_token_Address,
    abi: token_abi,
    functionName: "approve",
    args: [stake2_address, stakeAmount * 10 ** 18],
  });

  const { config: unstakeConfig } = usePrepareContractWrite({
    address: stake2_address,
    abi: stake2_3_abi,
    functionName: "unStake",
    args: [choosed_Unstake_inv],
  });

  const { config: claimRewardConfig } = usePrepareContractWrite({
    address: stake2_address,
    abi: stake2_3_abi,
    functionName: "withdrawReward",
  });

  const {
    data: data_app,
    isLoading: isLoading_app,
    isSuccess: isSuccess_app,
    write: approval,
  } = useContractWrite(appConfig);

  const {
    data: data__unstake,
    isLoading: isLoading_unstake,
    isSuccess: isSuccess_unstake,
    write: unstake,
  } = useContractWrite(unstakeConfig);

  const {
    data: stakeResult_withdrawReward,
    isLoading2_withdrawReward,
    isSuccess2_withdrawReward,
    write: withdrawReward,
  } = useContractWrite(claimRewardConfig);

  const waitForTransaction = useWaitForTransaction({
    hash: data_app?.hash,
    onSuccess(data) {
      // alert("its run")
      staking?.();
      console.log("Success", data);
    },
  });

  const waitForTransaction2 = useWaitForTransaction({
    hash: stakeResult?.hash,
    onSuccess(data) {
      test?.();
      console.log("Success2", data);
    },
  });

  const waitForTransaction3 = useWaitForTransaction({
    hash: data__unstake?.hash,
    onSuccess(data) {
      test?.();
      console.log("Success2", data);
    },
  });

  const waitForTransaction4 = useWaitForTransaction({
    hash: stakeResult_withdrawReward?.hash,
    onSuccess(data) {
      test?.();
      console.log("Success2", data);
    },
  });

  useEffect(() => {
    if (count == 0 && address != undefined) {
      console.log("hello sec box");
      test();
      count++;
    }
  }, address);
  const { data, isError1, isLoading1 } = useContractReads({
    contracts: [
      {
        ...stake2_Contract,
        functionName: "Apy",
      },
      {
        ...stake2_Contract,
        functionName: "getTotalInvestment",
      },
      {
        ...stake2_Contract,
        functionName: "get_currTime",
      },

      {
        ...stake2_Contract,
        functionName: "owner",
      },
      {
        ...stake2_Contract,
        functionName: "totalusers",
      },
      {
        ...stake2_Contract,
        functionName: "totalbusiness",
      },
      {
        ...stake2_Contract,
        functionName: "user",
        args: [address],
      },
      {
        ...stake2_Contract,
        functionName: "get_withdrawnTime",
        args: [1],
      },

      {
        ...stakeTokem_Contract,
        functionName: "balanceOf",
        args: [address],
      },
    ],
  });

  const { switchNetwork: stake_switch } = useSwitchNetwork({
    chainId: networkId,
    // throwForSwitchChainNotSupported: true,
    onSuccess() {
      approval?.();
    },
  });
  const { switchNetwork: unstake_switch } = useSwitchNetwork({
    chainId: networkId,
    // throwForSwitchChainNotSupported: true,
    onSuccess() {
      unstake?.();
    },
  });
  const {
    chains,
    error,
    isLoading,
    pendingChainId,
    switchNetwork: reward_switch,
  } = useSwitchNetwork({
    chainId: networkId,
    // throwForSwitchChainNotSupported: true,
    onSuccess() {
      withdrawReward?.();
    },
  });

  function find_date(time) {
    const now = new Date(time * 1000);
    console.log("its tie time" + now);

    const t = moment(now, "YYYYMMDD").fromNow();
    return t;
  }

  function Convert_To_eth(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon-bor.publicnode.com	")
    );
    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }

  async function test() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon-bor.publicnode.com	")
    );

    const balance = await web3.eth.getBalance(address);
    const contract = new web3.eth.Contract(stake2_3_abi, stake2_address);
    let curr_time = await contract.methods.get_currTime().call();
    set_currTime(curr_time);

    let totalReward = await contract.methods
      .get_TotalReward()
      .call({ from: address });
    let Total_withdraw = await contract.methods
      .total_withdraw_reaward()
      .call({ from: address });

    let allInvestments = await contract.methods
      .getAll_investments()
      .call({ from: address });
    console.log("bal " + allInvestments);
    let All_investments_ForReward = await contract.methods
      .getAll_investments_ForReward()
      .call({ from: address });

    set_investmentList(allInvestments);
    setSelectedAmount(allInvestments[0]);
    set_All_investments_ForReward(All_investments_ForReward);
    setSelectedAmount_forReward(All_investments_ForReward[0]);
    if (allInvestments[0]) {
      set_choosed_Unstake_inv(allInvestments[0][3]);
    }
    set_totalReward(totalReward);
    set_Total_withdraw(Total_withdraw);
  }
  // function Get_all_inv()
  // {

  async function stake() {
    if (isDisconnected) {
      alert("kindly connect your wallet ");
      return;
    }
    if (stakeAmount == 0) {
      alert("kindly write amount to stake ");
      return;
    }
    let fee = (stakeAmount * 0.3) / 100;
    fee = fee * 10 ** 18;

    if (Number(data[8].result) < Number(fee)) {
      alert("You dont have enough balance");
      return;
    }
    if (chain.id != networkId) {
      stake_switch?.();
    } else {
      approval?.();
    }
  }

  function unstaking() {
    if (isDisconnected) {
      alert("kindly connect your wallet ");
      return;
    }
    console.log("object unstake " + choosed_Unstake_inv);
    // if(stakeAmount==0 )
    // {
    //   alert("kindly write amount to stake ");
    //   return;
    // }

    // if(Number(data[10].result) < Number(fee))
    // {
    //   alert("You dont have enough balance");
    //   return;
    // }
    if (chain.id != networkId) {
      unstake_switch?.();
    } else {
      unstake?.();
    }
    // console.log(data__unstake);
  }

  function ClaimReward() {
    if (isDisconnected) {
      alert("kindly connect your wallet ");
      return;
    }
    console.log("object withdraw " + choosed_Unstake_inv);
    // if(stakeAmount==0 )
    // {
    //   alert("kindly write amount to stake ");
    //   return;
    // }

    // if(Number(data[10].result) < Number(fee))
    // {
    //   alert("You dont have enough balance");
    //   return;
    // }
    if (chain.id != networkId) {
      reward_switch?.();
    } else {
      withdrawReward?.();
    }
  }

  // setInterval( test, 60000);

  console.log("second box");

  const BodyBottom = () => {
    return (
      <div className="body-bottom flex flex-col w-full">
        <div className="expend-tab flex items-center justify-center">
          <div
            className="btn-expend flex items-center justify-center cursor-pointer"
            onClick={(e) => setExpend(!expend)}
          >
            <h1 className="e-tag mr-2">{expend ? "Hide" : "Detail"}</h1>
            <div className="e-icon flex items-center justify-center">
              {expend ? <ArrowUpIcon /> : <ArrowDownIcon2 />}
            </div>
          </div>
        </div>
        <div className={`expend-detail flex flex-col ${expend ? "show" : ""}`}>
          {/* <div className="detail-item flex items-center justify-between">
            <div className="lbl-side">Total Liquidity:</div>
            <div className="val-side" >                 
            $60,327971

                  
                  </div>
          </div> */}
          <div className="detail-item flex items-center justify-between">
            <div className="lbl-side"></div>
            <div className="val-side">
              <a
                href="https://app.pulsex.com/swap?inputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F &outputCurrency=0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
                target="_blank"
                className="sub-menu-item"
                style={{ color: "#2498A3" }}
              >
                Tyrion/Tyon
              </a>
            </div>
          </div>

          <div className="detail-item flex items-center justify-between">
            <div className="lbl-side"></div>
            <div className="val-side">
              <a
                href={"https://scan.pulsechain.com/address/" + stake2_address}
                target="_blank"
                className="sub-menu-item"
                style={{ color: "#2498A3" }}
              >
                View Contract
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="grid-box flex flex-col relative">
      {stakeType === "fixed" ? (
        <div className="body-overlay h-full w-full flex items-center justify-center">
          Coming Soon with Higher APY Limits
        </div>
      ) : (
        ""
      )}
      <div className="box-header flex items-center">
        {headerTabsList.map((item, index) => (
          <div
            key={index}
            className={`header-item flex items-center justify-center ${
              (selectedTab2 === item.title) & (boxNumb === 2) ? "active" : ""
            }`}
            onClick={(e) => {
              setSelectedTab2(item.title);
              setBoxNumb(2);
            }}
          >
            <h1 className="item-tag flex items-center justify-center">
              {item.title}
            </h1>
          </div>
        ))}
      </div>{" "}
      {selectedTab2 === "Stake" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 2 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab2("Stake");
            setBoxNumb(2);
          }}
        >
          {boxNumb !== 2 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/pls-wbtc.png" className="img" />
            <h1 className="top-tag">Tyrion/Tyon</h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Lock-up Period:</h1>
                  <h1 className="item-lbl text-white">1 Year</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">APY:</h1>
                  <h1 className="item-lbl text-white">25%</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Auto Compounding</h1>
                  <h1 className="item-lbl text-white">
                    <ToggleButton />
                  </h1>
                </div>
              </div>

              <div className="input-form flex flex-col">
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Amount: (Min $10 - Max $50)</h1>
                    <h1 className="f-tag">
                      Balance: <span className="font-semibold">100 Tyon</span>
                    </h1>
                  </div>
                  <div className="field-i-box flex items-center">
                    <input
                      type="number"
                      className="txt cleanbtn w-full"
                      placeholder="Amount"
                      min={0}
                      value={stakeAmount}
                      max={data ? Number(data[8].result) / 10 ** 18 : 0}
                      onChange={(e) => setStakedAmount(e.target.value)}
                    />
                    <div className="ib-right flex items-center">
                      <h1 className="ib-txt">Tyon</h1>
                      <button
                        className="ib-btn button"
                        onClick={(e) =>
                          setStakedAmount(Number(data[8].result) / 10 ** 18)
                        }
                      >
                        Max
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              disabled={isLoading_app || isLoading_stake}
              className="btn-stack button"
              onClick={stake}
            >
              {!isLoading_stake &&
                !isLoading_app &&
                !isSuccess_app &&
                !stakeSuccess && <div>Approve</div>}
              {isLoading_app && <div>Approving</div>}
              {!stakeSuccess && !isLoading_stake && isSuccess_app && (
                <div>Approved</div>
              )}
              {isLoading_stake && <div>Staking</div>}
              {!isLoading_app && stakeSuccess && <div>Approve</div>}
            </button>{" "}
          </div>
          <BodyBottom />
        </div>
      ) : selectedTab2 === "Unstake" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 2 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab2("Unstake");
            setBoxNumb(2);
          }}
        >
          {boxNumb !== 2 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/pls-wbtc.png" className="img" />
            <h1 className="top-tag">Tyrion/Tyon</h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Penalty:</h1>
                  <h1 className="item-lbl text-red-600">10%</h1>
                </div>
              </div>
              <div className="input-form flex flex-col">
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Current Investment:</h1>
                  </div>
                  <div className="dropDown flex items-center justify-center flex-col relative">
                    <div className="category flex items-center">
                      <div
                        className="cbox cleanbtn flex items-center relative pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHide5(!hide5);
                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                              {selectedAmount
                                ? selectedAmount[0] / 10 ** 18
                                : "0"}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide5 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {allInvestments.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide5(!hide5);
                              setSelectedAmount(item);
                              set_choosed_Unstake_inv(item[3]);
                            }}
                          >
                            <div className="unit-name flex aic font w-full s14 b4 justify-between">
                              <span className="unit-eng flex aic font s14 b4">
                                {Number(item[0]) / 10 ** 18}
                              </span>
                              <span className="unit-eng flex aic font s14 b4">
                                {find_date(Number(item[2]))}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Timer
                    time={selectedAmount ? Number(selectedAmount[1]) : 0}
                  />
                </div>
              </div>
            </div>
            {selectedAmount ? (
              <button
                className="btn-stack button"
                disabled={isLoading_unstake}
                onClick={(e) => {
                  selectedAmount &&
                  Number(curr_time) < Number(selectedAmount[1])
                    ? setOpen(true)
                    : unstaking();
                }}
              >
                {!isLoading_unstake && !isSuccess_unstake && <div>Unstake</div>}
                {isLoading_unstake && !isSuccess_unstake && (
                  <div>Loading...</div>
                )}
                {!isLoading_unstake && isSuccess_unstake && <div>Unstake</div>}
              </button>
            ) : (
              <button className="btn-stack button">Unstake</button>
            )}
          </div>
          <BodyBottom />
        </div>
      ) : selectedTab2 === "Reward" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 2 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab2("Reward");
            setBoxNumb(2);
          }}
        >
          {boxNumb !== 2 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/pls-wbtc.png" className="img" />
            <h1 className="top-tag">Tyrion/Tyon </h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Total Earnings</h1>
                  <h1 className="item-lbl text-white">
                    {(Number(Total_withdraw) + Number(totalReward)) / 10 ** 18}
                  </h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Available to Claim:</h1>
                  <h1 className="item-lbl text-white">
                    {Number(totalReward) / 10 ** 18}
                  </h1>
                </div>
              </div>
              <div className="input-form flex flex-col">
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Investment History:</h1>
                  </div>
                  <div className="dropDown flex items-center justify-center flex-col relative">
                    <div className="category flex items-center">
                      <div
                        className="cbox cleanbtn flex items-center relative pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHide6(!hide6);
                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                              {selectedAmount_forReward
                                ? selectedAmount_forReward[0] / 10 ** 18
                                : "0"}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide6 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {All_investments_ForReward.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide6(!hide6);
                              setSelectedAmount_forReward(item);
                            }}
                          >
                            <div className="unit-name flex aic font w-full s14 b4 justify-between">
                              <span className="unit-eng flex aic font s14 b4">
                                {Number(item[0]) / 10 ** 18}
                              </span>
                              <span className="unit-eng flex aic font s14 b4">
                                {find_date(Number(item[2]))}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="field-hdr flex items-center justify-end">
                    <h1 className="f-tag">
                      Earning :{" "}
                      <span className="c-theme">
                        {selectedAmount_forReward
                          ? Convert_To_eth(selectedAmount_forReward[6])
                          : 0}
                      </span>
                    </h1>
                  </div>
                </div>
                {/* <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Claim Reward:</h1>
                  </div>
                  <div className="field-i-box flex items-center">
                    <input
                      type="text"
                      className="txt cleanbtn w-full"
                      placeholder="Amount"
                    />
                    <div className="ib-right flex items-center">
                      <button className="ib-btn button">Max</button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <button className="btn-stack button" onClick={ClaimReward}>
              {!isLoading2_withdrawReward && !isSuccess2_withdrawReward && (
                <div>Claim</div>
              )}
              {isLoading2_withdrawReward && !isSuccess2_withdrawReward && (
                <div>Loading...</div>
              )}
              {!isLoading2_withdrawReward && isSuccess2_withdrawReward && (
                <div>Claim</div>
              )}
            </button>
          </div>
          <BodyBottom />
        </div>
      ) : null}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ConfirmationPopup setOpen={setOpen} unstaking={unstaking} />
      </Modal>
    </div>
  );
};

export default FistBox;
