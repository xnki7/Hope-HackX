import { Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/landing-layout.jsx";
import Homepage from "./pages/homepage.jsx";
import CampaignsPage from "./pages/campaigns-page.jsx";
import ReportIncident from "./pages/reportIncident/reportIncident.jsx"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function App() {

const [signer, setSigner] = useState(null);
const [contractInstance, setContractInstance] = useState(null)
const [account, setAccount] = useState(null)

const loadChain = async()=>{
    
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
        const address = useAccount();
        console.log("Metamask Connected to " + address);
        setAccount(address);
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
        const address = useAccount();
        console.log("Metamask Connected to " + address);
        setAccount(address);
      }
    } catch (error) {
        console.log(error);
    }

}

useEffect(()=>{
    loadChain()
})

  return (
    <Routes>
      <Route element={<LandingLayout />} path="/">
        <Route element={<Homepage />} path="/home" />
        <Route element={<CampaignsPage />} path="/campaigns" />
        <Route element={<ReportIncident contractInstance={contractInstance}/>} path="/reportIncident" />
      </Route>
    </Routes>
  );
}

export default App;
