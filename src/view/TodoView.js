export class TodoView {

    htmlToElement(html) {
        const template = document.createElement("template");
        template.innerHTML = html;
        return template.content.firstElementChild;
    }

    escapeSpecialChars(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    handleUpdate(e, todoList, todoItem) {
        const isChecked = e.target.checked;
        todoList.updateTodo({ id: todoItem.id, completed: isChecked });
    }

    handleDelete(e, todoList, todoItem) {
        e.preventDefault();
        const isYes = window.confirm("本当に削除してもよろしいですか？");
        if(isYes) todoList.deleteTodo({ id: todoItem.id });
    }

    handleEdit(e, todoList, todoItem, todoElement) {
        e.preventDefault();

        const editTodoElement = this.htmlToElement(`<form id="js-edit-form"><input id="js-edit-input" type="text" value="${todoItem.title}"><button class="save">保存</button></form>`);
        todoElement.innerHTML = '';
        todoElement.appendChild(editTodoElement);

        const buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
            if (!button.classList.contains("save")) button.disabled = true;
        });

        const inputEditElement = editTodoElement.querySelector("#js-edit-input");
        const saveButtonElement = editTodoElement.querySelector(".save");
        if (saveButtonElement) {
            document.querySelector("#js-edit-form").addEventListener("submit", (e) => {
                e.preventDefault();
                const escapeValue = this.escapeSpecialChars(inputEditElement.value);
                todoList.editTodo({ id: todoItem.id, title: escapeValue })
                buttons.forEach(button => (button.disabled = false));
            });
        }
    }

    createElement(todoList) {
        const todoListElement = this.htmlToElement`<ul></ul>`;
        const todoItems = todoList.getTodoItems();

        todoItems.forEach(todoItem => {
            let todoItemElement = todoItem.completed
                ? `<li data-id="${todoItem.id}"><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s><button class="edit" disabled>編集</button><button class="delete">削除</button></li>`
                : `<li data-id="${todoItem.id}"><input type="checkbox" class="checkbox">${todoItem.title}<button class="edit">編集</button><button class="delete">削除</button></li>`;

            const todoElement = this.htmlToElement(todoItemElement);
            todoListElement.appendChild(todoElement);

            const inputCheckboxElement = todoElement.querySelector(".checkbox");
            inputCheckboxElement.addEventListener("change", e => this.handleUpdate(e, todoList, todoItem));

            const deleteButtonElement = todoElement.querySelector(".delete");
            deleteButtonElement.addEventListener("click", e => this.handleDelete(e, todoList, todoItem));

            const editButtonElement = todoElement.querySelector(".edit");
            editButtonElement.addEventListener("click", e => this.handleEdit(e, todoList, todoItem, todoElement));

            todoListElement.appendChild(todoElement);
        });

        // ローカルストレージにTodo保存
        localStorage.setItem('Todo', JSON.stringify(todoItems));

        return todoListElement;
    }
}
