import React from 'react';

const FindZoneButton = ({ toFindZone, setToFindZone }) => {
    return (
        <button
            className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 rounded-lg mx-auto block w-[100px]"
            onClick={() => setToFindZone(!toFindZone)}
        >
            {!toFindZone ? '找分区' : "返回推荐页"}
        </button >
    );
};

export default FindZoneButton;