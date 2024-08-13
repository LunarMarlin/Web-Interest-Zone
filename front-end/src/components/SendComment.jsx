import React, { useState } from 'react';
import CreateZoneButton from './CreateZoneButton'
import ContentInput from './ContentInput';
import FindZoneButton from './FindZoneButton';
import Input from './Input'
import axios from 'axios';
const SendComment = ({ post, addComment }) => {

    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const client = axios.default;
    const user = JSON.parse(localStorage.getItem('user'));
    const submit = async (event) => {

        event.preventDefault();
        const block = document.getElementById('editable');
        const theContent = block.innerHTML;
        client.post('http://localhost:7001/api/sendComment', { post: post, creator: user.id, content: theContent }).then((response) => {
            setMessage(response.data.message); addComment(); setContent('');
            //(await getRepository(Userinfo).findOne({ where: { username } })).id
        })
    }

    return <>
        <form onSubmit={submit} className="flex min-h-20 max-h-90 fixed bottom-0 items-center px-4 py-5 space-x-5 bg-blue-200 justify-between w-3/5">
            <div className="flex flex-grow h-full max-h-80 space-x-5 rounded-md break-all">
                <ContentInput value={content} setText={setContent} placeholder={'回复...'} />
            </div>
            <button type="submit" className='button'>回复</button>
        </form>
    </>
}

export default SendComment;