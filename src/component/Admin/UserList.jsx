import React, { useState } from 'react';
import LockButton from './LockButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import Duc from "../../assets/images/user/Duc.jpg";


const UserList = () => {
  const [isLocked, setIsLocked] = useState(false);

  const handleLockChange = (newLockStatus) => {
    setIsLocked(newLockStatus);
  };

  return (
    <tr>
      <td>1</td>
      <th>
        <input className="form-check-input" type="checkbox" value="option1" />
      </th>
      <td>
        <img src={Duc} className="me-2 img-3x rounded-3" alt="avt" />
        Pham Phu Duc
      </td>
      <td className='email'>duc@fpt.edu.vn</td>
      <td className='password'>••••••</td>
      <td>
        <div className="d-flex align-items-center">
          <i className={`icon-circle1 me-2 fs-5 ${isLocked ? "text-light" : "text-success"}`}></i>
          {isLocked ? "Offline" : "Online"}
        </div>
      </td>
      <td>0900009900</td>
      <td>Nam</td>
      <td>0</td>
      <td>
        <EditButton />
        <DeleteButton />
        <LockButton isLocked={isLocked} onLockChange={handleLockChange} />
      </td>
    </tr>
  );
};

export default UserList;
