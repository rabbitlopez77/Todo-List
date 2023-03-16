const form = document.querySelector('#new-todo-form')
const todoInput = document.querySelector('#todo-input')
const list = document.querySelector('#list')
const template = document.querySelector('#list-item-template')
const LOCAL_STORAGE_PREFIX = 'ADVANCECED_TODO_LIST'
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX} - todos`
let todos = loadTodos()
todos.forEach(renderTodo)

list.addEventListener('change', e => {
    if(!e.target.matches('[data-list-item-checkbox]')) return
    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId
    const todo = todos.find(t => t.id === todoId)
    todo.complete = e.target.checked
    saveTodo()
})

list.addEventListener('click', e => {
    if(!e.target.matches('[data-button-delete]')) return
    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId
    parent.remove()
    todos = todos.filter(todo => todo.id !== todoId)
    saveTodo()
})

function renderTodo(value) {
    const templateClone = template.content.cloneNode(true)
    const listItem = templateClone.querySelector('.list-item')
    listItem.dataset.todoId = value.id
    const textElement = templateClone.querySelector('[data-list-item-text]')
    textElement.innerText = value.name
    const todoCheckbox = templateClone.querySelector('[data-list-item-checkbox]')
    todoCheckbox.checked = value.complete
    list.appendChild(templateClone)
}

function saveTodo() {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

function loadTodos() {
    const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
    return JSON.parse(todosString) || []
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const todoName = todoInput.value
    if(todoName === '') return
    const newTodo = {
        name: todoName,
        complete: false,
        id: new Date().valueOf().toString()
    }
    renderTodo(newTodo)
    todos.push(newTodo)
    saveTodo()
    todoInput.value = ''
})