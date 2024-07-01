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
import MyTicket from './pages/User/MyTicket';
import ChooseTicket from './pages/Payment/ChooseTicket';
import TicketDetail from './pages/User/TicketDetail';
import Payment from './pages/Payment/Payment';


import EditEvent from './pages/Organizer/EditEvent';

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
          <Route path="/organizer/events" element={<Events/>}/>
          <Route path="/seclectTicket" element={<ChooseTicket/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/myticket" element={<MyTicket/>}/>
          <Route path="/myticket/detail" element={<TicketDetail/>}/>
          <Route path="/organizer/edit-event/:encodedId" element={<EditEvent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
