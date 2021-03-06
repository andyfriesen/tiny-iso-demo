
import { map, input } from "engine";

type Point = number[];

function up(x:number, y:number) {
    var p = [x, y - 1];
    if (!(y & 1)) {
        p[0] -= 1;
    }
    return p;
}

function down(x:number, y:number):Point {
    var p = [x, y + 1];
    if (y & 1) {
        p[0] += 1;
    }
    return p;
}

function left(x:number, y:number):Point {
    var p = [x, y + 1];
    if (!(y & 1)) {
        p[0] -= 1;
    }
    return p;
}

function right(x:number, y:number):Point {
    var p = [x, y - 1];
    if (y & 1) {
        p[0] += 1;
    }
    return p;
}

export class Sprite {
    div:HTMLDivElement;
    x:number;
    y:number;
    width:number;
    height:number;

    constructor(div:HTMLDivElement, x:number, y:number, width:number, height:number) {
        this.div = div;
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    }

    move(x:number, y:number) {
        this.x = x;
        this.y = y;
        this.update();
    }

    getScreenPos():Point {
        return [this.x - this.y,
                this.y / 2 + this.x / 2];
    }

    getTilePos() {
        var x = Math.round(this.x / 32);
        var y = Math.round(this.y / 32);

        var tp = getTilePos(x, y);

        var stx = map.tileToScreen(tp[0], tp[1]);

        if (oldX != stx[0] || oldY != stx[1]) {
            oldX = stx[0];
            oldY = stx[1];
        }

        marker.style.left = stx[0] + 32;
        marker.style.top = stx[1] + 16;
    }

    update() {
        this.getTilePos();

        var p = this.getScreenPos();
        this.div.style.left = (p[0] + this.width / 2).toString();
        this.div.style.top = (p[1] + this.height / 2).toString();
        this.div.style.width = this.width.toString();
        this.div.style.height = this.height.toString();
        this.div.style.zIndex = '9999';//Math.floor(y / 16);
    }
}

var marker = document.createElement('div');
marker.id = 'marker';
marker.style.position = 'absolute';
marker.style.left = '400';
marker.style.top = '160';
marker.style.width = '16';
marker.style.height = '16';
marker.style.zIndex = '998';
marker.style.backgroundColor = 'rgb(255, 0,0)';
document.body.appendChild(marker);
var oldX = 0;
var oldY = 0;

function getTilePos(x:number, y:number):Point {
    return [x, y];
}
