// TypeTasks — Part 1: typed data model

export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// Returns a new task list. IDs are generated as one greater than the
// current maximum, so they remain unique even if some tasks were deleted.
export function addTask(tasks: Task[], title: string): Task[] {
  const nextId =
    tasks.length === 0 ? 1 : Math.max(...tasks.map((task) => task.id)) + 1;

  const newTask: Task = {
    id: nextId,
    title,
    status: "todo",
  };

  return [...tasks, newTask];
}

// Returns a new array and does not mutate the original tasks.
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

export function filterByStatus(
  tasks: Task[],
  status: TaskStatus
): Task[] {
  return tasks.filter((task) => task.status === status);
}

// Original extra operation: remove the task with the given ID.
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

// Another useful typed operation: count tasks in a particular status.
export function countByStatus(
  tasks: Task[],
  status: TaskStatus
): number {
  return tasks.filter((task) => task.status === status).length;
}


// Advances a task through todo -> in-progress -> done.
// Tasks already marked done stay done.
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) return task;

    const nextStatus: TaskStatus =
      task.status === "todo"
        ? "in-progress"
        : task.status === "in-progress"
          ? "done"
          : "done";

    return { ...task, status: nextStatus };
  });
}
