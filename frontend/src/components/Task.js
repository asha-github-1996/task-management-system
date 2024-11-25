import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Task = ({ task, handleTaskDelete }) => {
  return (
    <div className="card" key={task._id}>
      <div className="card-body">
        <h2 className="card-title">{task.taskName}</h2>
        <p className="card-text">{task.description}</p>
        <p className="card-text due-date">
          Due Date : {new Date(task.dueDate).toDateString()}
        </p>

        <div className="icons-container">
          <p className="card-icons">{task.priority}</p>

          {task.status === "completed" ? (
            <p className="card-icons completed">{"Completed"}</p>
          ) : task.status === "pending" ? (
            <p className="card-icons pending">{"Pending"}</p>
          ) : (
            <p className="card-icons in-progress">{"In-progress"}</p>
          )}

          <Link to={`/edittask/${task._id}`}>
            <FaRegEdit className="editicon" />
          </Link>

          <MdDelete
            className="deleteicon"
            onClick={() => handleTaskDelete(task._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
