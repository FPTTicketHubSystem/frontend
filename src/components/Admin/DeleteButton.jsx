import React from 'react'

const DeleteButton = () => {
  return (
    <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
        data-bs-placement="top" data-bs-custom-class="custom-tooltip-danger"
        data-bs-title="Delete">
        <i class="icon-trash"></i>
    </button>
  )
}

export default DeleteButton