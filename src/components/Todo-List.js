import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://todolist-django-2nb4.onrender.com/api/tasks";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");

  // Obtener tareas desde la API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  // Agregar una nueva tarea
  const addTask = async () => {
    if (newTaskName.trim() === "" || newTaskDescription.trim() === "") return;
    try {
      const response = await axios.post(API_URL, {
        name: newTaskName,
        description: newTaskDescription,
        priority: newTaskPriority,
        completed: false,
      });
      setTasks([...tasks, response.data]);
      setNewTaskName("");
      setNewTaskDescription("");
      setNewTaskPriority("Medium");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Nombre de la tarea..."
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción..."
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
        <option value="High">Alta</option>
        <option value="Medium">Media</option>
        <option value="Low">Baja</option>
      </select>
      <button onClick={addTask}>Agregar</button>
  
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-info">
              <span className="task-name">{task.name}</span>
              <br />
              <span className="task-description">{task.description}</span>
            </div>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default TodoList;
