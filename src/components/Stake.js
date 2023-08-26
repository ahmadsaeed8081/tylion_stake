
import { stake1_address,stake2_address,stake3_address,stake1_abi,stake2_3_abi } from "../components/config";

import { useContractReads ,useContractWrite } from 'wagmi'


const stake2_Contract = {
  address: stake2_address,
  abi: stake2_3_abi,
}

export default function Stake(){
    let contracts= [
      {
        ...stake2_Contract,
        functionName: 'Apy',
      },
      {
        ...stake2_Contract,
        functionName: 'getTotalInvestment',
      },
      {
        ...stake2_Contract,
        functionName: 'get_currTime',
      },
    ]

  const { data } = useContractReads({
    contracts: contracts,
  });
  return { data };






  
}

