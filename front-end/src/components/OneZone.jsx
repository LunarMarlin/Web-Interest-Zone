import React from 'react';

const OneZone = ({ zone, setZone }) => {
    return (
        <div className='flex space-x-5 items-center w-full justify-between px-5'>
            <p>区块{zone.name}</p>
            <p>{zone.introduction}</p>
            <button onClick={setZone(zone)}>进入分区</button>
        </div>
    );
};

export default OneZone;