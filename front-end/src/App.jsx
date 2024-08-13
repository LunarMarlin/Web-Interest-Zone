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

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(12);
  const [zone, setZone] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [toFindZone, setToFindZone] = useState(false);
  const client = axios.default;

  const updateZone = (zone) => {
    return () => {
      setZone(zone);
    }
  }
  useEffect(() => {
    if (zone !== null) {
      navigate('/zone/:' + zone.name);
    }
  }, [zone]);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('user'));
    if (a) {
      setUser(a);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    setUser(JSON.parse(localStorage.getItem('user')));
    navigate('/mainPage')
  }, [loggedIn]);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
          <NavBar toFindZone={toFindZone} setToFindZone={setToFindZone} />
          {!toFindZone && <Recommendation />}
          {toFindZone && <FindZone setZone={updateZone} />}
        </div >


      } />
      < Route path="/createZone" element={< CreateZone creator={userID} />} />
      < Route path="/zone/:name" element={
        <>

          <NavBar toFindZone={toFindZone} setToFindZone={setToFindZone} inside={true} zone={zone} />
          <div className="mb-5" />
          <InnerZone zone={zone} />
        </>} />


      < Route path="/publishPost" element={
        < div className="flex flex-col h-screen" >
          <NavBar toFindZone={toFindZone} setToFindZone={setToFindZone} />
          <PublishPost zone={zone} goBack={() => { navigate('/zone/:' + zone.name); alert('发布成功!'); }} />
        </div >

      } />

      < Route path="/post/:postID/:zoneID/:userID" element={
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
          <NavBar toFindZone={toFindZone} setToFindZone={setToFindZone} inside={true} />
          <CheckMembers />
        </div >
      } />

    </Routes >
  )
}

export default App
