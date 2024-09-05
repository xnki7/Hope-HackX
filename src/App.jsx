import { Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/landing-layout.jsx";
import CampaignsPage from "./pages/campaigns-page.jsx";
import Homepage from "./pages/homepage/homepage.jsx";
import ReportIncident from "./pages/reportIncident/reportIncident.jsx"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import CreateProfile from "./pages/createProfile/createProfile.jsx";
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

  const [createProfileModal, setCreateProfileModal] = useState(false);
  return (
    <Routes>
      <Route element={<LandingLayout setCreateProfileModal={setCreateProfileModal} createProfileModal={createProfileModal} />} path="/">
        <Route element={<Homepage />} path="/home" />
        <Route element={<CampaignsPage />} path="/campaigns" />
        <Route element={<ReportIncident contractInstance={contractInstance}/>} path="/reportIncident" />
        <Route element={<ReportIncident />} path="/reportIncident" />
        <Route element={<CreateProfile createProfileModal={createProfileModal} setCreateProfileModal={setCreateProfileModal}/>} path="/createProfile" />
      </Route>
    </Routes>
  );
}

export default App;
