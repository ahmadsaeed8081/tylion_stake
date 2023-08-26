import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import Routing from '../routes/Routing'
const chains = [polygonMumbai]
const projectId = '9dc66ab4d76b28b1a452d5dc0083e466'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

 export default function Web3Provider() {
  return (
    <>
      {/* <WagmiConfig config={wagmiConfig}> */}
        <Routing/>
      {/* </WagmiConfig> */}

      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  )
}