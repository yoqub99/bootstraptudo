const elForm = document.querySelector(".todo-form");
const elInput = document.querySelector(".todo-input");
const elList = document.querySelector(".todo-list");
const elCountAll =document.querySelector(".all-count")
const elCountComplate =document.querySelector(".complated-count")
const elCountUnComp =document.querySelector(".uncomplated-count")
const elTemplate = document.querySelector("#todo-item--template").content;


let todosStorage = JSON.parse(window.localStorage.getItem('todos'))

let todosArr = todosStorage || [];


function template(){
    renderTodo(todosArr, elList);
    window.localStorage.setItem('todos', JSON.stringify(todosArr))
}

function deleteBtn(e){
    const todoId = e.target.dataset.uuid
    
    let findIndex = todosArr.findIndex((elem) => elem.id == todoId);
    
    todosArr.splice(findIndex, 1);
    
    template()
}

function complateTodo(e){
    const checkedTodo = e.target.dataset.uuid
    
    let findCompleted = todosArr.find((elem) => elem.id == checkedTodo);
    
    findCompleted.isComplate = !findCompleted.isComplate
    
    template()  
}

function renderTodo(todoArr, element){
    let complateTodoCount = 0;
    
    element.innerHTML = null;
    
    todoArr.forEach((todo) => {
        const cloneTemplate = elTemplate.cloneNode(true);
        
        const elTitle = cloneTemplate.querySelector(".todo-item-complete-text");
        const elDeleteBtn = cloneTemplate.querySelector(".todo-item-delete-btn");
        const elCheckbox = cloneTemplate.querySelector(".todo-input-complete");
        
        
        elTitle.textContent = todo.title,
        elCheckbox.checked = todo.isComplate,
        elCheckbox.dataset.uuid = todo.id,
        elDeleteBtn.dataset.uuid = todo.id
        
        if(todo.isComplate){
            elTitle.classList.add('text-danger');
            elTitle.style.textDecoration = 'line-through';
            console.log(complateTodoCount++)
        }
        
        elDeleteBtn.addEventListener("click", deleteBtn)
        elCheckbox.addEventListener("click", complateTodo)
        
        
        //Count
        elCountAll.textContent = todoArr.length
        elCountComplate.textContent = complateTodoCount
        elCountUnComp.textContent = todoArr.length - complateTodoCount
        
        
        element.appendChild(cloneTemplate)
    })
}
elForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const inputValue = elInput.value.trim()
    
    const uniqId = todosArr[todosArr.length -1] ? todosArr[todosArr.length -1].id+ 1 : 1;
    
    
    todosArr.push({
        id: todosArr.length,
        title: inputValue,
        isComplate: false
    })
    
    template()
    
    elInput.value = null 
})

renderTodo(todosArr, elList)