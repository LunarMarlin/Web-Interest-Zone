import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowContent from './ShowContent';
import axios from 'axios';
const ProfilePage = () => {
    const client = axios.default;
    useEffect(() => {
        client.get('http://localhost:7001/api/user/' + userID).then((response) => {
            setUser(response.data);
        });
    }, []);



    const { userID } = useParams();
    const [user, setUser] = useState(null);

    return (
        <>
            {user && <div className='flex flex-col'>
                <div className="flex h-32 items-center px-4 py-5 bg-blue-200 justify-between">
                    <p className='text-3xl mx-20 text-gray-400'>{user.username}</p>
                </div>
                <ShowContent zones={null} user={userID} />
            </div>}
        </>
    );
};

export default ProfilePage;