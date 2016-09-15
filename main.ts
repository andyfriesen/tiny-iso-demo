function subclass(Base, Derived) {
    function F() { }
    F.prototype = Base.prototype;
    Derived.prototype = new F();
}

//////

class Input {
    constructor() {
        this.K_UP = 38;
        this.K_DOWN = 40;
        this.K_LEFT = 37;
        this.K_RIGHT = 39;

        this.keyState = {};
        this.keyState[this.K_UP] = false;
        this.keyState[this.K_DOWN] = false;
        this.keyState[this.K_LEFT] = false;
        this.keyState[this.K_RIGHT] = false;

        document.addEventListener('keydown', (evt) => this.onKeyDown(evt), false);
        document.addEventListener('keyup', (evt) => this.onKeyUp(evt), false);
    }

    onKeyDown(evt) {
        var kc = evt.keyCode;
        if (this.keyState.hasOwnProperty(kc)) {
            evt.preventDefault();
            this.keyState[kc] = true;
        }
    };

    onKeyUp(evt) {
        var kc = evt.keyCode;
        if (this.keyState.hasOwnProperty(kc)) {
            this.keyState[kc] = false;
        }
    };

    get(code) {
        var result = this.keyState[code];
        this.keyState[code] = false;
        return result;
    };

    left() { return this.get(this.K_LEFT); };
    right() { return this.get(this.K_RIGHT); };
    up() { return this.get(this.K_UP); };
    down() { return this.get(this.K_DOWN); };
}