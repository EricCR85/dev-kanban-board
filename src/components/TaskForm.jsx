
const TaskForm = ({
  taskTitle,
  setTaskTitle,
  taskDesc,
  setTaskDesc,
  taskPriority,
  setTaskPriority,
  handleAddTask,
}) => {
  return (
    <section className="add-task-section">
      <form onSubmit={handleAddTask}>
        {/* Task Title Input */}
        <input
          type="text"
          placeholder="Task Title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />

        {/* Task Description Input */}
        <input
          type="text"
          placeholder="Task Description..."
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)} // Fixed handler from your image comment
        />

        {/* Task Priority Selector */}
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </section>
  );
};

export default TaskForm;
