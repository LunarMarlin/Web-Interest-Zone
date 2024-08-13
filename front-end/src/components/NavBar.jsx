import React, { useState } from 'react';
import CreateZoneButton from './CreateZoneButton'
import FindZoneButton from './FindZoneButton';
import Input from './Input'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NavBar = ({ toFindZone, setToFindZone, inside = false }) => {
    const navigate = useNavigate();
    const zone = JSON.parse(localStorage.getItem('zone'));
    const user = JSON.parse(localStorage.getItem('user'));
    return <>
        <nav className="flex h-20 items-center px-4 py-5 bg-blue-200 justify-between">
            <div className='flex items-center space-x-10'>
                <button
                    className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 rounded-lg block w-[80px]"
                    onClick={() => { setToFindZone(false); navigate('/mainPage'); }}
                >首页
                </button >
                {inside && zone && <p className='text-blue-800 text-lg'>{zone.name}</p>}
            </div>
            <div className="flex h-full space-x-5">

                {!inside && <FindZoneButton setToFindZone={setToFindZone} toFindZone={toFindZone} />}
                {/* <Input type={'text'} setText={setSearch} placeholder={toFindZone ? '搜索内容' : '搜索分区'} /> */}
                <div className="flex items-center">
                    <CreateZoneButton />
                </div>
            </div>
            <button onClick={() => {
                window.open('/user/' + user.id);
            }} className='text-xl'>{user.username}</button>
        </nav>
    </>
}

export default NavBar;