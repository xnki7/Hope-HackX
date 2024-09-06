import { Chip, Divider, Image } from '@nextui-org/react';
import UserIconComponent from '../user-icon-component/user-icon-component';
import ProgressBar from '../progress-bar/progress-bar';
import { useState, useEffect } from 'react';

const CampaignCard = ({
    campaignId,
    contract,
    title,
    description,
    img,
    campaignOwner,
    campaignCategory,
    requiredAmount,
}) => {
    const [remTime, setRemTime] = useState(null);
    const [profileUsername, setProfileUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [raisedAmount, setRaisedAmount] = useState(null);

    const getRaisedAmount = async () => {
        const tx = await contract.getRaisedAmount(campaignId);
        setRaisedAmount(tx);
    };

    const getProfileUserName = async () => {
        const tx = await contract.getProfileUserName(campaignOwner);
        setProfileUsername(tx);
    };

    const getProfilePic = async () => {
        const tx = await contract.getProfileCID(campaignOwner);
        setProfilePic(tx);
    };

    const getRemTime = async () => {
        const tx = await contract.getRemainingTime(campaignId);
        setRemTime(tx);
    };

    useEffect(() => {
        getRaisedAmount();
        getProfileUserName();
        getProfilePic();
        getRemTime();
    }, []);

    return (
        <div className="border bg-gray-50 rounded-lg flex items-center gap-10 shadow-md py-4">
            <Image
                isBlurred
                src={img}
                alt="NextUI Album Cover"
                className="m-5"
                width={200} // Setting a fixed width
                height={200} // Setting a fixed height
                style={{ objectFit: 'cover', width: '200px', height: '200px' }}
            />
            <div className="flex flex-col items-start w-max">
                <UserIconComponent username={profileUsername} img={profilePic}/>
                <h3 className="font-bold text-2xl text-primary mt-2">
                    {title && title.toString().length > 60
                        ? title.slice(0, 45) + ' ...'
                        : title}
                </h3>
                <p className="text-sm text-content1 mt-2">
                    {description && description.toString().length > 60
                        ? description.slice(0, 45) + ' ...'
                        : description}
                </p>

                <Chip className="text-content1 mt-2">{campaignCategory}</Chip>

                <div className="mt-4 w-full space-y-2">
                    <ProgressBar
                        value={
                            (Number(raisedAmount) / Number(requiredAmount)) *
                            100
                        }
                        goalAmount={parseInt(requiredAmount) / 1e18}
                    />

                    <div className="flex justify-between gap-8 font-semibold text-sm text-content1">
                        <div>
                            Raised:{' '}
                            <span className="text-primary">
                                {parseInt(raisedAmount) / 1e18} Matic
                            </span>
                        </div>
                        <div>
                            Time Left:{' '}
                            <span className="text-primary">
                                {Math.floor(remTime / 86400).toString()} Days
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
