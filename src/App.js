import React, {useContext} from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import request from './Utils/request';
import Login from './Component/Authentication/Login';
import HomePage from './Component/HomePage/HomePage';
import { UserContext } from './Context/UserContext';

function App() {
  const { token, user } = useContext(UserContext);
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
