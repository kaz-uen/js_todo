export class TodoItem {
    id;
    title;
    completed;

    constructor({id, title, completed = false}) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
