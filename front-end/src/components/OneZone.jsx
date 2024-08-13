import React from 'react';

const OneZone = ({ zone, setZone }) => {
    return (
        <div className='flex space-x-5 items-center w-full justify-between px-5'>
            <p className='text-3xl'>{zone.name}</p>
            <p>{zone.introduction}</p>
            <button className='button' onClick={() => { setZone(zone); localStorage.setItem('zone', JSON.stringify(zone)) }}>进入分区</button>
        </div>
    );
};

export default OneZone;