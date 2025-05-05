import React, { useState, useEffect } from "react";
import {
  getAllTasks,
  addTaskToAPI,
  updateTaskInAPI,
  deleteTaskFromAPI,
} from "../services/taskService";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    const newTask = { title: newTaskTitle, completed: false };
    try {
      const created = await addTaskToAPI(newTask);
      setTasks((prev) => [...prev, created]);
      setNewTaskTitle("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updated = await updateTaskInAPI(task._id, {
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updated : t))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskFromAPI(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="homepage">
      <h1>My Tasks</h1>

      <div className="add-task">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
