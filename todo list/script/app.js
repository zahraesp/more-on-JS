const todoList = [];

class Todo {
    constructor(item){
        this.ulElement =item;
    } 

    add() {
        const todoInput = document.querySelector("#userInput").value;
        if (todoInput == "") {
            alert("You didn't enter any item!");
        }
        else {
            const todoObject = {
                id : todoList.length,
                todoText : todoInput,
                isDone : false,
            }
            console.log("ADD");

        todoList.push(todoObject);
        this.display();
        document.querySelector("#userInput").value = '';
        }
    }

    done_undone(projectId) {
        const selectedItemIndex = todoList.findIndex((item)=> item.id == projectId);
        let selectedItem = todoList[selectedItemIndex] ;
        !!selectedItem.isDone ? selectedItem.isDone = false : selectedItem.isDone = true;
        this.display();
    }

    deleteItem(projectId) {
        const deleteitemIndex = todoList.findIndex((item)=> item.id == projectId);
        todoList.splice(deleteitemIndex, 1);
        this.display();
    }

    display() {
        this.ulElement.innerHTML = "";
        for (const todoItem of todoList) {
            
            const liElement = document.createElement("li");
            const deleteBtn = document.createElement("i");
            
            const checked = !!todoItem.isDone ? "checked" : null ;
            
            if (todoItem.isDone) {
                liElement.classList.add("checked");
            }

            liElement.innerHTML = `<input type="checkbox" name="" class="checkbox" ${checked}>
                                   ${todoItem.todoText} `;

            liElement.setAttribute("data-id", todoItem.id);

            const checkbox = liElement.querySelector(".checkbox");
            checkbox.setAttribute("data-id", todoItem.id);


            deleteBtn.setAttribute("data-id", todoItem.id);
            deleteBtn.classList.add("far", "fa-trash-alt");

            liElement.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", event=> {
                const deleteId = event.target.getAttribute("data-id");
                todo.deleteItem(deleteId);
            });

            checkbox.addEventListener("click", event=> { 
                const selectedId = event.target.getAttribute("data-id");
                todo.done_undone(selectedId); 

            });

           
            this.ulElement.appendChild(liElement);
        }
    }
} 

const listSection = document.querySelector("#project__list");

todo = new Todo(listSection);

document.querySelector(".addBtn").addEventListener("click", function() {
    todo.add()
})

document.querySelector("#userInput").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        todo.add()
    }
})




