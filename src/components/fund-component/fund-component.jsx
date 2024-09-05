
import { Button, Input } from '@nextui-org/react';
import React from 'react';
import ProgressBar from '../progress-bar/progress-bar';

function FundComponent() {
    return (
        <div className='p-4 bg-gray-50 shadow-md border rounded-xl lg:w-1/3 pb-8 h-fit'>
            <h1 className="text-2xl font-bold text-content1 mb-2">Fund</h1>
            <Input
                type="number"
                label="Price"
                placeholder="0.00"
                labelPlacement="outside"
                endContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">Matic</span>
                    </div>
                }
                className='mb-6'
            />
            <ProgressBar />
            <Button color='primary' className='text-gray-50 mt-6 font-semibold'>Fund Campaign</Button>
        </div>
    );
}

export default FundComponent;
