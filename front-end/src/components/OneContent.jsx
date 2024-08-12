import React from 'react';

const OneContent = ({ post = null }) => {
    const getInside = () => {
        if (!post) return;
        window.open('/post/' + post.id + '/' + post.zone);
    }
    return (
        <button className='w-full' onClick={getInside}>
            <p>id:{post.id}</p>
            <p>标题：{post.title}</p>
            <p>{post.created_date}</p>
            <p>分区id：{post.zone}</p>
        </button>
    );
};

export default OneContent;