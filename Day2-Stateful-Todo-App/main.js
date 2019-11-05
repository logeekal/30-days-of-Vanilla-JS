let newTodoHandler = document.getElementById('newTodo');
let rough = document.getElementsByClassName('rough')[0];
let todoItemsSpace = document.getElementsByClassName('todo-items')[0];
let todoCompletedItemsSpace = document.getElementsByClassName('todo-completed')[0];
let addTodoButton = document.getElementById('addTodo');
let deleteTodoButton = document.getElementById('delTodo');

let state = JSON.parse(localStorage.getItem('todoState'));

console.log(`State Loaded from local storage ${JSON.stringify(state)}`);


function updateState(newState) {
    console.log(`New state is : `)
    console.log(newState);
    state = newState;
    localStorage.setItem('todoState', JSON.stringify(state));
    populateTodoItems()
}


function oneLineTag(tag, options) {
    return Object.assign(document.createElement(tag), options);
}

const todoItem = (id, text, completed) => {
    // if (completed) {
    //     // console.log('Marking completed state wiht strike')
    //     // todoText.classList.add('strike')
    //     return;
    // }
    console.log(`Loading item : ${id}  ${text} ${completed}`)
    let div = oneLineTag('div', {
        class: 'todo-item',
        id: 'todo-item',
        'data-key': id
    });
    div.setAttribute('data-id', id)

    let todoText = oneLineTag('p', {
        id: 'todo-text',
        class: 'todo-text',
        innerText: text
    })


    // let textNode = document.createTextNode(text);
    let deleteButton = oneLineTag('button', {
        class: 'delTodo',
        id: 'delTodo',
        innerText: 'DEL',
    });

    deleteButton.onclick = deleteTodo;

    div.appendChild(todoText);
    div.appendChild(deleteButton);
    return div
}

const completedTodoItem = (id, text, completed) => {
    // if (!completed) {
    //     // console.log('Marking completed state wiht strike')
    //     // todoText.classList.add('strike')
    //     return;
    // }
    console.log(`Loading item : ${id}  ${text} ${completed}`)
    let div = oneLineTag('div', {
        class: 'todo-completed-item',
        id: 'todo-completed-item',
        'data-key': id
    });
    div.setAttribute('data-id', id)

    let todoText = oneLineTag('p', {
        id: 'todo-completed-text',
        class: 'todo-completed-text',
        innerText: text
    })
    todoText.classList.add('strike')


    // let textNode = document.createTextNode(text);
    let deleteButton = oneLineTag('button', {
        class: 'delTodo',
        id: 'delTodoCompleted',
        innerText: 'DEL',
    });

    deleteButton.onclick = deleteTodo;

    div.appendChild(todoText);
    div.appendChild(deleteButton);
    return div
}

function deleteTodo(event) {
    let newState = state;
    let id = event.target.parentElement.getAttribute('data-id');
    console.log(`Deleting todo with Id : ${id} out of items ${JSON.stringify(state.items)}`);
    for (item of newState.items) {
        console.log(item);
        if (item.id.toString() === id.toString()) {
            console.log(`This item will be deleted`)
            item.completed = true;
        }
    }
    updateState(newState);

}


function recordTodo(event) {
    //todoItemsSpace.appendChild(todoItem(event.target.value));
    state.currentItem = event.target.value;
    console.log(`event fired with state value ${JSON.stringify(state)}`);
    updateState(state);
    // rough.innerHTML = event.target.value
}


function addTodo(event) {
    console.log('Adding todo npow.')
    let id = Date.now();

    state.items.push({
        id: id,
        value: state.currentItem,
        completed: false
    })

    todoItemsSpace.appendChild(todoItem(id, state.currentItem, false));
    state.currentItem = '';
    updateState(state);
    newTodoHandler.innerText = state.currentItem;
}


function populateTodoItems() {
    //populate todoItems
    todoItemsSpace.innerHTML = '';
    console.log(state.items)
    state.items.map(item => {
        if (!item.completed) {
            let newNode = todoItem(item.id, item.value, item.completed);
            if (newNode) {
                todoItemsSpace.appendChild(newNode)
            }
        }

    });

    //populated completed Todo Items
    todoCompletedItemsSpace.innerHTML = '';
    console.log(state.items)
    state.items.map(item => {
        if (item.completed) {
            newNode = completedTodoItem(item.id, item.value, item.completed);
            if (newNode) {
                todoCompletedItemsSpace.appendChild(newNode)
            }
        }


    });

    //reset text value
    newTodoHandler.value = state.currentItem;
}

//Always run.
if (!state) {
    console.log('Cannot find any state, initializing to empty one');
    state = {
        items: [],
        currentItem: ''
    };
} else {
    populateTodoItems()
}



newTodoHandler.addEventListener('input', recordTodo, false);
addTodoButton.addEventListener('click', addTodo);
