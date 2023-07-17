import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const category = ({ list, index }) => {
  const deleteCategory = (event) => {
    const value = event.target.getAttribute("data-value");
    console.log(value);
    axios
      .delete(`http://localhost:5000/api/categories/${value}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <tr>
      <td>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" />
        </div>
      </td>
      <td>{index + 1}</td>
      <td>
        <b>{list.categoryName}</b>
      </td>
      <td>{list.categoryDescription}</td>
      <td className="text-end">
        <div className="dropdown">
          <Link to="#" data-bs-toggle="dropdown" className="btn btn-light">
            <i className="fas fa-ellipsis-h"></i>
          </Link>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="#">
              Edit info
            </Link>
            <Link
              className="dropdown-item text-danger"
              onClick={deleteCategory}
              data-value={list._id}
              to="#"
            >
              Delete
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
};
export default category;
