import { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Circle, TrendingUp, Zap, Clock } from "lucide-react";
import axios from "axios";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**  Fetch tasks from backend */
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing");

      const { data } = await axios.get("http://localhost:4000/api/tasks/gp", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.tasks)
        ? data.tasks
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setTasks(arr);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "Failed to load tasks.");
      if (err.response?.status === 401) onLogout();
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**  Calculate task statistics */
  const stats = useMemo(() => {
    const completedTasks = tasks.filter(
      (t) =>
        t.completed === true ||
        t.completed === 1 ||
        (typeof t.completed === "string" &&
          t.completed.toLowerCase() === "yes")
    ).length;

    const totalCount = tasks.length;
    const pendingCount = totalCount - completedTasks;
    const completionPercentage = totalCount
      ? Math.round((completedTasks / totalCount) * 100)
      : 0;

    return { totalCount, completedTasks, pendingCount, completionPercentage };
  }, [tasks]);

  /**  Reusable stat card component */
  const StatCard = ({ title, value, icon }) => (
    <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-pink-500/20 shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:border-pink-500/30 group">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 group-hover:from-pink-500/20 group-hover:to-rose-500/20 backdrop-blur-sm">
          {icon}
        </div>
        <div>
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent">
            {value}
          </p>
          <p className="text-xs text-gray-400 font-medium">{title}</p>
        </div>
      </div>
    </div>
  );

  /**  Loading UI */
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 shadow-lg shadow-pink-500/50" />
      </div>
    );

  /**  Error UI */
  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
        <div className="bg-rose-500/10 backdrop-blur-md text-rose-300 p-5 rounded-xl border border-rose-500/30 max-w-md text-center shadow-2xl shadow-rose-500/20">
          <h2 className="font-bold text-lg mb-2">Failed to Load Tasks</h2>
          <p className="text-sm mb-4 text-gray-400">{error}</p>
          <button
            onClick={fetchTasks}
            className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/30"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  /** ✅ Main layout UI */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar user={user} onLogout={onLogout} />
      <Sidebar user={user} tasks={tasks} />

      <main className="ml-0 md:ml-16 lg:ml-64 pt-16 p-4 transition-all duration-300">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Section */}
          <section className="xl:col-span-2 space-y-4">
            <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
          </section>

          {/* Right Section */}
          <aside className="space-y-6">
            {/* Task Stats */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-5 shadow-2xl border border-pink-500/20">
              <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-pink-400" />
                Smart Task Statistics
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard
                  title="Total Tasks"
                  value={stats.totalCount}
                  icon={
                    <Circle className="w-4 h-4 text-pink-400 fill-pink-400/20" />
                  }
                />
                <StatCard
                  title="Completed"
                  value={stats.completedTasks}
                  icon={
                    <Circle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                  }
                />
                <StatCard
                  title="Pending"
                  value={stats.pendingCount}
                  icon={
                    <Circle className="w-4 h-4 text-rose-400 fill-rose-400/20" />
                  }
                />
                <StatCard
                  title="Completion Rate"
                  value={`${stats.completionPercentage}%`}
                  icon={<Zap className="w-4 h-4 text-pink-400" />}
                />
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-gray-300 mb-2">
                  <span className="text-sm font-bold flex items-center gap-1.5">
                    <Circle className="w-3 h-3 text-pink-400 fill-pink-400" />
                    Task Progress
                  </span>
                  <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30">
                    {stats.completedTasks}/{stats.totalCount}
                  </span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 transition-all duration-500 shadow-lg shadow-pink-500/50"
                    style={{ width: `${stats.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-5 shadow-2xl border border-pink-500/20">
              <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-pink-400" />
                Recent Activity
              </h3>

              {tasks.length > 0 ? (
                <div className="space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <div
                      key={task._id || task.id}
                      className="flex items-center justify-between p-3 hover:bg-pink-500/10 rounded-xl transition-all duration-200 border border-pink-500/10 hover:border-pink-500/30 backdrop-blur-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white break-words">
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {task.createdAt
                            ? new Date(task.createdAt).toLocaleDateString()
                            : "No date"}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ml-2 font-semibold ${
                          task.completed
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {task.completed ? "Done" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 flex items-center justify-center backdrop-blur-sm">
                    <Clock className="w-8 h-8 text-pink-400" />
                  </div>
                  <p className="text-sm text-gray-300 font-medium">No recent activity</p>
                  <p className="text-xs text-gray-500">Your tasks will show here</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Layout;