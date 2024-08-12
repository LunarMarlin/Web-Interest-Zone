import React from 'react';
import ShowContent from './ShowContent';

const Recommendation = () => {
    return (
        <div className="flex flex-grow flex-col space-y-10">
            <div className="flex-grow bg-gray-100">
                <ShowContent zones={[]} />
            </div>
        </div>
    );
};

export default Recommendation;