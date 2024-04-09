export class EventEmitter {
    #events = new Map();

    addEventListener(type, listener) {
        if(!this.#events.has(type)) this.#events.set(type, listener);
        this.#events.get(type);
    }

    removeEventListener(type, listener) {
        const events = this.#events.get(type);
        if(!events) return;
        events.forEach(event => {
            if(event === listener) events.delete(listener);
        });
    }

    dispatchEvent() {
        if(!this.#events) return;
        this.#events.forEach(event => {
            event.call(this);
        })
    }
}
