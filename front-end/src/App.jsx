import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import FindZone from './components/FindZone';
import NavBar from './components/NavBar'
import MainPage from './components/MainPage'
import CheckMembers from './components/CheckMembers';
import CreateZone from './components/CreateZone'
import OneZone from './components/OneZone';
import InnerZone from './components/InnerZone'
import PublishPost from './components/PublishPost';
import Recommendation from './components/Recommendation';
import './App.css'
import axios from 'axios'
import InnerContent from './components/InnerContent';
import ProfilePage from './components/ProfilePage';


function App() {
  // const [message, setMessage] = useState('')

  // useEffect(() => {
  //   // Fetch message from Midway backend
  //   axios.get('http://localhost:7001/add')  
  //     .then(response => {
  //       setMessage(response.data.message);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  const [userID, setUserID] = useState(12);
  const [user, setUser] = useState(null);
  const [zone, setZone] = useState(null);
  const [toFindZone, setToFindZone] = useState(false);
  const client = axios.default;

  const updateZone = (zone) => {
    return () => {
      setZone(zone);
    }
  }
  useEffect(() => {
    if (zone !== null) {
      // 在 zone 状态更新后执行某些操作
      navigate('/zone/:' + zone.name);
    }
  }, [zone]);
  useEffect(() => {
    client.get('http://localhost:7001/api/user/' + userID).then((response) => {
      setUser(response.data);
    });
  }, [userID]);

  return (
    <Routes>
      <Route path="/" element={

        <div className='flex flex-col h-screen space-y-5'>
          <NavBar toFindZone={toFindZone} setToFindZone={() => { setToFindZone(!toFindZone); }} user={user} />
          {/* {!loggedIn &&
              <div>
                <Register setLoggedIn={setLoggedIn} />
                <Login setLoggedIn={setLoggedIn} setUserID={setUserID}/>
              </div>} */}
          {/* <CreateZone creator={user} /> */}
          {/* {loggedIn && <MainPage />} */}
          {/* <InnerZone /> */}
          {!toFindZone && <Recommendation />}
          {toFindZone && <FindZone setZone={updateZone} />}
        </div>


      } />
      <Route path="/createZone" element={<CreateZone creator={12} />} />
      <Route path="/zone/:name" element={
        <>

          <NavBar toFindZone={toFindZone} setToFindZone={() => { setToFindZone(!toFindZone); }} inside={true} zone={zone} user={user} />
          <div className="mb-5" />
          <InnerZone zone={zone} />
        </>} />


      <Route path="/publishPost" element={
        <div className="flex flex-col h-screen">
          <NavBar toFindZone={toFindZone} setToFindZone={() => { setToFindZone(!toFindZone); }} user={user} />
          <PublishPost creator={user} zone={zone} goBack={() => { navigate('/zone/:' + zone.name); alert('发布成功!'); }} />
        </div>

      } />

      <Route path="/post/:postID/:zoneID" element={
        <div>
          {/* <NavBar toFindZone={toFindZone} setToFindZone={() => { setToFindZone(!toFindZone); }} inside={true} user={user}/> */}
          <InnerContent user={user} />
        </div>
      } />


      <Route path="/user/:userID" element={
        <div>
          <ProfilePage />
        </div>
      } />

      <Route path="/checkMembers/:zoneID" element={
        <div>
          <NavBar toFindZone={toFindZone} setToFindZone={() => { setToFindZone(!toFindZone); }} inside={true} user={user} />
          <CheckMembers />
        </div>
      } />

    </Routes>
  )
}

export default App
