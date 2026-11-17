// TypeTasks — Part 1: typed data model
// Returns a new task list. IDs are generated as one greater than the
// current maximum, so they remain unique even if some tasks were deleted.
export function addTask(tasks, title) {
    const nextId = tasks.length === 0 ? 1 : Math.max(...tasks.map((task) => task.id)) + 1;
    const newTask = {
        id: nextId,
        title,
        status: "todo",
    };
    return [...tasks, newTask];
}
// Returns a new array and does not mutate the original tasks.
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
// Original extra operation: remove the task with the given ID.
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
// Another useful typed operation: count tasks in a particular status.
export function countByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status).length;
}
// Advances a task through todo -> in-progress -> done.
// Tasks already marked done stay done.
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id)
            return task;
        const nextStatus = task.status === "todo"
            ? "in-progress"
            : task.status === "in-progress"
                ? "done"
                : "done";
        return { ...task, status: nextStatus };
    });
}
