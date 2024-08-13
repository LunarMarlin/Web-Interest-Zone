import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OneContent = ({ post = null }) => {


    const [zone, setZone] = useState(null);
    const [user, setUser] = useState(null);
    const client = axios.default;
    useEffect(() => {
        client.get('http://localhost:7001/api/user/' + post.creator).then((response) => {
            setUser(response.data);
        });
        client.get('http://localhost:7001/api/zone/' + post.zone).then((response) => {
            setZone(response.data);
        });

    }, []);

    const getInside = () => {
        if (!post) return;
        window.open('/post/' + post.id + '/' + post.zone);
    }
    return (
        <>
            {user && zone &&
                <button className='w-full' onClick={getInside}>
                    <p>标题：{post.title}</p>
                    <p>{new Date(post.created_date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                    <p>分区：{zone.name}</p>
                </button>
            }
        </>
    );
};

export default OneContent;