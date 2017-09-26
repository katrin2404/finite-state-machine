class FSM {
    constructor(config) {
        if (!config || !config.states || !config.initial) {
            throw new Error('No Config');
        }
        this.states = config.states;
        this.initial = config.initial;
        this.position = 0;
        this.history = {
            '-1': config.initial,
        };
        this.state = config.initial;
    }

    reset() {
        this.changeState(this.initial);
    }

    getState() {
        return this.state;
    }

    getStates(event) {
        if (event) {
            return Object.keys(this.states).filter(state => this.states[state].transitions[event] !== undefined);
        }
        return Object.keys(this.states);
    }

    changeState(newState) {
        if (this.states[newState]) {
            this.state = newState;
            this.history[this.position++] = newState;
        } else {
            throw new Error('unknown state');
        }
    }

    trigger(action) {
        if (this.states[this.state].transitions[action]) {
            this.changeState(this.states[this.state].transitions[action]);
        } else {
            throw new Error('unnoun action');
        }
    }

    undo() {
        if (this.position > 0) {
            this.state = this.history[--this.position - 1];
            return true;
        } else {
            return false;
        }
    }

    redo() {
        if (this.history[this.position]) {
            this.state = this.history[this.position++];
            return true;
        } else {
            return false;
        }
    }

    clearHistory() {
        this.position = 0;
        this.history = {
            '-1': this.initial,
        };
    }

}

module.exports = FSM;
