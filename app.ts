import {
  addTask,
  advanceTask,
  filterByStatus,
  type Task,
  type TaskStatus,
} from "./model.js";

type TaskFilter = "all" | TaskStatus;

let tasks: Task[] = [];
let activeFilter: TaskFilter = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const addButton = document.getElementById("add-task") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
const taskCount = document.getElementById("task-count") as HTMLSpanElement;
const emptyState = document.getElementById("empty-state") as HTMLParagraphElement;

function visibleTasks(): Task[] {
  return activeFilter === "all"
    ? tasks
    : filterByStatus(tasks, activeFilter);
}

function renderTasks(): void {
  const shownTasks = visibleTasks();
  taskList.replaceChildren();

  for (const task of shownTasks) {
    const item = document.createElement("li");
    item.className = "task-card";

    const details = document.createElement("div");
    details.className = "task-details";

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = `status-badge status-${task.status}`;
    badge.textContent = task.status;

    details.append(title, badge);

    const advanceButton = document.createElement("button");
    advanceButton.className = "advance-button";
    advanceButton.type = "button";
    advanceButton.textContent =
      task.status === "done" ? "Completed" : "Advance";
    advanceButton.disabled = task.status === "done";
    advanceButton.setAttribute("aria-label", `Advance ${task.title}`);
    advanceButton.addEventListener("click", () => {
      tasks = advanceTask(tasks, task.id);
      renderTasks();
    });

    item.append(details, advanceButton);
    taskList.append(item);
  }

  taskCount.textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;
  emptyState.hidden = shownTasks.length !== 0;
  emptyState.textContent =
    tasks.length === 0
      ? "Nothing here yet. Add your first task above."
      : "No tasks match this filter.";

  for (const button of filterButtons) {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
}

function createTask(): void {
  const title = titleInput.value.trim();
  if (title.length === 0) {
    titleInput.focus();
    return;
  }

  tasks = addTask(tasks, title);
  titleInput.value = "";
  activeFilter = "all";
  renderTasks();
  titleInput.focus();
}

addButton.addEventListener("click", createTask);

titleInput.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") createTask();
});

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const requestedFilter = button.dataset.filter;
    if (
      requestedFilter === "all" ||
      requestedFilter === "todo" ||
      requestedFilter === "in-progress" ||
      requestedFilter === "done"
    ) {
      activeFilter = requestedFilter;
      renderTasks();
    }
  });
}

renderTasks();
