const input = document.querySelector(".input");

const close = document.querySelector(".close img");

const todoList = document.querySelector(".todo-list");

//creating our todos and getting it from localstorage
let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

//adding item to todos array
function addItemToTodos() {
  if (input.value.trim().length != 0) {
    todos.push({
      item: input.value,
      done: false,
    });
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Calling the event on Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (input.value === "") {
      return;
    }
    addItemToTodos();
    input.value = "";
    console.log(todos);
    createElement();
  }
});
//Element to hold the todos and todo reversal
function createElement() {
  const appendElem = document.querySelector(".todo");
  const reversedTodo = [...todos].reverse();
  const fetchItem = reversedTodo.map((todo) => {
    return `<div class="todo-list"><div class="todo-item">
    <input type="checkbox" name="todo" class="check ">
    <p class="item">${todo.item}</p>
  </div>
  <div class="close"><img src="./images/icon-cross.svg" alt=""></div></div>`;
  });

  appendElem.innerHTML = fetchItem;
}
window.onload = createElement();
// add check functionality
const check = Array.from(document.querySelectorAll(".check"));

check.forEach((element) => {
  element.addEventListener("click", () => {
    const listPara = Array.from(document.querySelectorAll(".item"));
    for (let i = 0; i <= todos.length - 1; i++) {
      if (check[i].checked) {
        listPara[i].style.textDecoration = "line-through";
        listPara[i].style.color = "rgba(236, 235, 235, 0.6)";
        console.log(todos[i].done);
      } else {
        todos[i].done = false;
        listPara[i].style.textDecoration = "none";
        listPara[i].style.color = "rgb(235, 233, 233)";
        console.log(todos[i].done);
      }
    }
  });
});

todoList.addEventListener("mouseover", () => {
  close.style.display = "block";
});
todoList.addEventListener("mouseout", () => {
  close.style.display = "none";
});
