import React from 'react';

const CreateZoneButton = () => {
    return (
        <button
            className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 rounded-lg mx-auto block"
            onClick={() => window.open('/createZone', '_blank')}
        >
            创建新分区
        </button >
    );
};

export default CreateZoneButton;