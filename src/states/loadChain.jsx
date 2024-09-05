import React, { useEffect ,useState} from "react";
import {contractAddress,contractAbi} from "../../constants"
import { ethers } from "ethers";

const [signer, setSigner] = useState(null);
const [contractInstance, setContractInstance] = useState(null)

const loadChain=async()=>{
    
    try {
        if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setContractInstance(contractInstance);
      } else {
        const provider = new ethers.providers.Web3Provider(publicProvider);
        const signer = provider.getSigner();
        setSigner(signer);
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setContractInstance(contractInstance);
      }
    } catch (error) {
        console.log(error);
    }

}

export {loadChain, setSigner, setContractInstance, setAccount, account, signer, contractInstance}