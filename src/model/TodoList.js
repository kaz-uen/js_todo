import { EventEmitter } from "../EventEmitter.js";

export class TodoList extends EventEmitter {

    #todoItems;
    #completedTodoItems;
    #incompletedTodoItems;

    constructor(todoItems = []) {
        super();
        this.#todoItems = localStorage.getItem('Todo') ? JSON.parse(localStorage.getItem('Todo')) : todoItems;
    }

    addTodo(todoItem) {
        // タイトルが全角スペース、半角スペース、空文字にマッチする場合は追加しない
        if( (/^[\s　]*$/).test(todoItem.title) ) {
            return;
        }
        this.#todoItems.push(todoItem);
        this.dispatchEvent();
    }

    updateTodo({ id, completed }) {
        const todoItem = this.#todoItems.find(todoItem => todoItem.id === id);
        if(!todoItem) return;
        todoItem.completed = completed;
        this.dispatchEvent();
    }

    editTodo({ id, title }) {
        const todoItem = this.#todoItems.find(todo => todo.id === id);
        if (!todoItem) return;
        todoItem.title = title;
        this.dispatchEvent();
    }

    deleteTodo({ id }) {
        this.#todoItems = this.#todoItems.filter(todoItem => todoItem.id !== id);
        this.dispatchEvent();
    }

    getTodoItems() {
        return this.#todoItems;
    }

    getTodoItemCount() {
        return this.#todoItems.length;
    }

    getCompletedTodoItemCount() {
        this.#completedTodoItems = this.#todoItems.filter(todoItem => todoItem.completed === true);
        return this.#completedTodoItems.length;
    }

    getIncompletedTodoItemCount() {
        this.#incompletedTodoItems = this.#todoItems.filter(todoItem => todoItem.completed === false);
        return this.#incompletedTodoItems.length;
    }

    getMaxId() {
        let todoIds = [];
        this.#todoItems.forEach(todoItem => todoIds.push(todoItem.id));
        return Math.max(...todoIds);
    }

}
