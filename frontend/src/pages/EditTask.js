import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    priority: "High",
    status: "pending",
    dueDate: "",
  });

  //   console.log(formData);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const taskId = params.taskId;

      const res = await fetch(`/api/task/getTaskById/${taskId}`);
      const data = await res.json();
      if (data.success === false) {
        // console.log(data.message);
        return;
      }
      setFormData({
        ...data,
        dueDate: new Date(data.dueDate).toISOString().split("T")[0],
      });
    };
    fetchTask();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/task/updateTask/${params.taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      //   console.log(data);

      if (data.success === false) {
        // console.log(data.message);
        setError(data.message);
        navigate("/profile");
      }

      navigate("/profile");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="signup-form-heading">Edit Task</h2>

      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              required
              id="taskName"
              onChange={handleChange}
              value={formData.taskName}
            />
          </div>

          <div className="form-group">
            <label>Task Description</label>
            <textarea
              type="text"
              required
              id="description"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Task Priority</label>
            <select
              required
              id="priority"
              onChange={handleChange}
              value={formData.priority}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
              <option>Urgent</option>
            </select>
          </div>

          <div className="form-group">
            <label>Task Status</label>
            <select
              required
              id="status"
              onChange={handleChange}
              value={formData.status}
            >
              <option>pending</option>
              <option>in-progress</option>
              <option>completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              required
              id="dueDate"
              onChange={handleChange}
              value={formData.dueDate}
            />
          </div>

          <div className="form-group">
            <label>Assigned To</label>
            <select>
              <option>Asha</option>
              <option>Akhil</option>
              <option>Anu</option>
            </select>
          </div>

          <button type="submit">UPDATE TASK</button>

          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default EditTask;
