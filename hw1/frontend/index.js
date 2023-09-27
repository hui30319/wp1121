/* global axios */
const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
    const todos = await getTodos();
    todos.forEach((todo) => renderTodo(todo));
  } catch (error) {
    alert("Failed to load todos!");
  }
}

function setupEventListeners() {
  const addTodoButton = document.querySelector("#todo-add");
  const todoBlank = document.querySelector("#todo-blank");
  const todoClose = document.querySelector("#todo-close");
  const todoSave = document.querySelector("#todo-save");
  const todoTimeInput = document.querySelector(".todo-time-input");
  const timegeneral = new Date();
  const day_list = ['日', '一', '二', '三', '四', '五', '六'];
  todoTimeInput.innerText = timegeneral.getFullYear() + "." + (('0'+(timegeneral.getMonth() + 1)).slice(-2)) + "." + (('0'+(timegeneral.getDate() + 1)).slice(-2))+ " ("+ day_list[timegeneral.getDay()]+")";
  const todoTagInput = document.querySelector('input[list="todo-tag-input"]');
  const todoMoodInput = document.querySelector('input[list="todo-mood-input"]');
  const todoDescriptionInput = document.querySelector("#todo-description-input");
  addTodoButton.addEventListener("click", async () => {todoBlank.showModal()});
  
  todoClose.addEventListener("click", async () => {
    todoBlank.close();
    todoTagInput.value = "";
    todoMoodInput.value = "";
    todoDescriptionInput.value = "";});
  
  todoSave.addEventListener("click", async () => {
    const tag = todoTagInput.value;
    const mood = todoMoodInput.value;
    const description = todoDescriptionInput.value;
    // const timegeneral = new Date();
    // const day_list = ['日', '一', '二', '三', '四', '五', '六'];
    const time = todoTimeInput.innerText;//timegeneral.getFullYear() + "." + (('0'+(timegeneral.getMonth() + 1)).slice(-2)) + "." + (('0'+(timegeneral.getDate() + 1)).slice(-2))+ " ("+ day_list[timegeneral.getDay()]+")";

    if (!description) {
      alert("Please enter description!");
      return;
    }
    try {
      const todo = await createTodo({ time, tag, mood, description });
      // console.log(todo);
      renderTodo(todo);
      todoBlank.close();
    } catch (error) {
      alert("Failed to create todo!");
      return;
    }
    todoTagInput.value = "";
    todoMoodInput.value = "";
    todoDescriptionInput.value = "";
  });
}

function renderTodo(todo) {
  const item = createTodoElement(todo);
  todoList.appendChild(item);
}

function createTodoElement(todo) {
  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".id-item");
  container.id = todo.id;
  const time = item.querySelector("p.todo-time");
  time.innerText = todo.time;
  const tag = item.querySelector("p.todo-tag");
  tag.innerText = todo.tag;
  const mood = item.querySelector("p.todo-mood");
  mood.innerText = todo.mood;
  const description = item.querySelector("p.todo-description");
  description.innerText = todo.description;
  const todoDetail = item.querySelector("#todo-detail");
  const todoBullet = item.querySelector("#todo-bullet");
  todoBullet.addEventListener("click", async () => {todoDetail.showModal()});

  const tag2 = item.querySelector("p.todo-tag2");
  tag2.innerText = todo.tag;
  const mood2 = item.querySelector("p.todo-mood2");
  mood2.innerText = todo.mood;
  const description2 = item.querySelector("p.todo-description2");
  description2.innerText = todo.description;
  const time2 = item.querySelector("p.todo-time2");
  time2.innerText = todo.time;
  const buttonEdit = item.querySelector("#button-edit");
  const buttonSave = item.querySelector("#button-save");
  const buttonClose = item.querySelector("#button-close");
  const buttonDelete = item.querySelector("#button-delete");
  const textareaEdit = item.querySelector("#textarea-edit");
  const tagEdit = item.querySelector('input[list="tag-edit"]');
  const moodEdit = item.querySelector('input[list="mood-edit"]');
  

  buttonEdit.addEventListener("click", async () => {
    tag2.style.display = "none";
    tagEdit.style.display = "inline-block";
    tagEdit.value = tag2.innerText;
    mood2.style.display = "none";
    moodEdit.style.display = "inline-block";
    moodEdit.value = mood2.innerText;
    description2.style.display = "none";
    textareaEdit.style.display = "block";
    textareaEdit.value = description2.innerText;
    buttonEdit.style.display = "none";
    buttonDelete.style.display = "none";
    buttonSave.style.display = "inline-block";
    buttonClose.style.display = "inline-block";
  });

  buttonSave.addEventListener("click", async () => {
    tagEdit.style.display = "none";
    tag2.style.display = "inline-block";
    tag2.innerText = tagEdit.value;
    tag.innerText = tagEdit.value;
    moodEdit.style.display = "none";
    mood2.style.display = "inline-block";
    mood2.innerText = moodEdit.value;
    mood.innerText = moodEdit.value;
    textareaEdit.style.display = "none";
    description2.style.display = "block";
    description2.innerText = textareaEdit.value;
    description.innerText = textareaEdit.value;
    buttonSave.style.display = "none";
    buttonClose.style.display = "none";
    buttonEdit.style.display = "block";
    buttonDelete.style.display = "block";
    todo.tag = tagEdit.value;
    todo.mood = moodEdit.value;
    todo.description = textareaEdit.value;
    // console.log(todo);
    updateTodoStatus(todo.id, todo);
  });

  buttonClose.addEventListener("click", async () => {
    tagEdit.style.display = "none";
    tag2.style.display = "inline-block";
    moodEdit.style.display = "none";
    mood2.style.display = "inline-block";
    textareaEdit.style.display = "none";
    description2.style.display = "block";
    buttonSave.style.display = "none";
    buttonClose.style.display = "none";
    buttonEdit.style.display = "block";
    buttonDelete.style.display = "block";
    // console.log(todo.id);
    // console.log(document.getElementById(todo.id));
  });

  buttonDelete.addEventListener("click", async () => {
    deleteTodoElement(todo.id);
    todoDetail.close();
  });
  // todoDetail.addEventListener("click", async () => {
  //   todoDetail.close()
  // });
  return item;
}

async function deleteTodoElement(id) {
  try {
    await deleteTodoById(id);
  } catch (error) {
    alert("Failed to delete todo!");
  } finally {
    const todo = document.getElementById(id);
    todo.remove();
  }
}

async function getTodos() {
  const response = await instance.get("/todos");
  return response.data;
}

async function createTodo(todo) {
  const response = await instance.post("/todos", todo);
  return response.data;
}

// eslint-disable-next-line no-unused-vars
async function updateTodoStatus(id, todo) {
  const response = await instance.put(`/todos/${id}`, todo);
  return response.data;
}

async function deleteTodoById(id) {
  const response = await instance.delete(`/todos/${id}`);
  return response.data;
}

main();
