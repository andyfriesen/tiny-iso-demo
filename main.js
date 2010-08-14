
function bind() {
    var boundArgv = Array.prototype.slice.call(arguments, 0);
    var self = boundArgv.shift();
    var fn = boundArgv.shift();

    function boundFn() {
        var args = Array.prototype.slice.call(arguments, 0);

        return fn.apply(self, boundArgv.concat(args));
    }

    return boundFn;
}

function subclass(Base, Derived) {
    function F() { }
    F.prototype = Base.prototype;
    Derived.prototype = new F();
}

//////

function Input() {
    this.K_UP = KeyboardEvent.DOM_VK_UP;
    this.K_DOWN = KeyboardEvent.DOM_VK_DOWN;
    this.K_LEFT = KeyboardEvent.DOM_VK_LEFT;
    this.K_RIGHT = KeyboardEvent.DOM_VK_RIGHT;

    this.keyState = {};
    this.keyState[this.K_UP] = false;
    this.keyState[this.K_DOWN] = false;
    this.keyState[this.K_LEFT] = false;
    this.keyState[this.K_RIGHT] = false;

    document.addEventListener('keydown', bind(this, this.onKeyDown), false);
    document.addEventListener('keyup', bind(this, this.onKeyUp), false);
}

Input.prototype = {};

Input.prototype.onKeyDown = function(evt) {
    var kc = evt.keyCode;
    if (this.keyState.hasOwnProperty(kc)) {
        evt.preventDefault();
        this.keyState[kc] = true;
    }
};

Input.prototype.onKeyUp = function(evt) {
    var kc = evt.keyCode;
    if (this.keyState.hasOwnProperty(kc)) {
        this.keyState[kc] = false;
    }
};

Input.prototype.get = function(code) {
    var result = this.keyState[code];
    //this.keyState[code] = false;
    return result;
};

Input.prototype.left = function() { return this.get(this.K_LEFT); };
Input.prototype.right = function() { return this.get(this.K_RIGHT); };
Input.prototype.up = function() { return this.get(this.K_UP); };
Input.prototype.down = function() { return this.get(this.K_DOWN); };
