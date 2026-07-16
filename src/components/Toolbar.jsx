import React from "react";

const Toolbar = ({
  searchTerm,
  setSearchTerm,
  filterPriority,
  setFilterPriority,
  handleResetDefaults,
  handleClearBoard,
}) => {
  return (
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
        <label htmlFor="priority-filter">Priority: </label>
        <select 
        id="priority-filter"
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Lowl</option>
        </select>
      </div>

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
    </section>
  );
};

export default Toolbar