document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.forms;
  console.log(todoForm);
  const todoInput = document.getElementById("todo-input");
  const todoListContainer = document.querySelector(".todo-list");

  const deleteTodoItem = (e) => {
    const todoItem = e.target.parentElement;
    const todoId = todoItem.getAttribute("data-id"); //?
    const todos = getTodosFromLocalStorage();
    const updatedTodos = todos.filter((todo) => todo.id != todoId);
    saveTodosToLocalStorage(updatedTodos);
    todoListContainer.removeChild(todoItem);
  };
  const editTodoItem = (id, inputTypeElement) => {
    inputTypeElement.disabled = !inputTypeElement.disabled;
    if (!inputTypeElement.disabled) {
        inputTypeElement.focus();
    } else {
      const todos = getTodosFromLocalStorage();
      const updatedTodos = todos.map((todo) => {
        if (todo.id == id) {
          todo.text = inputTypeElement.value;
        }
        return todo;
      });
      saveTodosToLocalStorage(updatedTodos);
    }
  };

  const addTodoToDOM = (todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("items");
    todoItem.setAttribute("data-id", todo.id);

    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "todo";

    const todoTextInput = document.createElement("input");
    todoTextInput.type = "text";
    todoTextInput.value = todo.text;
    todoTextInput.disabled = true;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.color = "white";
    deleteBtn.style.borderRadius = "3px";
    deleteBtn.style.padding = "2px 7px";
    deleteBtn.style.border = "none";

    deleteBtn.addEventListener("click", deleteTodoItem);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.backgroundColor = "green";
    editBtn.style.color = "white";
    editBtn.style.borderRadius = "3px";
    editBtn.style.padding = "2px 7px";
    editBtn.style.border = "none";

    editBtn.addEventListener("click", () =>
      editTodoItem(todo.id, todoTextInput)
    );

    todoItem.appendChild(radioBtn);
    todoItem.appendChild(todoTextInput);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);

    const footer = document.querySelector(".footer");
    todoListContainer.insertBefore(todoItem, footer);
  };

  const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.forEach((todo) => addTodoToDOM(todo));
  };

  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getTodosFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("todos"));
  };

  const addTodo = () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    const todo = {
      // id: Date.now(),
      text: todoText,
      completed: false,
    };

    addTodoToDOM(todo);
    const todos = getTodosFromLocalStorage();
    todos.push(todo);
    saveTodosToLocalStorage(todos);
    todoInput.value = "";
  };

  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  });

  loadTodos();
});
