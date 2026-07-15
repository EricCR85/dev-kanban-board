import { useState, useEffect } from "react";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "#3b82f6" },
  { id: "in-progress", title: "In Progress", color: "#a855f7" },
  { id: "review", title: "In Review", color: "#f59e0b" },
  { id: "done", title: "Done", color: "#10b981" },
];

const DEFAULT_TASKS = [
  {
    id: 1,
    title: "Design Landing Page",
    description: "Create wireframes and high-fidelity mockups in Figma.",
    priority: "High",
    columnId: "todo",
  },
  {
    id: 2,
    title: "Set up Express Server",
    description: "Initialize project and configure basic API routes.",
    priority: "Medium",
    columnId: "in-progress",
  },
  {
    id: 3,
    title: "Write Unit Tests",
    description: "Achieve 80% coverage on authentication controllers.",
    priority: "Low",
    columnId: "review",
  },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    return savedTasks ? JSON.parse(savedTasks) : DEFAULT_TASKS;
  });

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitie] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const moveTask = (taskId, direction) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          const currentColumnIndex = COLUMNS.findIndex(
            (col) => col.id === task.columnId,
          );
          const newColumnIndex = currentColumnIndex + direction;

          if (newColumnIndex >= 0 && newColumnIndex < COLUMNS.length) {
            return {
              ...task,
              columnId: COLUMNS[newColumnIndex].id,
            };
          }
        }
        return task;
      });
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleClearBoard = () => {
    if (window.confirm("Are you sure you want to delete ALL tasks?")) {
      setTasks([]);
    }
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        "Reset board to default tasks? Your current tasks will be replaced.",
      )
    ) {
      setTasks(DEFAULT_TASKS);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDesc,
      priority: taskPriority,
      columnId: "todo",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setTaskTitle("");
    setTaskDesc("");
    setTaskPriority("Medium");
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditTitie(task.title);
    setEditDesc(task.description);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditTitie("");
    setEditDesc("");
  };

  const saveEditedTask = (taskId) => {
    if (!editTitle.trim()) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title: editTitle,
            description: editDesc,
          };
        }
        return task;
      }),
    );
    setEditingTaskId(null);
  };

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <h1>Dev Board</h1>
        <p>Manage your sprint tasks and workflow</p>

        <div className="board-controls">
          <button type="button" onClick={handleResetDefaults}>
            Reset Default Tasks
          </button>
          <button
            type="button"
            onClick={handleClearBoard}
            style={{ marginLeft: "10px" }}
          >
            Clear Entire Board
          </button>
        </div>
      </header>

      <section className="toolbar-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-priority">
          <label htmlFor="priority-filter">Priority:</label>
          <select
            id="priority-filter"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </section>

      <section className="add-task-section">
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task Title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Task Description..."
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)} // Fixed handler
          />
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

      <main className="kanban-board">
        {COLUMNS.map((column, columnIndex) => {
          const columnTasks = tasks
            .filter((task) => task.columnId === column.id)
            .filter((task) => {
              const matchesSearch =
                task.title
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()) ||
                task.description
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase());
              return matchesSearch;
            })
            .filter((task) => {
              if (filterPriority === "All") return true;
              return task.priority === filterPriority;
            });

          return (
            <div key={column.id} className="kanban-column">
              <div
                className="column-header"
                style={{ borderTop: `4px solid ${column.color}` }}
              >
                <h3>{column.title}</h3>
                <span className="task-count">{columnTasks.length}</span>
              </div>

              <div className="column-body">
                {columnTasks.map((task) => {
                  const isEditing = editingTaskId === task.id;

                  return (
                    <div key={task.id} className="task-card">
                      {isEditing ? (
                        <div className="edit-mode-form">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitie(e.target.value)}
                            className="edit-input-title"
                            placeholder="Edit Title..."
                            required
                          />
                          <textarea
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="edit-textarea-desc"
                            placeholder="Edit Description..."
                          />
                          <div className="edit-mode-actions">
                            <button
                              className="save-btn"
                              onClick={() => saveEditedTask(task.id)}
                            >
                              Save
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={cancelEditing}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="task-card-header">
                            <span
                              className={`priority-badge priority-${task.priority.toLowerCase()}`}
                            >
                              {task.priority}
                            </span>

                            <div className="card-top-controls">
                              <button
                                className="edit-btn"
                                onClick={() => startEditing(task)}
                                title="Edit task"
                              >
                                Edit
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() => deleteTask(task.id)}
                                title="Delete Task"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          <h4>{task.title}</h4>
                          <p>{task.description}</p>

                          <div className="task-actions">
                            {columnIndex > 0 && (
                              <button
                                className="move-btn back-btn"
                                onClick={() => moveTask(task.id, -1)}
                              >
                                ◀ Back
                              </button>
                            )}

                            {columnIndex < COLUMNS.length - 1 && (
                              <button
                                className="move-btn forward-btn"
                                onClick={() => moveTask(task.id, 1)}
                              >
                                Next ▶
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
                {columnTasks.length === 0 && (
                  <div className="empty-column-state">No tasks here</div>
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
