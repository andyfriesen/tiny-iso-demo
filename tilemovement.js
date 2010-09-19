function Actor(parent) {
    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 32;

    this.div = document.createElement('div');
    this.div.className = 'actor';

    this.sprite = new Sprite(this.div, this.x, this.y, this.width, this.height);

    var parentDiv = (typeof parent == 'undefined'
                     ? document.body
                     : parent.sprite.div);
    parentDiv.appendChild(this.div);
}

Actor.prototype = {};

Actor.prototype.typename = 'Actor';

Actor.prototype.tick = function() {
};

Actor.prototype.update = function() {
    this.sprite.move(this.x, this.y);
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

function RootActor() {
    ActorCollection.call(this);
}

subclass(ActorCollection, RootActor);

RootActor.prototype.update = function() {
}

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
    Actor.call(this, root);

    this.div.className += ' player';

    this.input = input;
    this.root = root;
    this.update();
}

subclass(Actor, Player);
Player.prototype.typename = 'Player';

Player.prototype.tick = function() {
    SPEED = 32;
    var px = this.x;
    var py = this.y;
    if (this.input.up()) {
        py -= SPEED;
    } else if (this.input.down()) {
        py += SPEED;
    } else if (this.input.left()) {
        px -= SPEED;
    } else if (this.input.right()) {
        px += SPEED;
    }

    var result = [];
    function touches(node) {
        if (node != this && node.touches(px, py, this.width, this.height)) {
            result.push(node);
        }
        return true;
    }

    if (px == this.x && py == this.y) {
        return;
    }

    var tileX = Math.floor(px / SPEED);
    var tileY = Math.floor(py / SPEED);
    console.log("Tile pos: " + [Math.floor(this.x / SPEED),
                                Math.floor(this.y / SPEED),
                                tileX,
                                tileY].toSource());
    if ((tileX < 0 ||
         tileY < 0 ||
         tileY >= TILES.length ||
         tileX >= TILES[tileY].length)
    ) {
        return;
    }

    if ((3 == (TILES[tileY][tileX] & 3))) {
        return;
    }

    this.x = px;
    this.y = py;
    this.update();
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

var map = new Map(document.getElementById('map'), TILES);

var input = new Input();
var r = new RootActor();
var e = new Engine(r);

var p = new Player(input, r);

var origin = map.getScreenOrigin();
r.children.push(p);
r.div.style.left = origin[0] + 'px';
r.div.style.top = origin[1] + 'px';
r.update();
delete origin;

setInterval(bind(e, e.tick), 1 / 30.0);
