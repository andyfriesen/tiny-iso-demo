
export class Input {
    static K_UP = 38;
    static K_LEFT = 37;
    static K_RIGHT = 39;
    static K_DOWN = 40;

    keyState:any;
    
    constructor() {
        this.keyState = {};
        this.keyState[Input.K_UP] = false;
        this.keyState[Input.K_DOWN] = false;
        this.keyState[Input.K_LEFT] = false;
        this.keyState[Input.K_RIGHT] = false;

        document.addEventListener('keydown', (evt) => this.onKeyDown(evt), false);
        document.addEventListener('keyup', (evt) => this.onKeyUp(evt), false);
    }

    onKeyDown(evt:KeyboardEvent) {
        var kc = evt.keyCode;
        if (this.keyState.hasOwnProperty(kc)) {
            evt.preventDefault();
            this.keyState[kc] = true;
        }
    };

    onKeyUp(evt:KeyboardEvent) {
        var kc = evt.keyCode;
        if (this.keyState.hasOwnProperty(kc)) {
            this.keyState[kc] = false;
        }
    };

    get(code:number) {
        var result = this.keyState[code];
        this.keyState[code] = false;
        return result;
    };

    left() { return this.get(Input.K_LEFT); };
    right() { return this.get(Input.K_RIGHT); };
    up() { return this.get(Input.K_UP); };
    down() { return this.get(Input.K_DOWN); };
}
