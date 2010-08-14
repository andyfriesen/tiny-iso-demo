function tileToScreen(x, y) {
    var sx = x * 64 + 8 + 16;
    var sy = y * 17 + 16;

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

Sprite.prototype.update = function() {
    //var t = tileToScreen(this.x, this.y);

    var x = this.x - this.y;
    var y = this.x / 2 + this.y / 2;

    this.div.style['left'] = x;
    this.div.style['top'] = y;
    this.div.style['width'] = this.width;
    this.div.style['height'] = this.height;
    this.div.style.zIndex = 9999;//Math.floor(y / 17);
}
