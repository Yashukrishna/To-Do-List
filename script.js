// Array to store task reminders
let taskReminders = [];

// Function to toggle between Add Task and Preview Task sections
document.getElementById('add-task-menu').addEventListener('click', function() {
    document.getElementById('add-task-section').classList.add('active');
    document.getElementById('preview-task-section').classList.remove('active');
});

document.getElementById('preview-task-menu').addEventListener('click', function() {
    document.getElementById('add-task-section').classList.remove('active');
    document.getElementById('preview-task-section').classList.add('active');
});

// Function to add a new task
document.getElementById('add-task-btn').addEventListener('click', function() {
    let taskName = document.getElementById('task-name').value;
    let taskDesc = document.getElementById('task-desc').value;
    let category = document.getElementById('category').value;
    let reminderDate = document.getElementById('reminder-date').value;
    let reminderTime = document.getElementById('reminder-time').value;

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById(category + '-list');

    let newTask = document.createElement('li');
    newTask.innerHTML = `
        <span class="task-info">
            <strong>${taskName}</strong> <br>
            <small>${taskDesc ? taskDesc : "No description provided"}</small>
        </span>
        <span class="actions">
            <span class="mark-done">✔</span>
            <span class="delete">x</span>
        </span>
    `;

    taskList.appendChild(newTask);

    document.getElementById('task-name').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('reminder-date').value = '';
    document.getElementById('reminder-time').value = '';

    displayMessage('Task added successfully!');
    // Add "mark done" functionality
    newTask.querySelector('.mark-done').addEventListener('click', function() {
        newTask.classList.add('done');
        displayMessage('Congratulations on completing the task!');
    });

    // Add delete functionality
    newTask.querySelector('.delete').addEventListener('click', function() {
        taskList.removeChild(newTask);
        displayMessage('Task successfully deleted!');
    });

    if (reminderDate && reminderTime) {
        let reminderDateTime = new Date(reminderDate + 'T' + reminderTime);
        taskReminders.push({ taskName, reminderDateTime, isAlerted: false });
    }
});

// Function to display success messages
function displayMessage(message) {
    let messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 3000);
}

// Function to check reminders in real time
function checkReminders() {
    let now = new Date();
    taskReminders.forEach((reminder) => {
        let reminderDate = reminder.reminderDateTime;

        if (now >= reminderDate && !reminder.isAlerted) {
            alert(`Reminder: It's time to complete the task: ${reminder.taskName}`);
            reminder.isAlerted = true;
        }
    });
}

setInterval(checkReminders, 1000);
