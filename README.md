# 📋 Dev Board - Interactive Kanban Workspace

A sleek, fully interactive Kanban board built with React and Vite, designed to help developers organize and track their workflows. This project showcases advanced React state management, seamless local storage persistence, and native HTML5 Drag-and-Drop capabilities.

---

## ✨ Features

* **Native Drag-and-Drop:** Seamlessly drag task cards across workflow columns using the native HTML5 Drag and Drop API.
* **Inline Task Editing:** Create new tasks, update titles and descriptions on the fly, or delete tasks directly from the board.
* **Priority Management & Filtering:** Tag tasks as *High, Medium, or Low* priority and instantly filter the board view via the toolbar.
* **Persistent Workspace:** State is saved automatically to `localStorage`, ensuring your board stays exactly as you left it even after a page refresh.
* **Board Control Actions:** Clear the entire board for a fresh start or reset to a default set of tasks with a single click.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 (Vite)
* **Drag-and-Drop:** Native HTML5 Drag and Drop API
* **Styling:** Custom CSS Flexbox & Grid layout
* **State & Persistence:** React Hooks (`useState`, `useEffect`) & Web Storage API (`localStorage`)

---

## 🔗 Live Demo

[View the live project](https://dev-kanban-board.vercel.app/)

---

## 🚀 Getting Started

```bash
git clone https://github.com/EricCR85/dev-kanban-board.git
cd dev-kanban-board
npm install
npm run dev
```