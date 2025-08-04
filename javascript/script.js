const input = document.getElementById("todo-input");
const list = document.getElementById("list");
const filters = document.querySelector(".footer");
let todos = [];
let currentFilter = "all";

filters.style.display = "none"; // hide filters initially

document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  
  if (text !== "") {
    todos.push({ text, completed: false });
    input.value = "";
    renderTodos();
    filters.style.display = "flex"; // show filters when a todo is added
  }
});

function renderTodos() {
  list.innerHTML = "";

  const filtered = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "custom-checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      renderTodos();
    });

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;
    if (todo.completed) span.style.textDecoration = "line-through";
   if (todo.completed) span.style.color = "#888";

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.style.border = "none";
    delBtn.style.width = "40px";
    delBtn.style.height = "40px";
    delBtn.style.cursor = "pointer";
    delBtn.style.backgroundColor = "#f5f5f5";
    delBtn.style.color = "gray";
    delBtn.style.fontSize = "20px";
    delBtn.style.display = "none";

    delBtn.onclick = () => {
      todos.splice(index, 1);
      renderTodos();
    };

    li.addEventListener("mouseenter", () => {
     delBtn.style.display = "block";
   });
   
    li.addEventListener("mouseleave", () => {
     delBtn.style.display = "none";
   });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function filterTodos(filter) {
  currentFilter = filter;
  renderTodos();
}