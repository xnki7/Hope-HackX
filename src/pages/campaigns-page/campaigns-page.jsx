import CampaignCard from "../../components/campaign-card/campaign-card"
import { useReadContract } from 'wagmi'
import {contractAddress, contractAbi} from "../../../constants"
import { useState, useEffect } from "react"

const CampaignsPage = ({contractInstance}) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getListedCampaigns()
  }, [])
  

  const getListedCampaigns = async()=>{
    const tx = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: 'getListedCampaigns',
  })
  setCampaigns(tx);
  console.log(tx);
  }

  const fetchCampaignMetadata = async (campaignURI) => {
    try {
      const response = await axios.get(`https://ipfs.io/ipfs/${campaignURI}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Campaign metadata:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      const updatedCampaigns = await Promise.all(
        campaigns.map(async (campaign) => {
          const uri =  useReadContract({
        contractAbi,
        address: contractAddress,
        functionName: 'getCampaignURI',
        args:[campaign.campaignId]
        })
          const metadata = await fetchCampaignMetadata(uri);
          console.log(
            "Metadata for campaignId",
            campaign.campaignId,
            ":",
            metadata
          );
          return { ...campaign, metadata };
        })
      );
      console.log("Updated Campaigns:", updatedCampaigns);
      setCampaigns(updatedCampaigns);
    };

    const fetchCampaigns = async () => {
      if (campaigns.length > 0 && !campaigns[0].metadata) {
        await fetchCampaignDetails();
      }
    };

    fetchCampaigns();
  }, [campaigns]);

  const getRemainingAmount = async(campaignId)=>{

  }
  const getRemainingTime = async(campaignId)=>{}
  const donateInCampaign = async(campaignId)=>{}

  return (
    <div className="max-w-[95vw] mx-auto grid grid-cols-2 mt-6 gap-4">
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
    </div>
  )
}

export default CampaignsPage
