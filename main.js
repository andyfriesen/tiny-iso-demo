
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
        this.keyState[kc] = true;
    }
};

Input.prototype.onKeyUp = function(evt) {
    var kc = evt.keyCode;
    if (this.keyState.hasOwnProperty(kc)) {
        this.keyState[kc] = false;
    }
};

Input.prototype.left = function() { return this.keyState[this.K_LEFT]; }
Input.prototype.right = function() { return this.keyState[this.K_RIGHT]; }
Input.prototype.up = function() { return this.keyState[this.K_UP]; }
Input.prototype.down = function() { return this.keyState[this.K_DOWN]; }

///

function Actor() {
    this.x = 0;
    this.y = 0;

    this.div = document.createElement('div');
    this.div.className = 'actor';
    document.body.appendChild(this.div);
}

Actor.prototype = {};

Actor.prototype.tick = function() {
};

Actor.prototype.update = function() {
    this.div.style['left'] = this.x;
    this.div.style['top'] = this.y;
}

///

function Player(input) {
    Actor.call(this);

    this.input = input;
}

Player.prototype.__proto__ = Actor.prototype;

Player.prototype.tick = function() {
    if (this.input.up()) {
        this.y -= 1;
    }
    if (this.input.down()) {
        this.y += 1;
    }
    if (this.input.left()) {
        this.x -= 1;
    }
    if (this.input.right()) {
        this.x += 1;
    }

    this.update();
}

///

function Engine() {
    this.entities = [];
}

Engine.prototype = {};

Engine.prototype.tick = function() {
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].tick();
    }
};

///

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

var input = new Input();
var e = new Engine();

var p = new Player(input);

e.entities.push(p);

setInterval(bind(e, e.tick), 1 / 30.0);
