import { Divider, Image } from '@nextui-org/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Donor from '../../components/donor/donor';
import UserIconComponent from '../../components/user-icon-component/user-icon-component';
import ValueCardComponent from '../../components/value-card-component/value-card-component';
import FundComponent from '../../components/fund-component/fund-component';

function CampaignDetail() {
    const { campaignId } = useParams();

    return (
        <div className="p-6 bg-gray-50 rounded-xl max-w-7xl mx-auto mt-6 shadow-md">
            <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
                {/* Image Container */}
                <div className="flex-1 lg:w-2/3 h-96 overflow-hidden rounded-xl">
                    <Image
                        src="https://plus.unsplash.com/premium_photo-1695914185618-475412b5d982?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                        <Donor />
                        <Donor />
                        <Donor />
                        <Donor />
                        <Donor />
                        <Donor />
                        <Donor />
                        <Donor />
                    </div>
                </div>
            </div>
            <div className="flex mt-6 gap-10">
                <div className="lg:w-2/3">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-content1 mb-2">
                                Creator
                            </h1>
                            <UserIconComponent />
                        </div>
                        <div className="flex gap-8">
                            <ValueCardComponent
                                description={'Days Left'}
                                value={'27'}
                            />
                            <ValueCardComponent
                                description={'Out of 0.1'}
                                value={'0.001'}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-2xl font-bold text-content1 mb-2">
                            Story
                        </h1>
                        <div>
                            <p>
                                🌟 Help Us Provide Urgent Relief! 🌟 We are
                                raising funds to support earthquake relief
                                efforts, helping families affected by the recent
                                disaster. Your donation will go towards
                                providing emergency shelter, food, and medical
                                care for those in need. 💡 Goal: 0.1 Matic ⏳
                                Time Left: 6 Days 🎯 Amount Raised So Far: 0.01
                                Matic We’ve made great progress, but we still
                                need your help to reach our goal. Every bit
                                counts and brings us closer to delivering
                                much-needed aid to those impacted. 🙏 Donate
                                Today to Make a Difference! 🙏 [Donation link]
                                Thank you for your kindness and support! Team
                                Hope
                            </p>
                        </div>
                    </div>
                </div>
                <FundComponent />
            </div>
        </div>
    );
}

export default CampaignDetail;
