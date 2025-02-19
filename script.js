document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [] ;

    // Render existing tasks from localStorage
    tasks.forEach(task => renderTask(task));

    // add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
    });

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        li.className = "flex items-center justify-between bg-gray-700 px-3 py-2 mb-2 rounded-lg";

        if(task.completed) li.classList.add('completed');

        li.innerHTML = `<span>${task.text}</span>
        <button class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition">Delete</button>`;

        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });

        // delete task
        li.querySelector('button').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        })

        todoList.appendChild(li);

    }
})