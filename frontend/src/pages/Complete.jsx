import React from "react";
import CompletedTasks from "../components/CompletedTasks";

/**
 * Page: Completed Tasks
 * Description:
 * Displays all tasks that have been marked as completed.
 * Uses the CompletedTasks component for listing.
 */
const Complete = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        Completed Tasks
      </h1>

      {/* Component to display all completed tasks */}
      <CompletedTasks />
    </div>
  );
};

export default Complete;