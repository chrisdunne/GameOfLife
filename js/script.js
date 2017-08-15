$(document).ready(function () {

    var pause;
    var width = 50;
    var height = 50;
    var grid = [];

    function init() {

        for (var i = 0; i < height; i++) {
            grid.push([]);
            $('table.gol').append('<tr class="' + i + '"></tr>');

            for (var j = 0; j < width; j++) {
                grid[i].push(false);
                $('table.gol tr.' + i).append('<td id="' + i + '-' + j + '" class="cell live-cell"></td>');
            }
        }
    }

    $("body").on("click", "td", function () {

        var xy = this.id.split("-");

        if (grid[xy[0]][xy[1]]) {
            grid[xy[0]][xy[1]] = false;
        } else {
            grid[xy[0]][xy[1]] = true;
        }

        if (this.className.includes("live-cell")) {
            $(this).removeClass("live-cell");
            $(this).addClass("dead-cell");
        } else {
            $(this).removeClass("dead-cell");
            $(this).addClass("live-cell");
        }
    });


    $(".btn-start").click(function () {

        pause = 0;
        Play();

    });

    $('.btn-stop').click(function () {

        pause = 1;

    });

    $('.btn-clear').click(function () {

        pause = 1;
        EmptyGrid();
        init();

    });

    $('.btn-grid-size').click(function () {

        width = $('input.grid-width').val();
        height = $('input.grid-height').val();

        EmptyGrid();
        init();

    });

    function EmptyGrid() {
        grid = [];
        $('table.gol').empty();
    }

    function Play() {

        if(pause) return;

        for (var i = 0; i < grid.length - 1; i++) {

            for (var j = 0; j < grid[i].length - 1; j++) {

                var neighbours = 0;

                // top left
                if(!(i < 1 || j < 1)) neighbours += grid[i - 1][j - 1];

                // top center
                if (!(i < 1)) neighbours += grid[i - 1][j];

                // top right
                if (!(i < 1 || j > height)) neighbours += grid[i - 1][j + 1];

                // middle left
                if (!(j < 1)) neighbours += grid[i][j - 1];

                // middle right
                if (!(j > height)) neighbours += grid[i][j + 1];

                // bottom left
                if (!(i > width || j < 1)) neighbours += grid[i + 1][j - 1];

                // bottom center
                if (!(i > width)) neighbours += grid[i + 1][j];

                // bottom right
                if (!(i > width || j > height)) neighbours += grid[i + 1][j + 1];

                /*
                 * Scenarios:
                 * When dead cell has exactly 3 neighbours change state
                 * When live cell has less than 2 neighbours change state
                 * When live cell has more than 3 neighbours change state 
                 */

                if ((grid[i][j] === false && neighbours === 3) || (grid[i][j] === true && neighbours < 2) || (grid[i][j] === true && neighbours > 3)) {
                    var obj = $('table.gol tr:nth-child(' + (i + 1) + ') td:nth-child(' + (j + 1) + ')');
                    if (obj[0].className.includes("live-cell")) {
                        obj.removeClass("live-cell");
                        obj.addClass("dead-cell");
                    } else {
                        obj.removeClass("dead-cell");
                        obj.addClass("live-cell");
                    }
                }

                if (grid[i][j] === false && neighbours === 3) {
                    grid[i][j] = true;
                }

                if ((grid[i][j] === true && neighbours < 2) || (grid[i][j] === true && neighbours > 3)) {
                    grid[i][j] = false;
                }
            }

        }

        requestAnimationFrame(Play);
    }

    function RandomColour() {
        var values = '0123456789abcdef';
        var colour = '#';
        var i = 0;

        while (i < 6) {
            colour += values[Math.floor(Math.random() * 16)];
            i++;
        } 

        return colour;
    }

    init();
});