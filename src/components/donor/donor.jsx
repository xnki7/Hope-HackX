import React from 'react';
import UserIconComponent from '../user-icon-component/user-icon-component';
import { Divider } from '@nextui-org/react';

function Donor({username, img, value}) {
    return (
        <div>
            <Divider className="mb-2" />
            <div className="flex justify-between px-8 items-center text-sm font-semibold">
                <UserIconComponent username={username} img={img} />
                <div>
                    <span className="text-primary mr-2">{value}</span>
                    <span>Matic</span>
                </div>
            </div>
        </div>
    );
}

export default Donor;
