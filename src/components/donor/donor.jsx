import React from 'react';
import UserIconComponent from '../user-icon-component/user-icon-component';
import { Divider } from '@nextui-org/react';

function Donor() {
    return (
        <div>
            <Divider className="mb-2" />
            <div className="flex justify-between px-8 items-center text-sm font-semibold">
                <UserIconComponent />
                <div>
                    <span className="text-primary mr-2">0.001</span>
                    <span>Matic</span>
                </div>
            </div>
        </div>
    );
}

export default Donor;
