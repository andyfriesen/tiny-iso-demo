
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
     this.K_UP = 38;
     this.K_DOWN = 40;
     this.K_LEFT = 37;
     this.K_RIGHT = 39;

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
    this.keyState[code] = false;
    return result;
};

Input.prototype.left = function() { return this.get(this.K_LEFT); };
Input.prototype.right = function() { return this.get(this.K_RIGHT); };
Input.prototype.up = function() { return this.get(this.K_UP); };
Input.prototype.down = function() { return this.get(this.K_DOWN); };
