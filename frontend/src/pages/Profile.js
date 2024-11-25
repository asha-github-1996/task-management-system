import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Task from "../components/Task.js";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showTasksError, setShowTasksError] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("useEffect");
    const getTasks = async () => {
      try {
        const res = await fetch("/api/task/getAllTasks");
        const data = await res.json();
        // console.log(data);

        if (data.success === false) {
          setShowTasksError(data.message);
          return;
        }
        setTasks(data);
      } catch (error) {
        setShowTasksError(error.message);
      }
    };
    getTasks();
  }, []);

  const handleTaskDelete = async (taskId) => {
    try {
      const res = await fetch(`/api/task//deleteTask/${taskId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        // console.log(data.message);
        return;
      }
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome {currentUser.username} </h1>
      {/* <Task /> */}
      <div className="card-container">
        {!loading && tasks.length === 0 && (
          <p className="text-xl text-slate-700">No tasks found</p>
        )}
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            handleTaskDelete={handleTaskDelete}
          />
        ))}
      </div>
    </>
  );
};

export default Profile;
