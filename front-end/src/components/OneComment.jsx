import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const OneComment = ({ userID, created_date, content }) => {
    const contentRef = useRef(null);
    const [user, setUser] = useState(null);
    const client = axios.default;
    useEffect(() => {
        client.get('http://localhost:7001/api/user/' + userID).then((response) => {
            setUser(response.data);
        });

    }, []);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.innerHTML = content;
        }
    }, [user]);
    return (
        <>
            {user && <div className='w-full flex flex-col items-start justify-between break-all space-y-2 p-5'>
                <div className='flex space-x-20'>
                    <button onClick={() => {
                        window.open('/user/' + userID);
                    }}>{user.username}：</button>
                    <p className='text-gray-400'>{new Date(created_date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>
                <div ref={contentRef} className='mx-40'></div>
            </div>}
        </>
    );
};

export default OneComment;