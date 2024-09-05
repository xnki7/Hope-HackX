import { Route, Routes } from 'react-router-dom';
import LandingLayout from './layouts/landing-layout.jsx';
import CampaignsPage from './pages/campaigns-page/campaigns-page.jsx';
import CampaignDetail from './pages/campaign-detail/campaign-detail.jsx';
import Homepage from './pages/homepage/homepage.jsx';
import ReportIncident from './pages/reportIncident/reportIncident.jsx';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getEthersProvider } from './providerEthers.ts';
import { config } from './config';
import { ethers } from 'ethers';
import { contractAddress, contractAbi } from '../constants.js';
import { useWalletClient } from 'wagmi';
import React from 'react';

function App() {
    const [signer, setSigner] = useState(null);
    const [contractInstance, setContractInstance] = useState(null);
    const [account, setAccount] = useState(null);
    const [createProfileModal, setCreateProfileModal] = useState(false);

    const accounts = useAccount();
    console.log('Account is ', accounts.address);

    // const { data: walletClient } = useWalletClient();
    // const ethersSigner = React.useMemo(
    //     () =>
    //         walletClient
    //             ? new providers.Web3Provider(walletClient).getSigner()
    //             : undefined,
    //     [walletClient]
    // );
    // console.log('result is ', ethersSigner);

    const loadChain = async () => {
        try {
            if (window.ethereum) {
                const provider = getEthersProvider(config);
                const signer = provider.getSigner(accounts.address);
                setSigner(signer);
                console.log("Signer is ", signer)
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
    }, []);

    return (
        <Routes>
            <Route
                element={
                    <LandingLayout
                        setCreateProfileModal={setCreateProfileModal}
                        createProfileModal={createProfileModal}
                        contractInstance={contractInstance}
                        signer={signer}
                    />
                }
                path="/"
            >
                        <Route element={<Homepage />} path="/" />
                        <Route element={<CampaignsPage contractInstance={contractInstance}/>} path="/campaigns" />
                        <Route element={<CampaignDetail />} path="/c/:campaignId" />
                <Route
                    element={
                        <ReportIncident contractInstance={contractInstance} />
                    }
                    path="/reportIncident"
                />
            </Route>
        </Routes>
    );
}

export default App;
