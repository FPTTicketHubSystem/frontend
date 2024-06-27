import React, { useContext } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import request from './utils/request';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
// import Forum from './pages/Home/Forum';
import Profile from './pages/User/Profile';
import ConfirmAccount from './pages/AccountConfirm';
import CreateEvent from './pages/Organizer/CreateEvent';
import { UserContext } from './context/UserContext';
import EventDetail from './pages/EventDetail';
import Events from './pages/Organizer/Events';
import User from './pages/Admin/User';
import Eventapproval from './pages/Admin/Eventapproval';
import Forum from './component/Forum';
import Header from './component/Header';
import PostProvider from './context/PostContext';
import SubjectProvider from './context/SubjectContext';
import CommentProvider from './context/CommentContext';

function App() {
  const { token, user } = useContext(UserContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<PostProvider><SubjectProvider><CommentProvider><Forum /></CommentProvider></SubjectProvider></PostProvider>} />
          <Route path="/confirmaccount/:email" element={<ConfirmAccount />} />
          <Route path="/event-detail" element={<EventDetail />} />
          <Route path="/organizer/create-event" element={<CreateEvent />} />
          <Route path="/user" element={<User />} />
          <Route path="/eventapproval" element={<Eventapproval />} />
          <Route path="/confirmaccount/:email" element={<ConfirmAccount />} />
          <Route path="/event-detail/:encodedId" element={<EventDetail />} />
          <Route path="/organizer/create-event" element={<CreateEvent />} />
          <Route path="/organizer/events" element={<Events />} />
        </Routes>
      </Router>
    </div>);
}

export default App;
