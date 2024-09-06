import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ethers } from 'ethers';
import { useWriteContract } from 'wagmi';
import { contractAbi, contractAddress } from '../../../constants.js';

function ReportIncident({ contractInstance, setLoading }) {
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
            setLoading(true);
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

            writeContract({
                abi: contractAbi,
                address: contractAddress,
                functionName: 'createCampaign',
                args: [
                    ethers.utils.parseEther(data.campaignAmount),
                    campaignUploadResponse.data.IpfsHash,
                    data.campaignCategory,
                    endTimeUnix,
                ],
            });
        } catch (error) {
            console.error('Error in campaign creation:', error);
        } finally{
            setLoading(false)
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <form onSubmit={handleSubmit(reportIncident)}>
                <h1 className="text-2xl font-bold text-center mb-6">
                    Create a New Campaign
                </h1>

                {/* Campaign Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Campaign Title *
                    </label>
                    <input
                        type="text"
                        {...register('campaignTitle', {
                            required: 'Campaign Title is required',
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.campaignTitle && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.campaignTitle.message}
                        </p>
                    )}
                </div>

                {/* Required Fund */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Required Fund (in MATIC) *
                    </label>
                    <input
                        type="number"
                        step="any"
                        {...register('campaignAmount', {
                            required: 'Campaign Amount is required',
                            min: {
                                value: 0,
                                message:
                                    'Campaign Amount must be greater than 0',
                            },
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.campaignAmount && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.campaignAmount.message}
                        </p>
                    )}
                </div>

                {/* Campaign Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Tell Your Story *
                    </label>
                    <textarea
                        rows="7"
                        {...register('campaignDescription', {
                            required: 'Campaign Description is required',
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                    {errors.campaignDescription && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.campaignDescription.message}
                        </p>
                    )}
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        End Date *
                    </label>
                    <input
                        type="date"
                        {...register('campaignDeadline', {
                            required: 'Campaign Deadline is required',
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.campaignDeadline && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.campaignDeadline.message}
                        </p>
                    )}
                </div>

                {/* Campaign Category */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Campaign Category *
                    </label>
                    <select
                        {...register('campaignCategory', {
                            required: 'Campaign Category is required',
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a category</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Environment">Environment</option>
                        {/* Add more categories as needed */}
                    </select>
                    {errors.campaignCategory && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.campaignCategory.message}
                        </p>
                    )}
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Campaign Image *
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('campaignImage', {
                            required: 'Campaign Image is required',
                        })}
                        onChange={(e) => setCampaignImage(e.target.files[0])}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.campaignImage && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.campaignImage.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Submit Campaign
                </button>
            </form>
        </div>
    );
}

export default ReportIncident;
