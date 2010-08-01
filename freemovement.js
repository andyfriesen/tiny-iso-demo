function Actor() {
    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 32;

    this.div = document.createElement('div');
    this.div.className = 'actor';
    document.body.appendChild(this.div);
}

Actor.prototype = {};

Actor.prototype.typename = 'Actor';

Actor.prototype.tick = function() {
};

Actor.prototype.update = function() {
    this.div.style['left'] = this.x;
    this.div.style['top'] = this.y;
    this.div.style['width'] = this.width;
    this.div.style['height'] = this.height;
    this.div.style.zIndex = Math.floor((this.y - 8) / 17);
};

Actor.prototype.traverse = function(fn) {
    return fn(this);
}

Actor.prototype.touches = function(x, y, w, h) {
    var right = this.x + this.width;
    var bottom = this.y + this.height;

    var oright = x + w;
    var obottom = y + h;

    var result;
    if ((this.x >= oright ||
         this.y >= obottom ||
         x >= right ||
         y >= bottom)
    ) {
        return false;
    } else {
        return true;
    }
};

///

function ActorCollection() {
    Actor.call(this);

    this.div.className += ' actorcollection';

    this.children = [];
}

subclass(Actor, ActorCollection);

ActorCollection.prototype.typename = 'ActorCollection';

ActorCollection.prototype.traverse = function(fn) {
    for (var i = 0; i < this.children.length; i++) {
        var result = this.children[i].traverse(fn);
        if (!result) {
            return result;
        }
    }
};

ActorCollection.prototype.touches = function(x, y, w, h) {
    return false;
};

ActorCollection.prototype.tick = function() {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].tick();
    }
};

///

function Obstruction(x, y, width, height) {
    Actor.call(this);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.div.className += ' obstruction';

    this.update();
}

subclass(Actor, Obstruction);
Obstruction.prototype.typename = 'Obstruction';

///

function Player(input, root) {
    Actor.call(this);

    this.div.className += ' player';

    this.input = input;
    this.root = root;
    this.update();
}

subclass(Actor, Player);
Player.prototype.typename = 'Player';

Player.prototype.tick = function() {
    var px = this.x;
    var py = this.y;

    if (this.input.up()) {
        py -= 1;
    }
    if (this.input.down()) {
        py += 1;
    }
    if (this.input.left()) {
        px -= 1;
    }
    if (this.input.right()) {
        px += 1;
    }

    var result = [];
    function touches(node) {
        if (node != this && node.touches(px, py, this.width, this.height)) {
            result.push(node);
        }
        return true;
    }

    if (px != this.x || py != this.y) {
        this.root.traverse(bind(this, touches));

        if (result.length == 0) {
            this.x = px;
            this.y = py;
            this.update();
        }
    }
}

///

function Engine(root) {
    this.root = root;
}

Engine.prototype = {};

Engine.prototype.tick = function() {
    this.root.tick();
};

///

var input = new Input();
var r = new ActorCollection();
var e = new Engine(r);

var p = new Player(input, r);
var o = new Obstruction(16, 256, 192, 16);

r.children.push(p);
r.children.push(o);

setInterval(bind(e, e.tick), 1 / 30.0);
