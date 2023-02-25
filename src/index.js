import './styles.css';

const taskInput = document.querySelector('.addtolist');
const taskBox = document.querySelector('.task-box');

const completed = false;
let index = 0;
let tasksContainer = [];

function showTodo() {
  let list = '';
  tasksContainer.forEach((element) => {
    list += `<li class="task">
                        <input type="checkbox" class="checkme">
                        <input type="text" value="${element.description}" class="tasks" id="item${element.index}" readonly>

                        <i class="fa-solid uil-ellipsis-v edit " id="edit${element.index}" onclick="editItem(${element.index});"></i>
                        <i class="fa-solid fa-trash delete" id="delete${element.index}" onclick="removeItem(${element.index});"></i>
        
                        </li>`;
  });

  taskBox.innerHTML = list || '<p class="no-item">You don\'t have any task here</p>';
  taskInput.value = '';
}

taskInput.addEventListener('keypress', (keys) => {
  if (keys.key === 'Enter' && taskInput.value !== '') {
    const storedList = localStorage.getItem('todo-list');

    if (storedList === null) {
      tasksContainer = [];
    } else {
      tasksContainer = JSON.parse(storedList);
      index = tasksContainer.length === 0 ? 0 : tasksContainer.length;
    }

    const LocalStore = {
      index,
      description: taskInput.value,
      completed,
    };
    tasksContainer.push(LocalStore);
    localStorage.setItem('todo-list', JSON.stringify(tasksContainer));
    showTodo();
  }
});

window.onload = () => {
  if (localStorage.getItem('todo-list')) {
    tasksContainer = JSON.parse(localStorage.getItem('todo-list'));
  }
  showTodo();
};

window.editItem = (index) => {
  const editBtn = document.getElementById(`edit${index}`);
  const deletebtn = document.getElementById(`delete${index}`);

  deletebtn.style.display = 'block';
  editBtn.style.display = 'none';
  const mainItem = document.getElementById(`item${index}`);
  mainItem.removeAttribute('readonly');
  const { length } = mainItem.value;
  mainItem.setSelectionRange(length, length);
};

window.removeItem = (index) => {
  const editBtn = document.getElementById(`edit${index}`);
  const deletebtn = document.getElementById(`delete${index}`);

  deletebtn.style.display = 'none';
  editBtn.style.display = 'block';
  const storedData = localStorage.getItem('todo-list');
  tasksContainer = JSON.parse(storedData);
  tasksContainer.splice(index, 1);
  for (let i = 0; i < tasksContainer.length; i += 1) {
    tasksContainer[i].index = i;
  }
  localStorage.setItem('todo-list', JSON.stringify(tasksContainer));
  showTodo();
};

const saveTaskOnBlur = (event) => {
  const taskItem = event.target;
  const itemId = taskItem.getAttribute('id');
  const index = parseInt(itemId.replace('item', ''), 10);// radi
  tasksContainer[index].description = taskItem.value;
  localStorage.setItem('todo-list', JSON.stringify(tasksContainer));
  const editBtn = document.getElementById(`edit${index}`);
  const deletebtn = document.getElementById(`delete${index}`);

  deletebtn.style.display = 'none';
  editBtn.style.display = 'block';
};
taskBox.addEventListener('blur', saveTaskOnBlur, true);
