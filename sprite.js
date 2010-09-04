function tileToScreen(x, y) {
    var sx = x * 64 + 8 + 16;
    var sy = y * 16 + 16;

    if (y & 1) {
        sx += 32;
    }

    return [sx, sy];
}

function up(x, y) {
    var p = [x, y - 1];
    if (!(y & 1)) {
        p[0] -= 1;
    }
    return p;
}

function down(x, y) {
    var p = [x, y + 1];
    if (y & 1) {
        p[0] += 1;
    }
    return p;
}

function left(x, y) {
    var p = [x, y + 1];
    if (!(y & 1)) {
        p[0] -= 1;
    }
    return p;
}

function right(x, y) {
    var p = [x, y - 1];
    if (y & 1) {
        p[0] += 1;
    }
    return p;
}

function Sprite(div, x, y) {
    this.div = div;
    this.x = x || 0;
    this.y = y || 0;
}

Sprite.prototype.DOWN = 'DOWN';
Sprite.prototype.UP = 'UP';
Sprite.prototype.LEFT = 'LEFT';
Sprite.prototype.RIGHT = 'RIGHT';

Sprite.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
    this.update();
}

var marker = document.createElement('div');
marker.id = 'marker';
marker.style.position = 'absolute';
marker.style.left = 400;
marker.style.top = 160;
marker.style.width = 16;
marker.style.height = 16;
marker.style.zIndex = 998;
marker.style.backgroundColor = 'rgb(255, 0,0)';
document.body.appendChild(marker);
var oldX = 0;
var oldY = 0;

Sprite.prototype.getScreenPos = function() {
    return [this.y + this.x,
            -this.x / 2 + this.y / 2];
}

function getTilePos(x, y) {
    var tileX = Math.floor(y / 2);
    var tileY = y;

    tileY -= x;
    tileX += Math.floor(x / 2);

    return [tileX, tileY];
}

function ASSERT(f, a, b, result) {
    var actual = f(a, b);
    if (actual.toSource() != result.toSource()) {
        console.log("FAIL: " + {f:f.name, a:a, b:b, expected:result, actual:actual}.toSource());
    }
}

ASSERT(getTilePos, 0, -1, [-1, -1]);
ASSERT(getTilePos, 0,  0, [ 0,  0]);
ASSERT(getTilePos, 0,  1, [ 0,  1]);
ASSERT(getTilePos, 0,  2, [ 1,  2]);
ASSERT(getTilePos, 0,  3, [ 1,  3]);
ASSERT(getTilePos, 0,  4, [ 2,  4]);
ASSERT(getTilePos, 0,  5, [ 2,  5]);

ASSERT(getTilePos, 1, -1, [ 0, -1]);
ASSERT(getTilePos, 1,  0, [ 0,  0]);
ASSERT(getTilePos, 1,  1, [ 1,  0]);
ASSERT(getTilePos, 2,  2, [ 2,  0]);
ASSERT(getTilePos, 3,  3, [ 3,  0]);
ASSERT(getTilePos, 4,  4, [ 4,  0]);

/*ASSERT(getTilePos, 1,  0, [ 0,  0]);
ASSERT(getTilePos, 1,  2, [ 1,  2]);
ASSERT(getTilePos, 1,  3, [ 1,  3]);
ASSERT(getTilePos, 1,  4, [ 2,  4]);
ASSERT(getTilePos, 1,  5, [ 2,  5]);*/

Sprite.prototype.getTilePos = function() {
    var x = Math.floor(this.x / 32);
    var y = Math.floor(this.y / 32);

    var tp = getTilePos(x, y);

    var stx = tileToScreen(tp[0], tp[1]);

    if (oldX != stx[0] || oldY != stx[1]) {
        oldX = stx[0];
        oldY = stx[1];

        console.log([[x, y], tp].toSource());
    }

    marker.style.left = stx[0] + 8;
    marker.style.top = stx[1] + 22;
}

Sprite.prototype.update = function() {
    this.getTilePos();

    var p = this.getScreenPos();
    this.div.style['left'] = p[0];
    this.div.style['top'] = p[1];
    this.div.style['width'] = this.width;
    this.div.style['height'] = this.height;
    this.div.style.zIndex = 9999;//Math.floor(y / 16);
}
