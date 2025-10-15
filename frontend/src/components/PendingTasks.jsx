import React, { useState, useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Filter,
  SortDesc,
  SortAsc,
  Award,
  Plus,
  ListChecks,
  Clock,
} from "lucide-react";
import TaskItem from "../components/TaskItem";
import TaskModal from "../components/AddTask";
import { layoutClasses } from "../assets/dummy";

const API_BASE = "http://localhost:4000/api/tasks";

const PendingTasks = () => {
  const { tasks = [], refreshTasks } = useOutletContext();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Get headers for API calls (header-based for now)
  const getHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token found");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Delete a task
  const handleDelete = useCallback(
    async (id) => {
      await fetch(`${API_BASE}/${id}/gp`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      refreshTasks();
    },
    [refreshTasks]
  );

  // Toggle completion
  const handleToggleComplete = useCallback(
    async (id, completed) => {
      await fetch(`${API_BASE}/${id}/gp`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ completed: completed ? "Yes" : "No" }),
      });
      refreshTasks();
    },
    [refreshTasks]
  );

  // Sort and filter pending tasks
  const sortedPendingTasks = useMemo(() => {
    const filtered = tasks.filter(
      (task) =>
        !task.completed ||
        (typeof task.completed === "string" &&
          task.completed.toLowerCase() === "no")
    );

    return filtered.sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (
        priorityOrder[b.priority.toLowerCase()] -
        priorityOrder[a.priority.toLowerCase()]
      );
    });
  }, [tasks, sortBy]);

  return (
    <div className={layoutClasses.container}>
      {/* Header */}
      <header className={layoutClasses.headerWrapper}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ListChecks className="text-purple-500" />
            Pending Tasks
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-7">
            {sortedPendingTasks.length}{" "}
            {sortedPendingTasks.length === 1 ? "task" : "tasks"} awaiting your
            attention
          </p>
        </div>

        {/* Sort selector */}
        <div className={layoutClasses.sortBox}>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Filter className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={layoutClasses.select}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
          </select>
        </div>
      </header>

      {/* Add Task */}
      <div
        className={`${layoutClasses.addBox} hover:bg-purple-50 transition-colors`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center justify-center gap-3 text-gray-600 hover:text-purple-600">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all">
            <Plus size={18} className="text-purple-500" />
          </div>
          <span className="font-medium">Add New Task</span>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-4">
        {sortedPendingTasks.length === 0 ? (
          <div className={layoutClasses.emptyState}>
            <div className="max-w-xs mx-auto py-6 text-center">
              <div className={layoutClasses.emptyIconBg}>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                All caught up!
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                No pending tasks — great work!
              </p>
              <button
                onClick={() => setShowModal(true)}
                className={layoutClasses.emptyBtn}
              >
                Create New Task
              </button>
            </div>
          </div>
        ) : (
          sortedPendingTasks.map((task) => (
            <TaskItem
              key={task._id || task.id}
              task={task}
              showCompleteCheckbox
              onDelete={() => handleDelete(task._id || task.id)}
              onToggleComplete={() =>
                handleToggleComplete(task._id || task.id, !task.completed)
              }
              onEdit={() => {
                setSelectedTask(task);
                setShowModal(true);
              }}
              onRefresh={refreshTasks}
            />
          ))
        )}
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={!!selectedTask || showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTask(null);
          refreshTasks();
        }}
        taskToEdit={selectedTask}
      />
    </div>
  );
};

export default PendingTasks;
