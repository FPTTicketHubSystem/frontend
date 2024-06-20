import React from 'react';

const EditButton = ({ onEdit }) => {
  return (
    <a>
      <button 
        onClick={onEdit} 
        className="btn btn-outline-primary btn-sm" 
        data-bs-toggle="tooltip"
        data-bs-placement="top" 
        data-bs-custom-class="custom-tooltip-primary"
        data-bs-title="Edit"
      >
        <i className="icon-edit"></i>
      </button>
    </a>
  );
}

export default EditButton;