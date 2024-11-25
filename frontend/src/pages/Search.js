import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FaCheck, FaRegEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import Task from "../components/Task";

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    status: "pending",
    priority: "high",
    sort: "created_at",
    dueDate: "",
    order: "desc",
  });

  console.log(sidebardata);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  //   console.log(tasks);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const statusFromUrl = urlParams.get("status");
    const priorityFromUrl = urlParams.get("priority");
    const dueDateFromUrl = urlParams.get("dueDate");

    if (
      searchTermFromUrl ||
      statusFromUrl ||
      priorityFromUrl ||
      dueDateFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        status: statusFromUrl || "all",
        priority: priorityFromUrl || "all",
        dueDate: dueDateFromUrl || "",
      });
    }
    const fetchTasks = async () => {
      setLoading(true);

      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/task/searchTasks?${searchQuery}`);
      const data = await res.json();

      //console.log(data);
      setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, [window.location.search]);

  const handleChange = (e) => {
    //Update status

    //if status selected is all

    if (e.target.id === "status") {
      console.log(e.target.value);
      console.log("ghvh");
      setSidebardata({
        ...sidebardata,
        status: e.target.value,
      });
    }
    //Update priority

    if (e.target.id === "priority") {
      //   console.log(e.target.value);
      setSidebardata({
        ...sidebardata,
        priority: e.target.value,
      });
    }
    //Update search term

    if (e.target.id === "searchTerm") {
      //   console.log("searchTerm");
      setSidebardata({
        ...sidebardata,
        searchTerm: e.target.value,
      });
    }

    //Update due date
    if (e.target.id === "dueDate") {
      setSidebardata({
        ...sidebardata,
        dueDate: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent page from reloading
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("status", sidebardata.status);
    urlParams.set("priority", sidebardata.priority);
    urlParams.set("dueDate", sidebardata.dueDate);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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
    <div className="search-page">
      <div className="sidebar">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="search">Search Term</label>
            <input
              type="text"
              id="searchTerm"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={sidebardata.status}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={sidebardata.priority}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={sidebardata.dueDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="task-results">
        <h1 style={{ marginLeft: "50px", marginTop: "0px" }}>Task Results</h1>

        <div className="card-container">
          {!loading && tasks.length === 0 && (
            <p className="text-xl text-slate-700">No listing found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              handleTaskDelete={handleTaskDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
