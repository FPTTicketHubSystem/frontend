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
import Eventapproval from './pages/Admin/Eventapproval';
import EditEvent from './pages/Organizer/EditEvent';
import NewsManage from './pages/Organizer/NewsManage';
import CheckinTicket from './pages/Staff/CheckinTicket';
import ManageStaff from './pages/Organizer/ManageStaff';

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
          <Route path="/organizer/create-event" element={<CreateEvent />} />
          <Route path="/user" element={<User />} />
          <Route path="/eventapproval" element={<Eventapproval />} />
          <Route path="/confirmaccount/:email" element={<ConfirmAccount />} />
          <Route path="/event-detail/:encodedId" element={<EventDetail />} />
          <Route path="/organizer/create-event" element={<CreateEvent />} />
          <Route path="/organizer/events" element={<Events />} />
          <Route path="/organizer/edit-event/:encodedId" element={<EditEvent />} />
          <Route path="/organizer/manage-news" element={<NewsManage />} />
          <Route path="/organizer/manage-staff" element={<ManageStaff />} />
          <Route path="/staff/checkin" element={<CheckinTicket />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
