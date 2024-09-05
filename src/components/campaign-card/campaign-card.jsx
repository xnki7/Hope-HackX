import { Chip, Divider, Image } from '@nextui-org/react';
import UserIconComponent from '../user-icon-component/user-icon-component';
import ProgressBar from '../progress-bar/progress-bar';

const CampaignCard = () => {
    return (
        <div className="border bg-gray-50 rounded-lg flex items-center gap-10 shadow-md pr-8 py-4">
            <Image
                isBlurred
                width={200}
                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                alt="NextUI Album Cover"
                className="m-5"
                classNames={{}}
            />
            <div className="flex flex-col items-start">
                <UserIconComponent />
                <h3 className="font-bold text-2xl text-primary mt-2">
                    Sharing flood relief to the KGB
                </h3>
                <p className="text-sm text-content1 mt-2">
                    Your little donation can help feed young poor black children
                    affected by malnutrition
                </p>

                <Chip className="text-content1 mt-2">{'food'}</Chip>

                <div className='mt-4 w-full space-y-2'>
                    <ProgressBar />
                    <div className='flex justify-between font-semibold text-sm text-content1'>
                        <div>
                            Raised: <span className='text-primary'>1.6 Matic</span>
                        </div>
                        <div>
                            Time Left: <span className='text-primary'>27 days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
