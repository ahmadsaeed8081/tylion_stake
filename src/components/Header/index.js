import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConnectWallet from "../ConnectWallet";
import ConnectWalletNew from "../ConnectWallet/ConnectWalletNew";
import Modal from "../../components/Modal";
import { MenuIcon } from "../../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../../store/reducers/globalReducer";
import Web3 from "web3";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import {
  stake1_address,
  stake2_address,
  stake3_address,
  stake1_abi,
  stake2_3_abi,
} from "../config";
import { Web3Button } from "@web3modal/react";
import { useWeb3Modal } from "@web3modal/react";
import Web3Modal from "web3modal";

import { useAccount, useContractReads, useContractWrite } from "wagmi";
import Stake from "../Stake";
// import Web3 from "web3";

const stake2_Contract = {
  address: stake2_address,
  abi: stake2_3_abi,
};

const Header = () => {
  // useEffect(()=>{
  //   // fetch_firstBox();
  // })

  const [_address, set_user_address] = useState(null);
  const [_web3, set_web3] = useState(null);
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  // const { data, isError, isLoading } = useContractReads({
  //   contracts: [
  //     {
  //       ...stake2_Contract,
  //       functionName: 'Apy',
  //     },
  //     {
  //       ...stake2_Contract,
  //       functionName: 'getTotalInvestment',
  //     },
  //     {
  //       ...stake2_Contract,
  //       functionName: 'get_currTime',
  //     },
  //   ],
  // })
  // const { data} = useContractRead({
  //   address: stake2_address,
  //   abi: stake2_3_abi,
  //   functionName: 'Apy',
  // })

  //   const { Reward2, isError, isLoading } = useContractRead({
  //     address: stake_address,
  //     abi: stake1_abi,
  //     functionName: 'getTotalInvestment',
  // })

  // Stake();

  // console.log(data[3].result);

  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const [openConnectWalletNew, setOpenConnectWalletNew] = useState(false);
  const dispatch = useDispatch();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMenuMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMenuMouseLeave = () => {
    setMenuVisible(false);
  };

  const handleMenuItemClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="header-camp flex bg-themeColor">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <div className="logo-img flex items-center justify-center">
            <Link to="/">
              <img src="../images/logo.png" className="logo" />
            </Link>
          </div>
        </div>
        <div className="center flex items-center justify-center"></div>
        <div className="right flex items-center justify-end">
          <div className="action flex items-center justify-center">
            <button
              className="btn-connect button"
              // onClick={(e) => connectWallet()}
              onClick={() => open()}
            >
              {isConnected
                ? address.slice(0, 5) + "..." + address.slice(38, 42)
                : "Connect Wallet"}

              {/* <Web3Button/> */}
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={openConnectWallet}
        onClose={() => setOpenConnectWallet(false)}
      >
        <ConnectWallet setOpenConnectWallet={setOpenConnectWallet} />
      </Modal>
      <Modal
        open={openConnectWalletNew}
        onClose={() => setOpenConnectWalletNew(false)}
      >
        <ConnectWalletNew setOpenConnectWalletNew={setOpenConnectWalletNew} />
      </Modal>
    </div>
  );
};

export default Header;
