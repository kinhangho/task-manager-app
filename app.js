 
let tasks = [];

// Function to display tasks
function displayTasks() {
    const taskList = document.querySelector('ul');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;
        // Attach event listeners for delete and edit buttons
        const deleteButton = taskItem.querySelector('.delete-btn');
        const editButton = taskItem.querySelector('.edit-btn');
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        editButton.addEventListener('click', () => editTask(task.id));
        taskList.appendChild(taskItem);
    });
}

// Function to fetch tasks from the API
function fetchTasks() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            tasks = data; // Populate the tasks array with API data
            displayTasks(); // Refresh the task list
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
}

// Call fetchTasks to load tasks from the API initially
fetchTasks();

// Get the task creation form
const taskForm = document.querySelector('#task-form');

// Function to handle form submission
function createTask(event) {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;

    // Create a task with user input
    createTaskOnAPI(title, description);
}

// Attach form submission event listener
taskForm.addEventListener('submit', createTask);

// Function to create a task on the API
function createTaskOnAPI(title, description) {
    const taskData = {
        title: title,
        description: description,
        userId: 1, // You may need to adjust the user ID based on your project's requirements
        completed: false, // You can set the initial status here
    };

    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(newTask => {
        // After successfully creating the task, update the 'tasks' array
        tasks.push(newTask);
        displayTasks(); // Refresh the task list
        console.log('Task created:', newTask); // Log the created task
    })
    .catch(error => {
        console.error('Error creating task:', error);
    });
}

// Function to update a task
function updateTask(taskId, updatedData) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(updatedTask => {
        // After successfully updating the task, find and update the task in the 'tasks' array
        const index = tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            tasks[index] = updatedTask;
            displayTasks(); // Refresh the task list
        }
    })
    .catch(error => {
        console.error('Error updating task:', error);
    });
}

// Function to delete a task
function deleteTask(taskId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'DELETE',
    })
    .then(() => {
        // After successfully deleting the task, remove it from the 'tasks' array
        tasks = tasks.filter(task => task.id !== taskId);
        displayTasks(); // Refresh the task list
    })
    .catch(error => {
        console.error('Error deleting task:', error);
    });
}

// Inside your editTask function

// Inside your editTask function

function editTask(taskId) {
    const editForm = document.querySelector('#edit-form');
    
    // Find the task to edit in the 'tasks' array
    const taskToEdit = tasks.find(task => task.id === taskId);

    if (!taskToEdit) {
        console.error('Task not found.');
        return;
    }

    // Populate the edit form with task data
    const editTitleInput = editForm.querySelector('#edit-title');
    const editDescriptionInput = editForm.querySelector('#edit-description');

    editTitleInput.value = taskToEdit.title;
    editDescriptionInput.value = taskToEdit.description;

    // Show the edit form
    editForm.style.display = 'block';

    // Handle form submission and API update here

    // You should have this line to attach the event listener for the "Save" button inside the edit form
    editForm.addEventListener('submit', event => {
        event.preventDefault(); // Prevent form submission

        // Get the updated values from the form
        const updatedTitle = editTitleInput.value;
        const updatedDescription = editDescriptionInput.value;

        // Update the task's data in the 'tasks' array
        taskToEdit.title = updatedTitle;
        taskToEdit.description = updatedDescription;

        // Send a PUT request to update the task on the API
        updateTask(taskId, { title: updatedTitle, description: updatedDescription });

        // Hide the edit form
        editForm.style.display = 'none';

        // Refresh the task list
        displayTasks();
    });
}


// Initial display of tasks
function displayTasks() {
    const taskList = document.querySelector('ul');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;

        // Attach event listeners for delete and edit buttons
        const deleteButton = taskItem.querySelector('.delete-btn');
        const editButton = taskItem.querySelector('.edit-btn');

        deleteButton.addEventListener('click', () => deleteTask(task.id));
        editButton.addEventListener('click', () => editTask(task.id)); // Ensure this line is present

        taskList.appendChild(taskItem);
    });
}



// Function to update a task
function updateTask(taskId, updatedData) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(updatedTask => {
        // After successfully updating the task, find and update the task in the 'tasks' array
        const index = tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            tasks[index] = updatedTask;
            displayTasks(); // Refresh the task list
        }
    })
    .catch(error => {
        console.error('Error updating task:', error);
    });
}

// Attach form submission event listener
taskForm.addEventListener('submit', createTask);

 

editButton.addEventListener('click', () => editTask(task.id));


 