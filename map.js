
TILES = [
       [ 1,  99,  1,  1,  1],
         [ 1,  1,  1,  1],
       [99, 11,  1,  8,  1],
         [ 1,  0,  1,  1],
       [12,  1,  1,  1,  1],
         [12,  1,  1,  1],
       [12, 12,  4, 11,  2],
         [12, 12, 12,  2],
       [17, 12, 12, 12,  1],
         [17, 12, 14,  1],
       [17, 17, 14,  1, 11],
]

function makeMap(parent, tiles) {
    for (var i = 0; i < tiles.length; ++i) {
        var row = tiles[i];
        var d = document.createElement('div');
        d.className = 'row';
        d.style.zIndex = i;
        for (var j = 0; j < row.length; ++j) {
            var index = row[j];
            var xoffset = (index % 4) * 96;
            var yoffset = Math.floor(index / 4) * 64;

            var cell = document.createElement('div');
            cell.className = 'tile';
            cell.style.backgroundPosition = (-xoffset) + "px " + (-yoffset) + "px";

            d.appendChild(cell);
        }
        parent.appendChild(d);
    }
};

makeMap(document.getElementById('map'), TILES);
