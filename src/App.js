import { TodoList } from "./model/TodoList.js";
import { TodoItem } from "./model/TodoItem.js";
import { TodoView } from "./view/TodoView.js";


export default class App {
    #todoList = new TodoList();
    #todoView = new TodoView();

    static formElement = document.querySelector("#js-form");
    static formInputElement = document.querySelector("#js-form-input");
    static todoItemCountElement = document.querySelector("#js-todo-count");
    static completedTodoItemCountElement = document.querySelector("#js-completedTodo-count");
    static todoListContainerElement = document.querySelector("#js-todo-list-container");

    handleChange() {
        this.constructor.todoListContainerElement.innerHTML = '';
        this.constructor.todoListContainerElement.appendChild(this.#todoView.createElement(this.#todoList));
        this.displayTodoItemCount();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.constructor.formInputElement.value) return;

        const escapeInputValue = this.#todoView.escapeSpecialChars(this.constructor.formInputElement.value);
        let maxId = this.#todoList.getTodoItemCount() ? this.#todoList.getMaxId() : 0;
        const nextId = ++maxId;
        this.#todoList.addTodo(new TodoItem({id: nextId , title: escapeInputValue, completed: false}));
        this.constructor.formInputElement.value = "";
    }

    displayTodoItemCount() {
        this.constructor.todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoList.getTodoItemCount()}`;
        this.constructor.completedTodoItemCountElement.textContent = `完了済み: ${this.#todoList.getCompletedTodoItemCount()} / 未完了: ${this.#todoList.getIncompletedTodoItemCount()}`;
    }

    renderInitialTodoItems() {
        if(this.#todoList.getTodoItemCount()) this.handleChange();
    }

    mount() {
        // 初回レンダリング時
        this.renderInitialTodoItems();
        this.#todoList.addEventListener('change', () => this.handleChange());
        this.constructor.formElement.addEventListener('submit', e => this.handleSubmit(e));
    };

    unmount() {
        this.#todoList.removeEventListener('change', () => this.handleChange());
        this.constructor.formElement.removeEventListener('submit', e => this.handleSubmit(e));
    }
};
