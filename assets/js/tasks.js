// Lógica referente as tarefas

// Adiciona uma nova tarefa à lista de tarefas.
function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');

    const img = document.createElement('img');
    img.src = 'assets/images/trash.svg'; 
    img.alt = '-';

    deleteButton.appendChild(img); 

    deleteButton.onclick = () => {
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteButton);
    tasksList.appendChild(li);
    newTaskInput.value = '';
    saveTasks();
}

// Salva todas as tarefas no localStorage do navegador.
function saveTasks() {
    const tasks = [];
    tasksList.querySelectorAll('li').forEach(li => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carrega as tarefas salvas no localStorage e as exibe na tela ao recarregar a página.
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button'); 

        const img = document.createElement('img');
        img.src = 'assets/images/trash.svg';
        img.alt = '-';

        deleteButton.appendChild(img);
        deleteButton.onclick = () => {
            li.remove();
            saveTasks();
        };

        li.appendChild(deleteButton);
        tasksList.appendChild(li);
    });
}

