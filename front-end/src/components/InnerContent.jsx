import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SendComment from './SendComment';
import OneComment from './OneComment';

const InnerContent = () => {
    const client = axios.default;
    const { postID, zoneID } = useParams();
    const [zone, setZone] = useState(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [lastTop, setLastTop] = useState(0);
    const [length, setLength] = useState(6);

    const ref = useRef(null);

    const scroll = () => {
        const container = ref.current;

        const { scrollTop, scrollHeight, clientHeight } = container;

        if (Math.abs(scrollTop - lastTop) < 5 && (scrollTop + clientHeight >= scrollHeight - 10)) {
            setLength(length + 6);
        }
        setLastTop(scrollTop);
    }
    const addComment = () => {
        setLength(length + 1);
        post.replies_count += 1;
        client.post('http://localhost:7001/api/getComments', { post: postID })
            .then((response) => {
                setComments(response.data);
            })
        const container = ref.current;
        container.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    useEffect(() => {
        client.get('http://localhost:7001/api/zone/' + zoneID).then((response) => {
            setZone(response.data);
        });
        client.get('http://localhost:7001/api/post/' + postID).then((response) => {
            setPost(response.data);
        });

        client.post('http://localhost:7001/api/getComments', { post: postID })
            .then((response) => {
                setComments(response.data);
            })
    }, [])

    return (
        <>
            {post && comments && (Math.min(length, post.replies_count) <= comments.length) && <div className='flex items-center justify-center w-full h-full'>
                < div className='flex flex-col w-full max-h-[790px] overflow-y-auto items-center space-y-10 py-5 px-48' onScroll={scroll} ref={ref}>
                    <div key={-1} className="flex bg-gray-300 w-full items-center">
                        <OneComment userID={post.creator} content={post.content} created_date={post.created_at} />
                    </div>
                    {Array.from({ length: Math.min(length, post.replies_count) }, (_, index) => (
                        <div key={index} className="flex bg-gray-300 w-full items-center">
                            <OneComment userID={comments[index].creator} content={comments[index].content} created_date={comments[index].created_at} />
                        </div>
                    ))}

                    <div className="flex justify-center">
                        {post && length > post.replies_count + 1 && <p>—— 到此为止了 ——</p>}
                    </div>
                </div >
                <SendComment post={post.id} addComment={addComment} />
            </div>
            }

        </>
    );
};

export default InnerContent;