import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Public from "./Public";

import Home from "../Pages/Home";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygon} from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import Web3 from "web3";



const Routing = ({ Component, pageProps }) => {

  // const chains = [polygon]
const projectId = 'f385bf4e147a499aee6b6c2f17ded944'

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const { chains, publicClient } = configureChains(
  [polygon],
  [alchemyProvider({ apiKey: 'tTXdAIDIsIsUyC322Hw-FwS0PPYvO5yw' })],
)
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

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
