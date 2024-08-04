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
import Eventapproval from './pages/Admin/Eventapproval';
import Dashboard from './pages/Admin/Dashboard';
import CategoryList from './pages/Admin/ManageCategory';
import MyTicket from './pages/User/MyTicket';
import ChooseTicket from './pages/Payment/ChooseTicket';
import TicketDetail from './pages/User/TicketDetail';
import Payment from './pages/Payment/Payment';
import EditEvent from './pages/Organizer/EditEvent';
import NewsManage from './pages/Organizer/NewsManage';
import CheckinTicket from './pages/Staff/CheckinTicket';
import ManageStaff from './pages/Organizer/ManageStaff';
import Search from './pages/Home/Search';
import ManageNews from './pages/Admin/ManageNews';
import NewsDetail from './pages/Admin/NewsDetail';
import PaymentSuccess from './pages/Payment/PaymentSuccess';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-category" element={< CategoryList/>} />
          <Route path="/organizer/events" element={<Events/>}/>
          <Route path="/seclectTicket" element={<ChooseTicket/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/myticket" element={<MyTicket/>}/>
          <Route path="/myticket/detail/:id" element={<TicketDetail/>}/>
          <Route path="/organizer/edit-event/:encodedId" element={<EditEvent />} />
          <Route path="/organizer/manage-news" element={<NewsManage />} />
          <Route path="/organizer/manage-staff" element={<ManageStaff />} />
          <Route path="/staff/checkin" element={<CheckinTicket />} />
          <Route path="/search" element={<Search/>}/>
          <Route path="/manage-news" element={<ManageNews />} />
          <Route path="/news-detail/:newsId" element={<NewsDetail />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
