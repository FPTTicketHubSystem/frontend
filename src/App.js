import React, {useContext} from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import request from './Utils/request';
import Login from './Component/Authentication/Login';
import { UserContext } from './Context/UserContext';

function App() {
  const { token, user } = useContext(UserContext);
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
