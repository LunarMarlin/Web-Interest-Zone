import React, { useState } from 'react';
import * as axios from 'axios';
import Input from './Input';
// import bcrypt from 'bcryptjs';

const Register = ({ setLoggedIn }) => {
  // const salt = bcrypt.genSaltSync(10);
  const client = axios.default;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  let successful = false;

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password != repassword) {
      //重复输入密码
      setMessage("两次输入的密码不一致");
      return;
    } else if (password != password) {
      //账号重复
      return;
    }
    // const hashed_password = bcrypt.hashSync(password, salt);
    const hashed_password = password;
    client.post('http://localhost:7001/api/register', { username: username, email: email, password: hashed_password }).then((response) => {
      setMessage(response.data.message); successful = true; setLoggedIn(true);
    }).catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className="rounded-md">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>

          <Input setText={setUsername} Label={"用户名"} value={username} />
        </div>
        <div>
          <Input setText={setEmail} Label={"邮箱"} value={email} />
        </div>
        <div>
          <Input setText={setPassword} Label={"密码"} value={password} />
        </div>
        <div>
          <Input setText={setrePassword} Label={"确认密码"} value={repassword} />
        </div>
        <button type="submit" className='button' >Register</button>
      </form>
      {message && <p className='text-red-500 text-sm'>{message}</p>}
    </div>
  );
};

export default Register;