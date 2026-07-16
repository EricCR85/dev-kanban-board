import React from "react";

const TaskCard = ({
  task,
  columnIndex,
  COLUMNS,
  startEditing,
  deleteTask,
  moveTask,
  isEditing,
  editTitle,
  setEditTitle,
  editDesc,
  setEditDesc,
  saveEditedTask,
  cancelEditing,
}) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plan", task.id);
  };
  return (
    <div
      key={task.id}
      className={"task-card priority-${task.priority.toLowerCase()}"}
      draggable
      onDragStart={handleDragStart}
    >
      {isEditing ? (
        <div className="edit-mode-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
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
            <button className="cancel-btn" onClick={cancelEditing}>
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
};

export default TaskCard;
