import React from 'react'

const EditButton = ({onEdit}) => {
  return (
        <a  href="/user/edituser">
            <button onClick={onEdit} class="btn btn-outline-primary btn-sm" data-bs-toggle="tooltip"
                data-bs-placement="top" data-bs-custom-class="custom-tooltip-primary"
                data-bs-title="Edit">
                <i class="icon-edit" ></i>
            </button>
         </a>
  )
}

export default EditButton