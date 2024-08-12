import React, { useState } from 'react';
import Input from './Input';
import axios from 'axios';

const CreateZone = ({ creator }) => {

    const [name, setName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const client = axios.default;

    const handleRegister = async (event) => {
        event.preventDefault();
        client.post('http://localhost:7001/api/createZone', { name: name, introduction: introduction, category: category, creator: creator }).then((response) => {
            setMessage(response.data.message); alert("创建成功~"); window.close();
        }).catch(function (error) {
            console.log(error);
        });
    };

    return (
        <form onSubmit={handleRegister} className='flex flex-col items-center justify-center space-y-10 py-10 h-screen'>
            <div><p className='text-lg'>创建分区：</p></div>
            <div>
                <Input setText={setName} Label={"名称"} value={name} />
            </div >
            <div>
                <Input setText={setIntroduction} Label={"简介"} value={introduction} />
            </div >
            <div>
                <Input setText={setCategory} Label={"所属领域"} value={category} />
            </div >
            <button type='submit' className='button'>
                创建
            </button>
        </form>
    );
};

export default CreateZone;