import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import { useNavigate } from 'react-router-dom'

const Login = ({ setLoggedIn }) => {
    const client = axios.default;
    const navigate = useNavigate;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        client.post('http://localhost:7001/api/login', { username: username, password: password }).then((response) => {
            setMessage(response.data.message);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                setLoggedIn(true);
            }
        })
            .catch(function (error) { console.log(error) });
    }
    return (
        <div className="rounded-xl border border-blue-300 p-5 space-y-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className='space-y-5'>
                <div>
                    <Input setText={setUsername} Label={"用户名"} value={username} />
                </div>
                <div>
                    <Input setText={setPassword} Label={"密码"} type="password" value={password} />
                </div>
                <button type="submit" className='button'>Login</button>
            </form>
            {message && <p className='text-red-500 text-sm'>{message}</p>}
        </div >
    );
}

export default Login;