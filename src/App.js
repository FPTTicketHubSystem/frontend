import React, { useContext } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import request from './utils/request';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Profile from './pages/User/Profile';
import ConfirmAccount from './pages/AccountConfirm';
import CreateEvent from './pages/Organizer/CreateEvent';
import { UserContext } from './context/UserContext';
import EventDetail from './pages/EventDetail';
import Events from './pages/Organizer/Events';
import User from './pages/Admin/User';
import EventAdmin from './pages/Admin/EventAdmin';
import ForumAdmin from './pages/Admin/ForumAdmin';
import Forum from './pages/Home/Forum';
import RateEvent from './pages/Home/RateEvent';

function App() {
  const { token, user } = useContext(UserContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/confirmaccount/:email" element={<ConfirmAccount />} />
          <Route path="/event-detail" element={<EventDetail />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/rate/:ratingid" element={<RateEvent />} />
          <Route path="/organizer/create-event" element={<CreateEvent />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/events" element={<EventAdmin />} />
          <Route path="/admin/forum" element={<ForumAdmin />} />
          <Route path="/confirmaccount/:email" element={<ConfirmAccount />} />
          <Route path="/event-detail/:encodedId" element={<EventDetail />} />
          <Route path="/organizer/create-event" element={<CreateEvent />} />
          <Route path="/organizer/events" element={<Events />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
