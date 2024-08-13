import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const CheckMembers = () => {
    const { zoneID } = useParams();
    const [posts, setPosts] = useState(null);
    const client = axios.default;
    const [list, setList] = useState(null);
    const [length, setLength] = useState(10);
    const [lastTop, setLastTop] = useState(0);
    const ref = useRef(null);

    const scroll = () => {
        const container = ref.current;

        const { scrollTop, scrollHeight, clientHeight } = container;

        if (Math.abs(scrollTop - lastTop) < 5 && (scrollTop + clientHeight >= scrollHeight - 10)) {
            setLength(length + 6);
        }
        setLastTop(scrollTop);
    }

    useEffect(() => {
        client.get('http://localhost:7001/api/getPosts/' + zoneID).then((response) => {
            setPosts(response.data);
        });
    }, []);


    useEffect(() => {
        if (!posts) return;

        const func = async (post) => {
            const response = await client.get('http://localhost:7001/api/user/' + post.creator);
            return {
                username: response.data.username,
                date: post.created_at
            };
        }

        const seenCreators = new Set();
        const filteredPosts = posts.filter(post => {
            if (!seenCreators.has(post.creator)) {
                seenCreators.add(post.creator);
                return true;
            }
            return false;
        });
        const promises = filteredPosts.map(post => {
            return func(post);
        });

        Promise.all(promises)
            .then(updatedList => {
                setList(updatedList);
            });

    }, [posts]);

    return (
        <>
            {list?.length > 0 && <div className="flex flex-col px-80 py-5 max-h-[790px]  overflow-y-auto items-center space-y-10 my-5" ref={ref} onScroll={scroll}>
                <p>最近发表：</p>
                {Array.from({ length: Math.min(length, list.length) }, (_, index) => (
                    <div key={index} className="flex flex-shrink-0 bg-gray-300 h-[100px] w-full items-center space-x-10 p-10">
                        <p className='text-xl'>{list[index].username}   ：</p>
                        <p>{new Date(list[index].date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                    </div>
                ))}

                <div className="flex justify-center">
                    {list && length > list.length && <p>—— 到此为止了 ——</p>}
                </div>
            </div>}

            <div className="flex items-center justify-center w-full my-20">
                {list?.length == 0 && <p>暂无记录 ˉ▽ˉ</p>}
            </div>
        </>
    );
}

export default CheckMembers;