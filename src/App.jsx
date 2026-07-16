import { useState, useEffect } from "react";
import KanbanColumn from "./components/KanbanColumn";
import Toolbar from "./components/Toolbar";
import TaskForm from "./components/TaskForm";

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
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      return parsed
    }
    return DEFAULT_TASKS;
  });

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
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

  const handleDragComplete = (taskId, targetColumnId) => {
    setTasks((prevTasks) => 
    prevTasks.map((task) =>
    task.id === taskId ? { ...task, columnId: targetColumnId } : task
  ))
  }

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
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditTitle("");
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
      </header>

      <Toolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        handleResetDefaults={handleResetDefaults}
        handleClearBoard={handleClearBoard}
      />

      <TaskForm
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDesc={taskDesc}
        setTaskDesc={setTaskDesc}
        taskPriority={taskPriority}
        setTaskPriority={setTaskPriority}
        handleAddTask={handleAddTask}
      />

      <main className="kanban-board">
        {COLUMNS.map((column, columnIndex) => {
          const columnTasks = tasks
            .filter((task) => task.columnId === column.id)
            .filter((task) => {
              const matchesSearch =
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              return matchesSearch;
            })
            .filter((task) => {
              if (filterPriority === "All") return true;
              return task.priority === filterPriority;
            });
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              columnTasks={columnTasks}
              columnIndex={columnIndex}
              COLUMNS={COLUMNS}
              startEditing={startEditing}
              deleteTask={deleteTask}
              moveTask={moveTask}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDesc={editDesc}
              setEditDesc={setEditDesc}
              saveEditedTask={saveEditedTask}
              cancelEditing={cancelEditing}
              editingTaskId={editingTaskId}
              handleDragComplete={handleDragComplete}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
