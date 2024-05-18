document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.querySelector(".todo-list");
  const footer = document.querySelector(".footer");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
  });

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (todos) {
    todos.forEach((todoElement) => {
      addTodo(todoElement);
    });
  }

  function addTodo(todoElement) {
    let todoCollection = document.createElement("div");
    todoCollection.classList.add("taskItem");
    console.log(todoCollection);
    let todoText = todoInput.value;
    if (todoElement) {
      todoText = todoElement.text;
    }
    if (todoText) {
      todoCollection.innerHTML = `
        <div class="list-item">
            <div class="tick ${
              todoElement && todoElement.complete ? "active-state" : ""
            }"><img src="./images/icon-check.svg" alt=""></div>
            <span class="task ${
              todoElement && todoElement.complete ? "finished" : ""
            }">${todoText}</span>
            <button class="cancel"><img src="./images/icon-cross.svg" alt=""></button>
        </div>
        <div class="hr"></div>`;
      todoList.insertBefore(todoCollection, footer);
      updateLocalStorage();
    }

    let cancelButton = todoCollection.querySelector(".cancel");
    cancelButton.addEventListener("click", () => {
      todoCollection.remove();
      updateLocalStorage();
    });

    let checkButton = todoCollection.querySelector(".tick");
    checkButton.addEventListener("click", () => {
      checkButton.classList.toggle("active-state");
      todoCollection.children[0].children[1].classList.toggle("complete");
      updateLocalStorage();
    });

    todoInput.value = "";
  }

  function updateLocalStorage() {
    let taskElements = document.querySelectorAll(".task");
    console.log(taskElements);
    let todoArray = [];
    taskElements.forEach((element) => {
      todoArray.push({
        text: element.innerText,
        complete: element.classList.contains("complete"),
      });
    });
    localStorage.setItem("todos", JSON.stringify(todoArray));
  }

  let filterButtons = document.querySelectorAll(".states ul li");
  filterButtons.forEach((element) => {
    element.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });
      element.classList.add("active");
      filterTodos(element.innerText);
    });
  });

  function filterTodos(filter) {
    let todoItems = document.querySelectorAll(".taskItem");
    todoItems.forEach((item) => {
      if (filter === "Active") {
        item.style.display = item.children[0].children[1].classList.contains(
          "complete"
        )
          ? "none"
          : "block";
      } else if (filter === "Completed") {
        item.style.display = item.children[0].children[1].classList.contains(
          "complete"
        )
          ? "block"
          : "none";
      } else {
        item.style.display = "block";
      }
    });
    updateItemCount();
  }

  let clearCompletedButton = document.querySelector(".completed");
  clearCompletedButton.addEventListener("click", () => {
    let todoItems = document.querySelectorAll(".taskItem");
    todoItems.forEach((item) => {
      if (item.children[0].children[1].classList.contains("complete")) {
        item.remove();
        updateLocalStorage();
        updateItemCount();
      }
    });
  });

  let itemsLeft = document.querySelector(".items-left");
  const updateItemCount = (filter) => {
    let todoItems = document.querySelectorAll(".taskItem");
    let activeTodoItems = document.querySelectorAll(".list-item .active-state");
    let remainingItems = todoItems.length - activeTodoItems.length;
    itemsLeft.innerText = `${remainingItems} items left`;
  };
});
