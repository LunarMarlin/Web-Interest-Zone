import React from 'react';
import OneContent from './OneContent'
const MainPage = () => {
    return (
        <>
            <button className=''>刷新</button>
            <div className="grid grid-cols-3 gap-10 h-full">
                {
                    Array.from({ length: 20 }, (_, index) => (
                        <div key={index} className="bg-gray-300 flex h-48">
                            <OneContent />
                            {index}
                        </div>
                    ))
                }

            </div>
        </>
    );
};

export default MainPage;