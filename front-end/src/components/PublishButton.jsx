import React from 'react';
import { useNavigate } from 'react-router-dom';
const PublishButton = () => {

    const navigate = useNavigate();
    return (
        <button
            className="w-3/5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg mx-auto block"
            onClick={() => navigate('/publishPost')}
        >
            发布内容
        </button>
    );
};

export default PublishButton;