import React, { useState, useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Plus,
  Filter,
  Home as HomeIcon,
  Calendar as CalendarIcon,
} from "lucide-react";
import axios from "axios";

import TaskModal from "../components/AddTask";
import TaskItem from "../components/TaskItem";

import {
  WRAPPER,
  HEADER,
  ADD_BUTTON,
  STATS_GRID,
  STAT_CARD,
  ICON_WRAPPER,
  VALUE_CLASS,
  LABEL_CLASS,
  STATS,
  FILTER_OPTIONS,
  FILTER_LABELS,
  EMPTY_STATE,
  FILTER_WRAPPER,
  SELECT_CLASSES,
  TABS_WRAPPER,
  TAB_BASE,
  TAB_ACTIVE,
  TAB_INACTIVE,
} from "../assets/dummy";

// API base URL
const API_BASE = "http://localhost:4000/api/tasks";

/**
 * 🧭 Smart Task - Dashboard
 * Displays all tasks with statistics, filters, and the ability to add or edit tasks.
 */
const Dashboard = () => {
  const { tasks, refreshTasks } = useOutletContext();

  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  /** 📊 Calculate stats */
  const stats = useMemo(() => ({
    total: tasks.length,
    lowPriority: tasks.filter(t => t.priority?.toLowerCase() === "low").length,
    mediumPriority: tasks.filter(t => t.priority?.toLowerCase() === "medium").length,
    highPriority: tasks.filter(t => t.priority?.toLowerCase() === "high").length,
    completed: tasks.filter(
      t =>
        t.completed === true ||
        t.completed === 1 ||
        (typeof t.completed === "string" && t.completed.toLowerCase() === "yes")
    ).length,
  }), [tasks]);

  /** 🔍 Filter tasks */
  const filteredTasks = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      switch (filter) {
        case "today":
          return dueDate.toDateString() === today.toDateString();
        case "week":
          return dueDate >= today && dueDate <= nextWeek;
        case "high":
        case "medium":
        case "low":
          return task.priority?.toLowerCase() === filter;
        default:
          return true;
      }
    });
  }, [tasks, filter]);

  /** 💾 Save or update a task */
  const handleTaskSave = useCallback(
    async (taskData) => {
      try {
        if (taskData.id) {
          await axios.put(`${API_BASE}/${taskData.id}/gp`, taskData);
        }
        refreshTasks();
        setShowModal(false);
        setSelectedTask(null);
      } catch (error) {
        console.error("Error saving task:", error);
      }
    },
    [refreshTasks]
  );

  /** 🖥️ UI Layout */
  return (
    <div className={WRAPPER}>
      {/* Header */}
      <div className={HEADER}>
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text flex items-center gap-2">
            <HomeIcon className="text-pink-400 w-5 h-5 md:w-6 md:h-6 shrink-0" />
            <span className="truncate">Smart Task Dashboard</span>
          </h1>
          <p className="text-sm text-pink-200/80 mt-1 ml-7 truncate font-medium">
            Organize your work and stay productive
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className={ADD_BUTTON}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Stats Section */}
      <div className={STATS_GRID}>
        {STATS.map(
          ({
            key,
            label,
            icon: Icon,
            iconColor,
            borderColor = "border-pink-500/20",
            valueKey,
            textColor,
            gradient,
          }) => (
            <div key={key} className={`${STAT_CARD} ${borderColor}`}>
              <div className="flex items-center gap-3">
                <div className={`${ICON_WRAPPER} ${iconColor}`}>
                  {Icon && <Icon className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <p
                    className={`${VALUE_CLASS} ${
                      gradient
                        ? "bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent"
                        : textColor
                    }`}
                  >
                    {stats[valueKey]}
                  </p>
                  <p className={LABEL_CLASS}>{label}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Filters and Task List */}
      <div className="space-y-6">
        {/* Filter Section */}
        <div className={FILTER_WRAPPER}>
          <div className="flex items-center gap-2 min-w-0">
            <Filter className="w-5 h-5 text-pink-400 shrink-0" />
            <h2 className="text-base md:text-lg font-semibold text-white truncate">
              {FILTER_LABELS[filter]}
            </h2>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={SELECT_CLASSES}
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>

          <div className={TABS_WRAPPER}>
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`${TAB_BASE} ${
                  filter === opt ? TAB_ACTIVE : TAB_INACTIVE
                }`}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className={EMPTY_STATE.wrapper}>
              <div className={EMPTY_STATE.iconWrapper}>
                <CalendarIcon className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No tasks found
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {filter === "all"
                  ? "Create your first task to get started."
                  : "No tasks match this filter."}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className={EMPTY_STATE.btn}
              >
                Add Task
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task._id || task.id}
                task={task}
                onRefresh={refreshTasks}
                showCompleteCheckbox
                onEdit={() => {
                  setSelectedTask(task);
                  setShowModal(true);
                }}
              />
            ))
          )}
        </div>

        {/* Add Task Shortcut (Desktop) */}
        <div
          onClick={() => setShowModal(true)}
          className="hidden md:flex items-center justify-center p-4 border-2 border-dashed border-pink-500/30 rounded-xl hover:border-pink-500/50 bg-pink-500/5 cursor-pointer transition-all duration-300 hover:bg-pink-500/10 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5 text-pink-400 mr-2" />
          <span className="text-gray-300 font-medium">Add Task</span>
        </div>
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={showModal || !!selectedTask}
        onClose={() => {
          setShowModal(false);
          setSelectedTask(null);
        }}
        taskToEdit={selectedTask}
        onSave={handleTaskSave}
      />
    </div>
  );
};

export default Dashboard;