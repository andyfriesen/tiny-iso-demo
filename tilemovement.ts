
import { Input } from "input";
import { Sprite } from 'sprite';
import { TILES } from "map";

export class Actor {
    x:number;
    y:number;
    width:number;
    height:number;
    div:HTMLElement;
    sprite:Sprite;

    constructor(parent:Actor) {
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

    tick() {
    }

    update() {
        this.sprite.move(this.x, this.y);
    }

    traverse<T>(fn: (a:Actor)=>T) {
        return fn(this);
    }

    touches(x:number, y:number, w:number, h:number):boolean {
        var right = this.x + this.width;
        var bottom = this.y + this.height;

        var oright = x + w;
        var obottom = y + h;

        if ((this.x >= oright ||
            this.y >= obottom ||
            x >= right ||
            y >= bottom)
        ) {
            return false;
        } else {
            return true;
        }
    }
}

Actor.prototype.typename = 'Actor';

///

export class ActorCollection extends Actor {
    children:Actor[];

    constructor() {
        super(undefined);
        this.div.className += ' actorcollection';
        this.children = [] as Actor[];
    }

    traverse<T>(fn: (a:Actor)=>T):T {
        for (var i = 0; i < this.children.length; i++) {
            var result = this.children[i].traverse(fn);
            if (!result) {
                return result;
            }
        }
    }

    touches(x:number, y:number, w:number, h:number) {
        return false;
    }

    tick() {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].tick();
        }
    }
}

ActorCollection.prototype.typename = 'ActorCollection';

///

export class RootActor extends ActorCollection {
    update() {
    }
}

///

export class Obstruction extends Actor {
    constructor(x:number, y:number, width:number, height:number) {
        super(undefined);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.div.className += ' obstruction';

        this.update();
    }
}

Obstruction.prototype.typename = 'Obstruction';

///

export class Player extends Actor {
    input:Input;
    root:Actor;

    constructor(input:Input, root:Actor) {
        super(root);
        this.div.className += ' player';

        this.input = input;
        this.root = root;
        this.update();
    }

    tick() {
        const SPEED = 32;
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

        let result:Actor[] = [];
        function touches(node:Actor) {
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
        console.log("Tile pos: ", Math.floor(this.x / SPEED),
                                    Math.floor(this.y / SPEED),
                                    tileX,
                                    tileY);
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
}

Player.prototype.typename = 'Player';

///

export class Engine {
    root:Actor;

    constructor(root:Actor) {
        this.root = root;
    }

    tick() {
        this.root.tick();
    }
}
