
TILES = [
       [ 3,  3,  1,  1,  1,  1,  3,  1,  1,  1],
       [ 3,  1,  1,  1,  1,  1,  1,  1,  1,  1],
       [ 1,  1, 11,  8,  1,  3,  1, 11,  8,  1],
       [ 1,  0,  1,  1,  1,  0,  1,  1,  1,  1],
       [12,  1,  1,  1,  1, 12,  1,  1,  1,  1],
       [12,  1,  1,  1, 12,  1,  1,  1,  1,  1],
       [12, 12,  4, 11,  2, 12,  4, 11,  2,  1],
       [12, 12, 12,  2, 12, 12, 12,  2,  1,  1],
       [17, 12, 12, 12,  1, 17, 12, 12, 12,  1],
       [17, 12, 14,  1, 17, 12, 14,  1, 17,  1],
       [17, 17, 14,  1, 11, 17, 17, 14,  1, 11],
       [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
       [ 3,  1, 11,  8,  1,  3,  1, 11,  8,  1],
       [ 1,  0,  1,  1,  1,  0,  1,  1,  1,  1],
       [12,  1,  1,  1,  1, 12,  1,  1,  1,  1],
       [12,  1,  1,  1, 12,  1,  1,  1,  1,  1],
       [12, 12,  4, 11,  2, 12,  4, 11,  2,  1],
       [12, 12, 12,  2, 12, 12, 12,  2,  1,  1],
       [17, 12, 12, 12,  1, 17, 12, 12, 12,  1],
       [17, 12, 14,  1, 17, 12, 14,  1, 17,  1],
       [17, 17, 14,  1, 11, 17, 17, 14,  1, 11],
];

function makeMap(parent, tiles) {
    var width = tiles[0].length;
    var height = tiles.length;

    var longer = Math.max(width, height);
    var shorter = Math.min(width, height);

    var rowCount = width + height;

    for (var row = 0; row < rowCount; ++row) {
        var rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        rowDiv.style.zIndex = row;
        rowDiv.style.position = 'relative';

        var xOffset = (row < longer
                       ? xOffset = 32 * (longer - row - 1)
                       : xOffset = 32 * (row - longer + 1));
        rowDiv.style.left = xOffset + 'px';

        var y = row;
        var x = 0;
        for (var _ = width + height; _; --_) {
            if (x >= 0 && y >= 0 && y < tiles.length && x < tiles[y].length) {
                var index = tiles[y][x];

                var xoffset = (index % 4) * 96;
                var yoffset = Math.floor(index / 4) * 64;
                var colDiv = document.createElement('div');
                colDiv.className = 'tile';
                colDiv.style.backgroundPosition = (-xoffset) + 'px ' + (-yoffset) + 'px';

                rowDiv.appendChild(colDiv);
            }

            ++x;
            --y;
        }

        parent.appendChild(rowDiv);
    }
}

makeMap(document.getElementById('map'), TILES);
