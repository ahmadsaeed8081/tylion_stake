import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Public from "./Public";

import Home from "../Pages/Home";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { pulsechain} from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import Web3 from "web3";



const Routing = ({ Component, pageProps }) => {

  const chains = [pulsechain]
const projectId = '9dc66ab4d76b28b1a452d5dc0083e466'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
// const web3= new Web3.givenProvider(ethereumClient);

// console.log("web3"+web3);
  return (
<>
    <WagmiConfig config={wagmiConfig}>

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <Home {...pageProps}/>
            </Public>
          }
        />

      </Routes>
    </BrowserRouter>
    </WagmiConfig>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
</>
  );
};

export default Routing;
