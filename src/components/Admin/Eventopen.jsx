import React from 'react'

const Eventopen = () => {
  return (
    <tr>
														<td>1</td>
														<td>
															Sự kiện 1
														</td>
														<td>FPT Clubs</td>
														<td>Sự Kiện</td>
														<td>Sự kiện này là về một sự kiện...</td>
														<td>
																FPT University
														</td>
														<td>100</td>
														<td>
															<span class="badge bg-info">Đợi</span>
														</td>
														<td>20/06/2024-21/6/2024</td>
														<td>
															<button class="btn btn-outline-primary btn-sm" data-bs-toggle="tooltip"
																data-bs-placement="top" data-bs-custom-class="custom-tooltip-primary"
																data-bs-title="Edit">
																<i class="icon-check_circle_outline"></i>
															</button>
															<button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
																data-bs-placement="top" data-bs-custom-class="custom-tooltip-danger"
																data-bs-title="Delete">
																<i class="icon-slash"></i>
															</button>
														</td>
													</tr>
  )
}

export default Eventopen