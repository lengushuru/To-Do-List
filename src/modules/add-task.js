const taskInput = document.querySelector('.addtolist');
const taskBox = document.querySelector('.task-box');

const ClearAll = document.querySelector('.clearCompleted');

const completed = false;
let index = 0;
let list = [];

function showTodo() {
  let liItem = '';
  list.forEach((element) => {
    if (element.completed === true) {
      liItem += `<li class="task">
                                    <input type="checkbox" class="checkme" checked onchange ="CheckMe(${element.index});" id="check${element.index}">
                    
                                    <input type="text" value="${element.description}" class="tasks" id="item${element.index}" readonly>                                    <i class="fa-solid uil-ellipsis-v edit " id="edit${element.index}" onclick="editItem(${element.index});"></i>
                                    <i class="fa-solid fa-trash delete" id="delete${element.index}" onclick="removeItem(${element.index});"></i>
                                           
                                        </li>`;
    } else {
      liItem += `<li class="task">

                            <input type="checkbox" class="checkme" onclick="CheckMe(${element.index});" id="check${element.index}">
                        <input type="text" value="${element.description}" class="tasks" id="item${element.index}" readonly>
                        <i class="fa-solid uil-ellipsis-v edit " id="edit${element.index}" onclick="editItem(${element.index});"></i>
                        <i class="fa-solid fa-trash delete" id="delete${element.index}" onclick="removeItem(${element.index});"></i     
                            </li>`;
    }
  });

  taskBox.innerHTML = liItem || '<p class="no-item">You don\'t have any task here</p>';
  taskInput.value = '';
}

taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && taskInput.value.length !== 0) {
    const storedList = localStorage.getItem('todo-list');

    if (storedList) {
      list = JSON.parse(storedList);
      index = list.length === 0 ? 0 : list.length;
    } else {
      list = [];
    }

    const store1 = {
      index,
      description: taskInput.value,
      completed,
    };
    list.push(store1);
    localStorage.setItem('todo-list', JSON.stringify(list));
    showTodo();
  }
});

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
  list = JSON.parse(storedData);
  list.splice(index, 1);
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
  }
  localStorage.setItem('todo-list', JSON.stringify(list));
  showTodo();
};

const saveTaskOnBlur = (event) => {
  const taskItem = event.target;
  const itemId = taskItem.getAttribute('id');
  const index = parseInt(itemId.replace('item', ''), 10);// radi
  list[index].description = taskItem.value;
  localStorage.setItem('todo-list', JSON.stringify(list));
  const editBtn = document.getElementById(`edit${index}`);
  const deletebtn = document.getElementById(`delete${index}`);

  deletebtn.style.display = 'none';
  editBtn.style.display = 'block';
};
taskBox.addEventListener('blur', saveTaskOnBlur, true);

window.CheckMe = (index) => {
  const CheckCheck = document.getElementById(`check${index}`);
  if (CheckCheck.checked === true) {
    const storedData = localStorage.getItem('todo-list');
    list = JSON.parse(storedData);
    list[index].completed = true;
    localStorage.setItem('todo-list', JSON.stringify(list));
    showTodo();
  } else {
    const storedData = localStorage.getItem('todo-list');
    list = JSON.parse(storedData);
    list[index].completed = false;
    localStorage.setItem('todo-list', JSON.stringify(list));
    showTodo();
  }
};

window.onload = () => {
  if (localStorage.getItem('todo-list')) {
    list = JSON.parse(localStorage.getItem('todo-list'));
  }
  showTodo();
};

ClearAll.addEventListener('click', () => {
  const storedData = localStorage.getItem('todo-list');
  list = JSON.parse(storedData);
  const AfterCleared = list.filter((element) => element.completed === false);
  list = AfterCleared;
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
  }
  localStorage.setItem('todo-list', JSON.stringify(list));
  showTodo();
});
