import { Divider, Image } from '@nextui-org/react';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Donor from '../../components/donor/donor';
import UserIconComponent from '../../components/user-icon-component/user-icon-component';
import ValueCardComponent from '../../components/value-card-component/value-card-component';
import FundComponent from '../../components/fund-component/fund-component';
import { ethers } from 'ethers';
import axios from 'axios';
import { Button, Input } from '@nextui-org/react';
import { useWriteContract } from 'wagmi';
import { contractAddress, contractAbi } from '../../../constants';
import ProgressBar from '../../components/progress-bar/progress-bar';

function CampaignDetail({ contract, setLoading }) {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [currCampaign, setCurrCampaign] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [remTime, setRemTime] = useState(null);
    const [profileUsername, setProfileUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [amount, setAmount] = useState(null);
    const [donators, setDonators] = useState(null);
    const [isProfileCreated, setIsProfileCreated] = useState(false);

    const { writeContract } = useWriteContract();

    const fetchCampaignDetails = useCallback(async () => {
        setIsLoading(true);
        try {
            const campaignURI = await contract.getCampaignURI(campaignId);
            const metadata = await fetchCampaignMetadata(campaignURI);
            console.log('Metadata for campaignId', campaignId, ':', metadata);
            setCampaign(metadata);
            console.log(metadata);
        } catch (error) {
            console.error('Error fetching Campaign metadata:', error);
        }
        setIsLoading(false);
    }, [contract, campaignId]);

    const getProfileUserName = useCallback(async () => {
        setIsLoading(true);
        const tx = await contract.getProfileUserName(
            currCampaign?.campaignOwner
        );
        setProfileUsername(tx);
        setIsLoading(false);
    }, [contract, currCampaign]);

    const getIsProfileCreated = async () => {
        if (contract) {
            setIsLoading(true);
            const tx = await contract.getIsProfileCreated();
            setIsProfileCreated(tx);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getIsProfileCreated();
    }, [contract]);

    const getProfilePic = useCallback(async () => {
        setIsLoading(true);
        const tx = await contract.getProfileCID(currCampaign?.campaignOwner);
        setProfilePic(tx);
        setIsLoading(false);
    }, [contract, currCampaign]);

    const donateInCampaign = useCallback(async () => {
        const raisedAmount = currCampaign?.raisedAmount || 0;
        const requiredAmount = currCampaign?.requiredAmount || 0;
        const remainingAmount = requiredAmount - raisedAmount;
        try {
            setLoading(true)
            if (amount <= remainingAmount) {
                // const tx = await contract.donateInCampaign(campaignId, {
                //     // gasLimit: 900000,
                //     value: ethers.utils.parseEther(amount),
                // });
                // await tx.wait();
                // window.location.reload();
                writeContract({
                    abi: contractAbi,
                    address: contractAddress,
                    functionName: 'donateInCampaign',
                    args: [campaignId],
                    value: ethers.utils.parseEther(amount)
                });
            }
        } catch (error) {
            console.log(error)
            if (!isProfileCreated) {
                alert('Create a profile inorder to fund a camapign.');
            } else {
                alert(
                    `The amount should be less than or equal to ${
                        remainingAmount / 1000000000000000000
                    } MATIC`
                );
            }
        } finally{
            setLoading(false)
        }
    }, [contract, campaignId, amount, currCampaign]);

    const getRemTime = useCallback(async () => {
        if (contract) {
            setIsLoading(true);
            const tx = await contract.getRemainingTime(campaignId);
            setRemTime(tx);
            setIsLoading(false);
        }
    }, [contract, campaignId]);

    const getDonators = useCallback(async () => {
        if (contract) {
            setIsLoading(true);
            const tx = await contract.getDonators(campaignId);
            setDonators(tx);
            setIsLoading(false);
        }
    }, [contract, campaignId]);

    const getCampaign = useCallback(async () => {
        if (contract) {
            setIsLoading(true);
            const tx = await contract.getCampaign(campaignId);
            setCurrCampaign(tx);
            setIsLoading(false);
        }
    }, [contract, campaignId]);

    const fetchCampaignMetadata = useCallback(async (campaignURI) => {
        try {
            const response = await axios.get(
                `https://ipfs.io/ipfs/${campaignURI}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching Campaign metadata:', error);
            return null;
        }
    }, []);

    useEffect(() => {
        if (contract) {
            getRemTime();
            getCampaign();
            getDonators();
        }
    }, [contract, campaignId, getRemTime, getCampaign, getDonators]);

    useEffect(() => {
        if (contract && currCampaign) {
            getProfileUserName();
            getProfilePic();
        }
    }, [contract, currCampaign, getProfileUserName, getProfilePic]);

    useEffect(() => {
        fetchCampaignDetails();
    }, [fetchCampaignDetails]);

    return (
        <>
            {campaign ? (
                <div className="p-6 bg-gray-50 rounded-xl max-w-7xl mx-auto mt-6 shadow-md">
                    <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
                        {/* Image Container */}
                        <div className="flex-1 lg:w-2/3 h-96 overflow-hidden rounded-xl">
                            <Image
                                src={`https://ipfs.io/ipfs/${campaign.imageCID}`}
                                alt="Campaign Image"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Donor List */}
                        <div className="flex-shrink-0 w-full lg:w-1/3 h-96 rounded-xl scrollbar-thin overflow-auto border bg-white">
                            <h1 className="text-4xl font-bold text-content1 bg-gray-50 z-10 p-4 sticky top-0">
                                Donors
                            </h1>
                            <div className="space-y-2 px-4 pb-4">
                                {donators && donators.length > 0 ? (
                                    donators.map((donator, index) => (
                                        <Donor
                                            key={index}
                                            username={donator.donatorName}
                                            img={donator.donatorCID}
                                            value={(
                                                donator.donatorAmount / 1e18
                                            ).toString()}
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-6 gap-10">
                        <div className="lg:w-2/3">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-content1 mb-2">
                                        {campaign.campaignTitle}
                                    </h1>
                                    <UserIconComponent
                                        username={profileUsername}
                                        img={profilePic}
                                    />
                                </div>
                                <div className="flex gap-8">
                                    <ValueCardComponent
                                        description={'Days Left'}
                                        value={Math.floor(
                                            remTime / 86400
                                        ).toString()}
                                    />
                                    <ValueCardComponent
                                        description={`Out of ${
                                            currCampaign?.requiredAmount
                                                ? (
                                                      currCampaign.requiredAmount /
                                                      1000000000000000000
                                                  ).toString()
                                                : '0'
                                        }`}
                                        value={
                                            currCampaign?.raisedAmount
                                                ? (
                                                      currCampaign.raisedAmount /
                                                      1000000000000000000
                                                  ).toString()
                                                : '0'
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h1 className="text-2xl font-bold text-content1 mb-2">
                                    Story
                                </h1>
                                <div>
                                    <p>{campaign.campaignDescription}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 shadow-md border rounded-xl lg:w-1/3 pb-8 h-fit">
                            <h1 className="text-2xl font-bold text-content1 mb-2">
                                Fund
                            </h1>
                            <Input
                                type="number"
                                label="Price"
                                // placeholder="0.00"
                                value={amount}
                                placeholder="Enter amount (in MATIC)"
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                labelPlacement="outside"
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">
                                            Matic
                                        </span>
                                    </div>
                                }
                                className="mb-6"
                            />
                            <ProgressBar
                                value={
                                    (Number(currCampaign?.raisedAmount) /
                                        Number(currCampaign?.requiredAmount)) *
                                    100
                                }
                                goalAmount={
                                    parseInt(currCampaign?.requiredAmount) /
                                    1e18
                                }
                            />
                            <Button
                                color="primary"
                                className="text-gray-50 mt-6 font-semibold"
                                onClick={donateInCampaign}
                            >
                                Fund Campaign
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default CampaignDetail;
