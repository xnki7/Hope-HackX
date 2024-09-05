import { Route, Routes } from 'react-router-dom';
import LandingLayout from './layouts/landing-layout.jsx';
import CampaignsPage from './pages/campaigns-page.jsx';
import Homepage from './pages/homepage/homepage.jsx';
import ReportIncident from './pages/reportIncident/reportIncident.jsx';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getEthersProvider } from './providerEthers.ts';
import { config } from './config';
import {ethers} from "ethers"
import { contractAddress, contractAbi } from '../constants.js';

function App() {
    const [signer, setSigner] = useState(null);
    const [contractInstance, setContractInstance] = useState(null);
    const [account, setAccount] = useState(null);
    const [createProfileModal, setCreateProfileModal] = useState(false);

    const accounts = useAccount();
    console.log('Account is ', accounts.address);

    const loadChain = async () => {
        try {
            if (window.ethereum) {
                const provider = getEthersProvider(config);
                const signer = provider.getSigner();
                setSigner(signer);
                const contractInstance = new ethers.Contract(
                    contractAddress,
                    contractAbi,
                    signer
                );
                setContractInstance(contractInstance);
                console.log('COntract is ', contractInstance);
            } else {
                const provider = getEthersProvider(config);
                const signer = provider.getSigner();
                setSigner(signer);
                const contractInstance = new ethers.Contract(
                    contractAddress,
                    contractAbi,
                    signer
                );
                setContractInstance(contractInstance);
                const address = useAccount();
                console.log('Metamask Connected to ' + address);
                setAccount(address);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadChain();
    },[]);

    return (
        <Routes>
            <Route
                element={
                    <LandingLayout
                        setCreateProfileModal={setCreateProfileModal}
                        createProfileModal={createProfileModal}
                    />
                }
                path="/"
            >
                <Route element={<Homepage />} path="/" />
                <Route element={<CampaignsPage />} path="/campaigns" />
                <Route
                    element={
                        <ReportIncident contractInstance={contractInstance} />
                    }
                    path="/reportIncident"
                />
                <Route element={<ReportIncident />} path="/reportIncident" />
            </Route>
        </Routes>
    );
}

export default App;
