

import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite } from 'wagmi'
import { stake1_address,stake2_address,stake3_address,stake1_abi,stake2_3_abi,token_abi,Stake_token_Address } from "../../components/config";

import { useState } from 'react';




export const  Investments = ({address}) => {

    const stake2_Contract = {
        address: stake2_address,
        abi: stake2_3_abi,
      }
    const [list, setList] = useState([0,1,2]);
  
  
    const { data, isError, isLoading12 } = useContractReads({
        contracts:list.map((item) =>({

        ...stake2_Contract,
        functionName: 'user_investments',
        args:[address,item],
        onSuccess(data) {
    
    
          console.log('Success nkh', data)
        },
    
      }))
        })
  
    return data;
  };