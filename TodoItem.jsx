import { useState } from "react";

export function TodoItem({ 
    completed, 
    id, 
    title, 
    priority, 
    toggleTodos, 
    deleteTodos, 
    priorityMode, 
    setDropdownOpen, 
    dropdownOpen, 
    handlePriorityChange, 
    manualOrderMode, 
    setDraggedItem, 
    handleDrop 
}) {
    return (
        <li
            className="checkBox"
            draggable={manualOrderMode}
            onDragStart={() => setDraggedItem(id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(id)}
        >
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => toggleTodos(id, e.target.checked)}
                />
                {title}
            </label>

            {priorityMode && (
                <div className="prioritySelector">
                    <button
                        className="priority-btn"
                        onClick={() => setDropdownOpen(dropdownOpen === id ? null : id)}
                    >
                        {priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : "Set Priority"}
                    </button>
                    {dropdownOpen === id && (
                        <ul className="priorityDropdown">
                            <li onClick={() => handlePriorityChange(id, null)}>Set Priority</li>
                            <li onClick={() => handlePriorityChange(id, "low")}>Low</li>
                            <li onClick={() => handlePriorityChange(id, "medium")}>Medium</li>
                            <li onClick={() => handlePriorityChange(id, "high")}>High</li>
                        </ul>
                    )}
                </div>
            )}

            <button onClick={() => deleteTodos(id)} className="btn btn-danger">
                Delete
            </button>
        </li>
    );
}
