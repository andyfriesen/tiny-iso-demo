
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

function Sprite(div, x, y, width, height) {
    this.div = div;
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
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
    return [this.x - this.y,
            this.y / 2 + this.x / 2];
}

function getTilePos(x, y) {
    return [x, y];
}

function ASSERT(f, a, b, result) {
    var actual = f(a, b);
    if (actual.toSource() != result.toSource()) {
        console.log("FAIL: " + {f:f.name, a:a, b:b, expected:result, actual:actual}.toSource());
    }
}

Sprite.prototype.getTilePos = function() {
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

Sprite.prototype.update = function() {
    this.getTilePos();

    var p = this.getScreenPos();
    this.div.style.left = p[0] + this.width / 2;
    this.div.style.top = p[1] + this.height / 2;
    this.div.style.width = this.width;
    this.div.style.height = this.height;
    this.div.style.zIndex = 9999;//Math.floor(y / 16);
}
