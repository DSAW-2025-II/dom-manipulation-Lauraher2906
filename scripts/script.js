const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('new-task');
const descInput = document.getElementById('task-desc');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-button');

function addTask() {
    const taskTitle = taskInput.value.trim();
    const taskDesc = descInput.value.trim();
    if (taskTitle === "") return;

    const li = document.createElement('li');
    li.classList.add('task-item');
    
    const complete = document.createElement("input");
    complete.type = "checkbox";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = taskTitle;
    titleSpan.classList.add("task-text");

    // Add description span
    const descSpan = document.createElement("span");
    descSpan.textContent = taskDesc;
    descSpan.classList.add("task-desc");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");
    
    complete.addEventListener("change", () => {
        li.classList.toggle("completed");
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(complete);
    li.appendChild(titleSpan);
    if (taskDesc !== "") li.appendChild(descSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    descInput.value = "";
    taskInput.focus();
}

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");
        const tasks = document.querySelectorAll(".task-item");

        tasks.forEach((task) => {
            switch (filter) {
                case "all":
                    task.style.display = "flex";
                    break;
                case "pending":
                    task.style.display = task.classList.contains("completed")
                        ? "none"
                        : "flex";
                    break;
                case "completed":
                    task.style.display = task.classList.contains("completed")
                        ? "flex"
                        : "none";
                    break;
            }
        });
    });
});

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
descInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});