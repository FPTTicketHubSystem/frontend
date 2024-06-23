import React, {useContext} from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import request from './utils/request';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Forum from './pages/Home/Forum';
import Profile from './pages/User/Profile';
import ConfirmAccount from './pages/AccountConfirm';
import CreateEvent from './pages/Organizer/CreateEvent';
import { UserContext } from './context/UserContext';
import './App.css';
import EventDetail from './pages/EventDetail';

function App() {
  const { token, user } = useContext(UserContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/confirmaccount/:email" element={<ConfirmAccount/>} />
          <Route path="/event-detail" element={<EventDetail />} />
          <Route path="/organizer/create-event" element={<CreateEvent/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
