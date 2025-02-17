import { TodoItem } from "./TodoItem";

export function TodoList({
  todos,
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
  if (!todos || todos.length === 0) {
    return <div>No Tasks</div>;
  }

  return (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem 
          id={todo.id} 
          completed={todo.completed} 
          title={todo.title} 
          priority={todo.priority} 
          key={todo.id} 
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
      ))}
    </ul>
  );
}

