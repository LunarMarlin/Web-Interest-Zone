import React, { useState, useEffect } from 'react';
import ShowContent from './ShowContent';
import PublishButton from './PublishButton';
import { useNavigate } from 'react-router-dom';

const InnerZone = ({ creator }) => {

    const navigate = useNavigate();
    const zone = JSON.parse(localStorage.getItem('zone'));
    return (
        <>
            <div className='flex' >
                <PublishButton creator={creator} zone={zone} />


                <button
                    className="w-44 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg block mx-40"
                    onClick={() => navigate('/checkMembers/' + zone.id)}
                >
                    活跃情况
                </button>

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