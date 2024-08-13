import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import Input from './Input';

const Register = ({ setLoggedIn, setUserID }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hashed_password, sethasHed_password] = useState('');
  const [repassword, setrePassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [usernameCorrect, setUsernameCorrect] = useState(null);
  const [emailCorrect, setEmailCorrect] = useState(null);
  const client = axios.default;

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
    client.get('http://localhost:7001/api/password/getHashed/' + password).then(response => {
      sethasHed_password(response.data);
    })
  };

  useEffect(() => {
    if (!hashed_password) return;
    console.log(hashed_password);
    client.get('http://localhost:7001/api/register/checkUsername/' + username).then(response => {
      setUsernameCorrect(response.data);
    })

    client.get('http://localhost:7001/api/register/checkEmail/' + email).then(response => {
      setEmailCorrect(response.data);
    })


  }, [hashed_password]);

  useEffect(() => {
    if (usernameCorrect === null || emailCorrect === null) return;
    if (!usernameCorrect) {
      setMessage('该用户名已被占用');
      setEmailCorrect(null);
      setUsernameCorrect(null);
      return;
    }
    if (!emailCorrect) {
      setMessage('该邮箱已被注册');
      setEmailCorrect(null);
      setUsernameCorrect(null);
      return;
    }
    client.post('http://localhost:7001/api/register', { username: username, email: email, password: hashed_password }).then((response) => {
      setMessage(response.data.message);
      alert("注册成功~");
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setLoggedIn(true);
    }).catch(function (error) {
      console.log(error);
    });
  }, [usernameCorrect, emailCorrect]);

  return (
    <div className="rounded-xl border border-blue-300 p-5 space-y-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className='space-y-5'>
        <div>

          <Input setText={setUsername} Label={"用户名"} value={username} />
        </div>
        <div>
          <Input setText={setEmail} Label={"邮箱"} value={email} />
        </div>
        <div>
          <Input setText={setPassword} Label={"密码"} type='password' value={password} />
        </div>
        <div>
          <Input setText={setrePassword} Label={"确认密码"} type='password' value={repassword} />
        </div>
        <button type="submit" className='button' >Register</button>
      </form>
      {message && <p className='text-red-500 text-sm'>{message}</p>}
    </div>
  );
};

export default Register;