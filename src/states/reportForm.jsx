import React, {useState} from "react";
import contractInstance from "./loadChain"
import { ethers } from "ethers";

const [campaignTitle, setCampaignTitle] = useState("");
const [campaignDescription, setCampaignDescription] = useState("");
const [campaignCategory, setCampaignCategory] = useState(null);
const [campaignAmount, setCampaignAmount] = useState("");
const [campaignDeadline, setCampaignDeadline] = useState(null);
const [campaignImage, setCampaignImage] = useState(null)

const reportIncident = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", campaignImage);
      const imageUploadResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: "5dbccd4d05f35d08c940",
            pinata_secret_api_key:
              "a2b56df6d6db9587ee48220d2c8fa0763fd95b7a1dbbc675f45e95f56eaf1ccd",
          },
        }
      );

      const campaignData = {
        campaignTitle: campaignTitle,
        campaignDescription: campaignDescription,
        imageCID: imageUploadResponse.data.IpfsHash,
      };

      const campaignUploadResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        campaignData,
        {
          headers: {
            pinata_api_key: "5dbccd4d05f35d08c940",
            pinata_secret_api_key:
              "a2b56df6d6db9587ee48220d2c8fa0763fd95b7a1dbbc675f45e95f56eaf1ccd",
          },
        }
      );

      const endTimeUnix = Math.floor(
        new Date(campaignDeadline).getTime() / 1000
      );

      const tx = await contractInstance.createCampaign(
        ethers.utils.parseEther(campaignAmount),
        campaignUploadResponse.data.IpfsHash,
        campaignCategory,
        endTimeUnix
      );
      await tx.wait();
      alert("Campaign created ✅");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
};

export {
    setCampaignTitle, 
    setCampaignDescription, 
    setCampaignCategory, 
    setCampaignAmount, 
    setCampaignDeadline, 
    reportIncident,
    setCampaignImage
}