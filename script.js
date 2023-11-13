'use strict';

const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const form = document.querySelector('.create-task-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(taskInput.value.trim() === ''){
        return;
    }

    createSingleTaskElement(taskInput.value);

    localStorage.setItem('countBook', Number(localStorage.getItem('countBook'))+1) // Збільшуємо лічильник у localstorage при наявності елементу у tasks.

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = ''; //form.reset();
});

document.addEventListener('DOMContentLoaded', renderTasks);

taskList.addEventListener('click', (event)=>{
    const iconContainer = event.target.parentElement;

    if(iconContainer.classList.contains('delete-item')){ // Видалення елементу
        if(confirm('Are you sure?')){
            iconContainer.parentElement.remove();
            const tasks = localStorage.getItem('tasks') !== null
                ? JSON.parse(localStorage.getItem('tasks'))
                :[];

            tasks.forEach((task, index) => {
                if(index === Number(iconContainer.parentElement.id)){
                    tasks.splice(index, 1); //Видалення з якого елементу і скільки
                }
            });

            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            renderTasks();
        }
    }

    if(iconContainer.classList.contains('edit-item')){ // Зміна елементу
        const itemText = prompt("Edit item?", iconContainer.parentElement.textContent);
        if(itemText !== '' && itemText !== null){
            iconContainer.parentElement.value = itemText;
        
            const tasks = localStorage.getItem('tasks') !== null
                ? JSON.parse(localStorage.getItem('tasks'))
                :[];

            tasks.forEach((task, index) => {
                if(index === Number(iconContainer.parentElement.id)){
                    tasks[index] = itemText;
                }
            });
            console.log('tasks - ' + tasks);

            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            renderTasks();
        }
    }

});

clearBtn.addEventListener('click', () => {
    if(confirm('Are you sure?')){
        localStorage.clear();
        taskList.innerHTML = '';
    }
})


function createSingleTaskElement(newTask){
    const li = document.createElement('li');
    li.className = 'collection-item';

    li.id = localStorage.getItem('countBook'); // Додає id до li, який ідентичний до індекса певного слова у localstorage

    li.appendChild(document.createTextNode(newTask));

    const deleteElement = document.createElement('span');
    deleteElement.className = "delete-item";
    deleteElement.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(deleteElement);

    const editElement = document.createElement('span');
    editElement.className = "edit-item";
    editElement.innerHTML = '<i class="fa fa-edit"></i>';

    li.appendChild(editElement); // Додавання іконки зміни

    taskList.appendChild(li);
}

function storeTaskInLocalStorage(newTask){
    const tasks = localStorage.getItem('tasks') !== null
    ? JSON.parse(localStorage.getItem('tasks'))
    :[];

    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(){
    taskList.innerHTML = '';
    localStorage.setItem('countBook', 0)
    const tasks = localStorage.getItem('tasks') !== null
    ? JSON.parse(localStorage.getItem('tasks'))
    :[];

    tasks.forEach((task) => {
        createSingleTaskElement(task);
        localStorage.setItem('countBook', Number(localStorage.getItem('countBook'))+1) // Збільшуємо лічильник у localstorage при додаванні нового елементу.
    });

}