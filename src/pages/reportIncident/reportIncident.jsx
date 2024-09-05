import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";

function Report(contractInstance) {

const [campaignTitle, setCampaignTitle] = useState("");
const [campaignDescription, setCampaignDescription] = useState("");
const [campaignCategory, setCampaignCategory] = useState(null);
const [campaignAmount, setCampaignAmount] = useState("");
const [campaignDeadline, setCampaignDeadline] = useState(null);
const [campaignImage, setCampaignImage] = useState(null)

const reportIncident = async () => {

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
};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <div className="new-campaign-form">
      <form onSubmit={()=>{reportIncident()}}>
        <h1>Create a New Campaign</h1>

        {/* Campaign Title */}
        <div className="form-group">
          <label>Campaign Title *</label>
          <input
            type="text"
            {...register("campaignTitle", { required: "Campaign Title is required" })}
            onChange={(e)=>{setCampaignTitle(e.target.value)}}
          />
          {errors.campaignTitle && (
            <p className="error">{errors.campaignTitle.message}</p>
          )}
        </div>

        {/* Required Fund */}
        <div className="form-group">
          <label>Required Fund (in MATIC) *</label>
          <input
            type="number"
            {...register("campaignAmount", { required: "Campaign Amount is required" })}
            onChange={(e)=>{setCampaignAmount(e.target.value)}}
          />
          {errors.campaignAmount && (
            <p className="error">{errors.campaignAmount.message}</p>
          )}
        </div>

        {/* Campaign Description */}
        <div className="form-group">
          <label>Tell Your Story *</label>
          <textarea
            rows="7"
            {...register("campaignDescription", { required: "Campaign Description is required" })}
            onChange={(e)=>{setCampaignDescription(e.target.value)}}
          ></textarea>
          {errors.campaignDescription && (
            <p className="error">{errors.campaignDescription.message}</p>
          )}
        </div>

        {/* End Date */}
        <div className="form-group">
          <label>End Date *</label>
          <input
            type="date"
            {...register("campaignDeadline", { required: "Campaign Deadline is required" })}
            onChange={(e)=>setCampaignDeadline(e.target.value)}
          />
          {errors.campaignDeadline && (
            <p className="error">{errors.campaignDeadline.message}</p>
          )}
        </div>

        {/* Campaign Category */}
        <div className="form-group">
          <label>Campaign Category *</label>
          <select
            {...register("campaignCategory", { required: "Campaign Category is required" })}
            onChange={(e)=>{setCampaignCategory(e.target.value)}}
          >
            <option value="">Select a category</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Environment">Environment</option>
            <option value="Justice">Justice</option>
            <option value="Relief">Relief</option>
            <option value="Arts">Arts</option>
            <option value="Technology">Technology</option>
            <option value="Community">Community</option>
            <option value="Animal">Animal</option>
            <option value="Sports">Sports</option>
            <option value="Humanitarian">Humanitarian</option>
            <option value="Development">Development</option>
          </select>
          {errors.campaignCategory && (
            <p className="error">{errors.campaignCategory.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Campaign Image *</label>
          <input
            type="file"
            accept="image/*"
            {...register("campaignImage", { required: "Campaign Image is required" })}
            onChange={(e)=>{setCampaignImage(e.target.value)}}
          />
          {errors.campaignImage && (
            <p className="error">{errors.campaignImage.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Campaign</button>
      </form>
    </div>
  );
}

export default Report;
