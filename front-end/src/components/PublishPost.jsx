import React, { useState } from 'react';
import Input from './Input';
import axios from 'axios';
import ContentInput from './ContentInput';

const PublishPost = ({ creator, zone, goBack }) => {

    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const client = axios.default;
    const handleRegister = async (event) => {
        event.preventDefault();
        const block = document.getElementById('editable');
        const theContent = block.innerHTML;
        client.post('http://localhost:7001/api/publishPost', { title: title, introduction: introduction, zone: zone.id, creator: creator, content: theContent }).then((response) => {
            setMessage(response.data.message); goBack();
        }).catch(function (error) {
            console.log(error);
        });
    };



    return (
        <form onSubmit={handleRegister} className='flex flex-col flex-grow items-center justify-center space-y-10 py-10 px-36'>
            <div>
                <p>分区：{zone.name}</p>
            </div>
            <div className={'self-start'}>
                <Input setText={setTitle} Label={"标题"} value={title} />
            </div >
            <div className={'self-start'}>
                <Input className={'self-start'} setText={setIntroduction} Label={"简介"} value={introduction} />
            </div >
            <div className='flex flex-grow w-full px-20'>
                <ContentInput setText={setContent} value={content} />
            </div >
            <button type='submit' className='button'>
                发布
            </button>
        </form>
    );
};

export default PublishPost;