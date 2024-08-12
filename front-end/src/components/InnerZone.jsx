import React, { useState, useEffect } from 'react';
import ShowContent from './ShowContent';
import PublishButton from './PublishButton';
import CheckMembers from './CheckMembers';

const InnerZone = ({ creator, zone }) => {

    return (
        <>
            <div >
                <PublishButton creator={creator} zone={zone} />
                <CheckMembers zone={zone} />
            </div>
            <div className="mb-5" />
            <div className="flex flex-grow flex-col space-y-10">
                <div className="flex-grow bg-gray-100">
                    <ShowContent zones={[zone.id]} />
                </div>
            </div>
        </>
    );
};

export default InnerZone;