// components/TaskModal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  PlusCircle,
  X,
  Save,
  Calendar,
  AlignLeft,
  Flag,
  CheckCircle
} from 'lucide-react';
import {
  baseControlClasses,
  priorityStyles,
  DEFAULT_TASK
} from '../assets/dummy';

const API_BASE = 'http://localhost:4000/api/tasks';

/**
 * Task Modal Component for Smart Task
 * Handles both creation and editing of a task.
 */
const TaskModal = ({ isOpen, onClose, taskToEdit, onSave, onLogout }) => {
  const [taskData, setTaskData] = useState(DEFAULT_TASK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  // Initialize form data when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (taskToEdit) {
      const completedStatus =
        taskToEdit.completed === 'Yes' || taskToEdit.completed === true
          ? 'Yes'
          : 'No';

      setTaskData({
        ...DEFAULT_TASK,
        id: taskToEdit._id,
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'Low',
        dueDate: taskToEdit.dueDate?.split('T')[0] || '',
        completed: completedStatus
      });
    } else {
      setTaskData(DEFAULT_TASK);
    }

    setError(null);
  }, [isOpen, taskToEdit]);

  // Handle form input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Get request headers (header-based token)
  const getHeaders = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  }, []);

  // Submit form handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (taskData.dueDate < today) {
        setError('Due date cannot be in the past.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const isEdit = Boolean(taskData.id);
        const url = isEdit
          ? `${API_BASE}/${taskData.id}/gp`
          : `${API_BASE}/gp`;

        const response = await fetch(url, {
          method: isEdit ? 'PUT' : 'POST',
          headers: getHeaders(),
          body: JSON.stringify(taskData)
        });

        if (!response.ok) {
          if (response.status === 401) return onLogout?.();
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to save task.');
        }

        const savedTask = await response.json();
        onSave?.(savedTask);
        onClose();
      } catch (err) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    },
    [taskData, today, getHeaders, onLogout, onSave, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-pink-500/30 rounded-2xl shadow-2xl shadow-pink-500/20 max-w-md w-full p-6 relative animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {taskData.id ? (
              <Save className="text-pink-400 w-5 h-5" />
            ) : (
              <PlusCircle className="text-pink-400 w-5 h-5" />
            )}
            {taskData.id ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-pink-500/20 rounded-xl text-gray-400 hover:text-pink-300 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error */}
          {error && (
            <div className="text-sm text-rose-300 bg-rose-500/10 p-3 rounded-xl border border-rose-500/30 backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-1">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={taskData.title}
              onChange={handleChange}
              className={`${baseControlClasses} w-full`}
              placeholder="Enter your task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-bold text-gray-300 mb-1 flex items-center gap-1">
              <AlignLeft className="w-4 h-4 text-pink-400" /> Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={taskData.description}
              onChange={handleChange}
              className={baseControlClasses}
              placeholder="Add details about your task..."
            />
          </div>

          {/* Priority & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-gray-300 mb-1 flex items-center gap-1">
                <Flag className="w-4 h-4 text-pink-400" /> Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className={`${baseControlClasses} ${priorityStyles[taskData.priority]}`}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-300 mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-pink-400" /> Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                required
                min={today}
                value={taskData.dueDate}
                onChange={handleChange}
                className={baseControlClasses}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-pink-400" /> Status
            </label>
            <div className="flex gap-4">
              {[
                { value: 'Yes', label: 'Completed' },
                { value: 'No', label: 'In Progress' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="completed"
                    value={value}
                    checked={taskData.completed === value}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 focus:ring-2 border-pink-500/30 bg-slate-800"
                  />
                  <span className="ml-2 text-sm text-gray-300 font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 hover:shadow-lg hover:shadow-pink-500/50 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            {loading ? (
              'Saving...'
            ) : taskData.id ? (
              <>
                <Save className="w-4 h-4" /> Update Task
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" /> Create Task
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;