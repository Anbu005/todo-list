let form = document.getElementById("todo-form");
let input = document.getElementById("todo-input");
let todoUL = document.getElementById("list-section");
let addBtn = document.getElementById("add-btn");
let clearBtn = document.getElementById("clear-btn");
let todoEdit = "";

//Form submit event
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodos();
});

function addTodos() {
    let inputText = input.value.trim();
    //Input validation
    if (!inputText) {
        alert("Please enter the todo");
        return;
    }

    // Update the todo list
    if (todoEdit) {
        todoEdit.innerHTML = inputText;
        clearForm();
        alert("Todo updated successfully");
        return;
    }

    // Creare li element
    let todoLI = document.createElement("li");

    // Creat div element
    let todoDiv1 = document.createElement("div");
    let todoDiv2 = document.createElement("div");

    // Create checkbox element
    let todoCheck = document.createElement("input");
    todoCheck.type = "checkbox";
    todoCheck.addEventListener("change", (e) => {
        let isChecked = e.target.checked;
        if (isChecked) {
            todoLI.classList.add("checked");
        } else {
            todoLI.classList.remove("checked");
        }
    });
    todoDiv1.appendChild(todoCheck);

    // Create span element
    let todoSpan = document.createElement("span");
    todoSpan.innerHTML = inputText;
    todoDiv1.appendChild(todoSpan);

    // Create edit button
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", (e) => {
        input.value = todoSpan.innerHTML;
        todoEdit = todoSpan;
        addBtn.innerHTML = "Update";
        clearBtn.style.display = "block";
    });
    todoDiv2.appendChild(editBtn);

    // Create edit button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
        todoUL.removeChild(todoLI);
        alert("Todo removed successfully");
    });
    todoDiv2.appendChild(deleteBtn);

    //Append div to li
    todoLI.appendChild(todoDiv1);
    todoLI.appendChild(todoDiv2);

    //Append li to ul
    todoUL.appendChild(todoLI);
    input.value = "";
}

//Change dropdown function
function onSelectType(selected) {
    let value = selected.value;
    let todosLi = document.querySelectorAll("li");
    let noRecord = document.getElementById('no-records');
    let hideCount = 0;
    todosLi.forEach(item => {
        if (value == "completed") {
            if (item.classList.contains("checked")) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
                hideCount++;
                if (todosLi.length == hideCount) {
                    if (noRecord) {
                        noRecord.style.display = "block";
                    }
                }
            }
        } else {
            item.style.display = "flex";
            if (noRecord) {
                noRecord.style.display = "none";
            }
        }
    });
}

//Clear form function
function clearForm() {
    input.value = "";
    todoEdit = "";
    addBtn.innerHTML = "Add";
    clearBtn.style.display = "none";
}