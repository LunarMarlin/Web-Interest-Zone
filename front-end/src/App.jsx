import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(12);
  const [zone, setZone] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [toFindZone, setToFindZone] = useState(false);


  const settoFindZoneFunc = (val) => {
    localStorage.setItem('toFindZone', val);
    console.log(val);
    setToFindZone(val);
  }

  useEffect(() => {
    if (zone !== null) {
      navigate('/zone/:' + zone.name);
    }
  }, [zone]);

  useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem('user'));
    if (userTemp) {
      setUser(userTemp);
    }
    const b = JSON.parse(localStorage.getItem('toFindZone'));
    if (b) {
      setToFindZone(b);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    setUser(JSON.parse(localStorage.getItem('user')));
    navigate('/mainPage')
  }, [loggedIn]);

  if (localStorage.getItem('user') == null) return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/" element={
        < div className='flex h-screen w-screen items-center justify-center'>
          <div className='flex space-x-20'>
            <Register setLoggedIn={setLoggedIn} />
            <Login setLoggedIn={setLoggedIn} />
          </div>
        </div>
      } />
    </Routes >
  )

  return (
    <Routes>

      <Route path="/" element={
        < div className='flex h-screen w-screen items-center justify-center'>
          <div className='flex space-x-20'>
            <Register setLoggedIn={setLoggedIn} />
            <Login setLoggedIn={setLoggedIn} />
          </div>
        </div>
      } />
      < Route path="/mainPage" element={

        < div className='flex flex-col h-screen space-y-5' >
          <NavBar toFindZone={toFindZone} setToFindZone={settoFindZoneFunc} />
          {!toFindZone && <Recommendation />}
          {toFindZone && <FindZone setZone={setZone} />}
        </div >


      } />
      < Route path="/createZone" element={< CreateZone creator={userID} />} />
      < Route path="/zone/:name" element={
        <>

          <NavBar toFindZone={toFindZone} setToFindZone={settoFindZoneFunc} inside={true} />
          <div className="mb-5" />
          <InnerZone />
        </>} />


      < Route path="/publishPost" element={
        < div className="flex flex-col h-screen" >
          <NavBar toFindZone={toFindZone} setToFindZone={settoFindZoneFunc} />
          <PublishPost goBack={() => { navigate('/zone/:' + zone.name); alert('发布成功!'); }} />
        </div >

      } />

      < Route path="/post/:postID/:zoneID" element={
        < div >
          {< InnerContent />}
        </div >
      } />


      < Route path="/user/:userID" element={
        < div >
          <ProfilePage />
        </div >
      } />

      < Route path="/checkMembers/:zoneID" element={
        < div >
          <NavBar toFindZone={toFindZone} setToFindZone={settoFindZoneFunc} inside={true} />
          <CheckMembers />
        </div >
      } />

    </Routes >
  )
}

export default App
