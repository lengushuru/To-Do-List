import './styles.css';

const list = document.querySelector('#list');

const tasks = [
  {
    description: 'wash car',
    completed: false,
    index: 1,
  },
  {
    description: 'call mum',
    completed: false,
    index: 3,
  },

];

tasks.sort((a, b) => a.index - b.index);

tasks.forEach((element) => {
  const container = document.createElement('div');
  container.className = 'activity';
  container.innerHTML = `
  <div class = 'activity1'>
    <input type = "checkbox" >
    <p>${element.description}</p>
  </div>
  <i class="uil uil-ellipsis-v"></i>`;

  list.appendChild(container);
});
