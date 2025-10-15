import React from "react";
import PendingTasks from "../components/PendingTasks";

/**
 * Smart Task - Pending Page
 * Displays all pending (incomplete) tasks.
 */
const Pending = () => {
  return (
    <main className="p-4 md:p-6">
      <PendingTasks />
    </main>
  );
};

export default Pending;
