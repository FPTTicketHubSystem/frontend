import React, {useContext} from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import request from './utils/request';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { UserContext } from './context/UserContext';
import './App.css';

function App() {
  const { token, user } = useContext(UserContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
