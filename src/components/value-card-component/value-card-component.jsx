import React from 'react';

function ValueCardComponent({ value, description }) {
    return (
        <div className="bg-secondary/30 rounded-3xl shadow-md p-4 flex flex-col items-center justify-center w-32 h-32">
            <div className="text-4xl font-bold text-primary">
                {value}
            </div>
            
            <div className="bg-primary text-white font-semibold text-md rounded-lg px-2 py-1 mt-2 w-full text-center">
                {description}
            </div>
        </div>
    );
}

export default ValueCardComponent;
