import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useWriteContract} from 'wagmi';
import { contractAbi, contractAddress } from '../../../constants';
import { ethers } from 'ethers';

function ReportIncident({contractInstance}) {
    const [campaignImage, setCampaignImage] = useState(null);
    const { writeContract } = useWriteContract();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const reportIncident = async (data) => {
        console.log('Form Data: ', data);

        try {
            // Upload Image to Pinata
            const formData = new FormData();
            formData.append('file', campaignImage);

            const imageUploadResponse = await axios.post(
                'https://api.pinata.cloud/pinning/pinFileToIPFS',
                formData,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZmE1ODhiMS02M2YzLTQ0YTQtOTI0NS1lYmEzZWJhNzU0MzUiLCJlbWFpbCI6InNhbWVlcm1hZGhhdi41QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMzc0ZDM4YzQ2YmJmYzIxMTc1MSIsInNjb3BlZEtleVNlY3JldCI6ImFlMzgwNzllNWIyMjY5NDJlYzFhN2I0MWZmODc2YWFhYTE3Y2YzZDRiNTE5N2E4ZTZjNjEyNzA0NWMxODRkMWUiLCJleHAiOjE3NTcwOTMyODB9.IKcDXZ1B6OwgRFOsBrG_ixi39HSVl05EaW8dP87EDec`,
                    },
                }
            );

            console.log('Image uploaded:', imageUploadResponse.data.IpfsHash);

            // Prepare data for campaign upload
            const campaignData = {
                campaignTitle: data.campaignTitle,
                campaignDescription: data.campaignDescription,
                imageCID: imageUploadResponse.data.IpfsHash,
            };

            const campaignUploadResponse = await axios.post(
                'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                campaignData,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZmE1ODhiMS02M2YzLTQ0YTQtOTI0NS1lYmEzZWJhNzU0MzUiLCJlbWFpbCI6InNhbWVlcm1hZGhhdi41QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMzc0ZDM4YzQ2YmJmYzIxMTc1MSIsInNjb3BlZEtleVNlY3JldCI6ImFlMzgwNzllNWIyMjY5NDJlYzFhN2I0MWZmODc2YWFhYTE3Y2YzZDRiNTE5N2E4ZTZjNjEyNzA0NWMxODRkMWUiLCJleHAiOjE3NTcwOTMyODB9.IKcDXZ1B6OwgRFOsBrG_ixi39HSVl05EaW8dP87EDec`,
                    },
                }
            );

            console.log(
                'Campaign uploaded:',
                campaignUploadResponse.data.IpfsHash
            );

            // Blockchain interaction
            const endTimeUnix = Math.floor(
                new Date(data.campaignDeadline).getTime() / 1000
            );

            const tx = await contractInstance.createCampaign(
                ethers.utils.parseEther(data.campaignAmount),
                campaignUploadResponse.data.IpfsHash,
                data.campaignCategory,
                endTimeUnix
              );
              await tx.wait();

            console.log("TX is", tx)

            alert('Campaign created ✅');
        } catch (error) {
            console.error('Error in campaign creation:', error);
        }
    };

    return (
        <div className="new-campaign-form">
            <form onSubmit={handleSubmit(reportIncident)}>
                <h1>Create a New Campaign</h1>

                {/* Campaign Title */}
                <div className="form-group">
                    <label>Campaign Title *</label>
                    <input
                        type="text"
                        {...register('campaignTitle', {
                            required: 'Campaign Title is required',
                        })}
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
                        {...register('campaignAmount', {
                            required: 'Campaign Amount is required',
                        })}
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
                        {...register('campaignDescription', {
                            required: 'Campaign Description is required',
                        })}
                    ></textarea>
                    {errors.campaignDescription && (
                        <p className="error">
                            {errors.campaignDescription.message}
                        </p>
                    )}
                </div>

                {/* End Date */}
                <div className="form-group">
                    <label>End Date *</label>
                    <input
                        type="date"
                        {...register('campaignDeadline', {
                            required: 'Campaign Deadline is required',
                        })}
                    />
                    {errors.campaignDeadline && (
                        <p className="error">
                            {errors.campaignDeadline.message}
                        </p>
                    )}
                </div>

                {/* Campaign Category */}
                <div className="form-group">
                    <label>Campaign Category *</label>
                    <select
                        {...register('campaignCategory', {
                            required: 'Campaign Category is required',
                        })}
                    >
                        <option value="">Select a category</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Environment">Environment</option>
                        {/* Add more categories as needed */}
                    </select>
                    {errors.campaignCategory && (
                        <p className="error">
                            {errors.campaignCategory.message}
                        </p>
                    )}
                </div>

                {/* Image Upload */}
                <div className="form-group">
                    <label>Campaign Image *</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('campaignImage', {
                            required: 'Campaign Image is required',
                        })}
                        onChange={(e) => setCampaignImage(e.target.files[0])}
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

export default ReportIncident;
