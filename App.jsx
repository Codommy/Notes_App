import { useState, useEffect } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    return localValue ? JSON.parse(localValue) : [];
  });

  const [priorityMode, setPriorityMode] = useState(false);
  const [manualOrderMode, setManualOrderMode] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [manualOrder, setManualOrder] = useState(() => {
    const savedOrder = localStorage.getItem("MANUAL_ORDER");
    return savedOrder ? JSON.parse(savedOrder) : [];
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("MANUAL_ORDER", JSON.stringify(manualOrder));
  }, [manualOrder]);

  useEffect(() => {
    setManualOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];

      todos.forEach((todo) => {
        if (!updatedOrder.includes(todo.id)) {
          updatedOrder.push(todo.id);
        }
      });

      return updatedOrder;
    });
  }, [todos]);

  function addTodo(title) {
    if (!title.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
      priority: null,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);

    setManualOrder((currentOrder) => [...currentOrder, newTodo.id]);
  }

  function toggleTodos(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function deleteTodos(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    setManualOrder((currentOrder) => currentOrder.filter((todoId) => todoId !== id));
  }

  function handleDrop(targetId) {
    if (!draggedItem || !manualOrderMode) return;

    setManualOrder((currentOrder) => {
      const fromIndex = currentOrder.indexOf(draggedItem);
      const toIndex = currentOrder.indexOf(targetId);

      if (fromIndex === -1 || toIndex === -1) return currentOrder;

      const updatedOrder = [...currentOrder];
      updatedOrder.splice(fromIndex, 1);
      updatedOrder.splice(toIndex, 0, draggedItem);

      return updatedOrder;
    });

    setDraggedItem(null);
  }

  function handlePriorityChange(id, newPriority) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, priority: newPriority } : todo))
    );
    setDropdownOpen(null);
  }

  function sortedTodos() {
    if (manualOrderMode) {
      return manualOrder.map((id) => todos.find((todo) => todo.id === id)).filter(Boolean);
    }

    const priorityOrder = { high: 1, medium: 2, low: 3, null: 4, "": 4 };
    return [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} priorityMode={!priorityMode} />

      <div className="toggle-container">
        <span>Add</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={priorityMode}
            onChange={() => setPriorityMode(!priorityMode)}
          />
          <span className="slider round"></span>
        </label>
        <span>Priority</span>
      </div>

      {priorityMode && (
        <div className="manual-order-container">
          <button
            onClick={() => setManualOrderMode(!manualOrderMode)}
            className={manualOrderMode ? "active-button" : "inactive-button"}
          >
            {manualOrderMode ? "Manual Order" : "Auto Order"}
          </button>
        </div>
      )}

      <h1 className="header">To-Do List</h1>
      <TodoList 
        todos={sortedTodos()}
        toggleTodos={toggleTodos} 
        deleteTodos={deleteTodos} 
        priorityMode={priorityMode} 
        setDropdownOpen={setDropdownOpen} 
        dropdownOpen={dropdownOpen}
        handlePriorityChange={handlePriorityChange}
        manualOrderMode={manualOrderMode}
        setDraggedItem={setDraggedItem}
        handleDrop={handleDrop}
      />
    </>
  );
}
