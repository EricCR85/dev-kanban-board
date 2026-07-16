import React from "react";
import TaskCard from "./TaskCard";

const KanbanColumn = ({
  column,
  columnTasks,
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
  editingTaskId,
  handleDragComplete,
}) => {

  const handleDragOver = (e) => {
    e.preventDefault();
  }

const handleDrop = (e) => {
  e.preventDefault();
  const taskId = Number(e.dataTransfer.getData("text/plain"));
  if (taskId) {
    handleDragComplete(taskId, column.id)
  }
}

  return (
    <div key={column.id} className="kanban-column"
    onDragOver={handleDragOver}
    onDrop={handleDrop}>
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
            <TaskCard
              key={task.id}
              task={task}
              columnIndex={columnIndex}
              COLUMNS={COLUMNS}
              startEditing={startEditing}
              deleteTask={deleteTask}
              moveTask={moveTask}
              isEditing={isEditing}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDesc={editDesc}
              setEditDesc={setEditDesc}
              saveEditedTask={saveEditedTask}
              cancelEditing={cancelEditing}
            />
          );
        })}
        {columnTasks.length === 0 && (
          <div className="empty-column-state">No tasks here</div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
