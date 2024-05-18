document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const text = document.getElementById("todo-input");
  const todoContainer = document.querySelector(".todo-list");
  const footer = document.querySelector(".footer");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
  });

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (todos) {
    todos.forEach((element) => {
      addTodo(element);
    });
  }

  function addTodo(todoElement) {
    let todoColl = document.createElement("div");
    todoColl.classList.add("todocoll");
    console.log(todoColl);
    let todotext = text.value;
    if (todoElement) {
      todotext = todoElement.text;
    }
    if (todotext) {
      todoColl.innerHTML = `
        <div class="todo-li">
            <div class="check ${
              todoElement && todoElement.complete ? "active-check" : ""
            }"><img src="./images/icon-check.svg" alt=""></div>
            <p class="ptag ${todoElement && todoElement.complete ? "complete" : ""}">${
        todotext
      }</p>
            <button class="close"><img src="./images/icon-cross.svg" alt=""></button>
        </div>
        <div class="hr"></div>`;
        todoContainer.insertBefore(todoColl, footer);
      updateLs();
    }

    let close = todoColl.querySelector(".close");
    close.addEventListener("click", () => {
      todoColl.remove();
      updateLs();
    });

    let check = todoColl.querySelector(".check");
    check.addEventListener("click", () => {
      check.classList.toggle("active-check");
      todoColl.children[0].children[1].classList.toggle("complete");
      updateLs();
    });

    text.value = "";
  }

  function updateLs() {
    let ptag = document.querySelectorAll(".ptag");
    console.log(ptag);
    let arr = [];
    ptag.forEach((element) => {
      arr.push({
        text: element.innerText,
        complete: element.classList.contains("complete"),
      });
    });
    localStorage.setItem("todos", JSON.stringify(arr));
  }

  let info = document.querySelectorAll(".states ul li");
  info.forEach((element) => {
    element.addEventListener("click", () => {
      info.forEach((item) => {
        item.classList.remove("active");
      });
      element.classList.add("active");
      filterTodos(element.innerText);
    });
  });

  function filterTodos(filter) {
    let todoli = document.querySelectorAll(".todocoll");
    todoli.forEach((elem) => {
      switch (filter) {
        case "Active":
          if (!elem.children[0].children[1].classList.contains("complete")) {
            elem.style.display = "block";
          } else {
            elem.style.display = "none";
          }
          break;
        case "Completed":
          if (elem.children[0].children[1].classList.contains("complete")) {
            elem.style.display = "block";
          } else {
            elem.style.display = "none";
          }
          break;
        default:
          elem.style.display = "block";
          break;
      }
    });
    setitem();
  }

  let clear = document.querySelector(".completed");
  clear.addEventListener("click", () => {
    let todoli = document.querySelectorAll(".todocoll");
    todoli.forEach((elem) => {
      if (elem.children[0].children[1].classList.contains("complete")) {
        elem.remove();
        updateLs();
        setitem();
      }
    });
  });

  let left = document.querySelector(".items-left");
  function setitem() {
    let todoli = document.querySelectorAll(".todocoll");
    let activeTodo = document.querySelectorAll(".todo-li .active-check");
    let diff = todoli.length - activeTodo.length;
    left.innerText = `${diff} items left`;
  }
});
