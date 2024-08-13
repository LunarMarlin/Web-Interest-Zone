import React, { useState, useRef, useEffect } from 'react';
import OneContent from './OneContent';
import axios from 'axios';

const ShowContent = ({ zones = null, selectedUser = null }) => {
    const [length, setLength] = useState(9);
    const [lastTop, setLastTop] = useState(6);
    const ref = useRef(null);

    const client = axios.default;
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        client.post('http://localhost:7001/api/getPosts', { zones: zones, user: selectedUser })
            .then((response) => {
                setPosts(response.data);
            })
    }, []);

    const scroll = () => {
        const container = ref.current;

        const { scrollTop, scrollHeight, clientHeight } = container;

        if (Math.abs(scrollTop - lastTop) < 5 && (scrollTop + clientHeight >= scrollHeight - 10)) {
            setLength(length + 6);
        }
        setLastTop(scrollTop);
    }

    return (
        <div>
            {posts?.length > 0 && <div className="flex max-h-[770px] p-10 overflow-y-auto grid grid-cols-3 gap-10 h-full" ref={ref} onScroll={scroll}>
                {Array.from({ length: Math.min(length, posts.length) }, (_, index) => (
                    <div key={index} className="bg-gray-300 flex h-80">
                        <OneContent post={posts[index]} />
                    </div>
                ))}
                <div className="col-span-3 flex justify-center">
                    {posts && length > posts.length && <p>—— 到此为止了 ——</p>}
                </div>
            </div>}

            <div className="flex items-center justify-center w-full">
                {posts?.length == 0 && <p>暂无内容 ˉ▽ˉ</p>}
            </div>
        </div>
    );
};

export default ShowContent;