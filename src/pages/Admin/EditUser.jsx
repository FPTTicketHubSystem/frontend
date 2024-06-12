import React from 'react';
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();

    return (
        <div>
            <h2>Edit User</h2>
            <p>Editing user with ID: {id}</p>
            {/* Form chỉnh sửa người dùng sẽ ở đây */}
        </div>
    );
};

export default EditUser;
