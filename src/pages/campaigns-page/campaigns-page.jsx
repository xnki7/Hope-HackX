import CampaignCard from '../../components/campaign-card/campaign-card';
import { useReadContract } from 'wagmi';
import { contractAddress, contractAbi } from '../../../constants';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignsPage = ({ contractInstance }) => {
    const [campaigns, setCampaigns] = useState([]);

    // Fetch the listed campaigns using the contract read function
    const { data: listedCampaigns } = useReadContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: 'getListedCampaigns',
    });

    // Separate state for storing the campaign details (including URIs)
    const [campaignDetails, setCampaignDetails] = useState([]);

    // Fetch the campaign URIs for each listed campaign
    useEffect(() => {
        if (listedCampaigns && listedCampaigns.length > 0) {
            const fetchCampaignURIs = async () => {
                const details = await Promise.all(
                    listedCampaigns.map(async (campaign) => {
                        const uri = await contractInstance.getCampaignURI(campaign.campaignId);
                        const metadata = await fetchCampaignMetadata(uri);

                        // Return full campaign data with metadata
                        return {
                            ...campaign, // Spread the original campaign data
                            metadata, // Include metadata fetched from IPFS
                        };
                    })
                );
                setCampaignDetails(details); // Store full campaign details including metadata
                console.log(details)
            };
            fetchCampaignURIs();
        }
    }, [listedCampaigns]);

    // Fetch metadata from IPFS
    const fetchCampaignMetadata = async (campaignURI) => {
        try {
            const response = await axios.get(`https://ipfs.io/ipfs/${campaignURI}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching campaign metadata:', error);
            return null;
        }
    };

    return (
        <div className="max-w-[95vw] mx-auto grid grid-cols-2 mt-6 gap-4">
            {campaignDetails.map((campaign) => (
                <CampaignCard
                    key={campaign.campaignId}
                    campaignId={campaign.campaignId}
                    contract={contractInstance}
                    title={campaign.metadata.campaignTitle}
                    description={campaign.metadata.campaignDescription}
                    img={`https://ipfs.io/ipfs/${campaign.metadata.imageCID}`}
                    campaignOwner={campaign.campaignOwner}
                    campaignCategory={campaign.category}
                    requiredAmount={campaign.requiredAmount}
                />
            ))}
        </div>
    );
};

export default CampaignsPage;
