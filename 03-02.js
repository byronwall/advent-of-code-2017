var input = document.getElementsByClassName("puzzle-input")[0].innerHTML.trim();
var num = parseInt(input);

// build the 3x3 start of the grid

var grid = {};

grid[0] = {};

grid[0][0] = 1;
grid[0][1] = 1;

grid[1] = {};
grid[1][1] = 2;
grid[1][0] = 4;
grid[1][-1] = 5;

grid[0][-1] = 10;

grid[-1] = {};

grid[-1][-1] = 11;
grid[-1][0] = 23;
grid[-1][1] = 25;

// this is the main loop to add numbers
var index = 2;
var stepSize = 3;
var rowStart = -1;
var colStart = 2;
var isDone = false;

while (true) {
  var directions = [[1, 0], [0, -1], [-1, 0], [0, 1]];

  addCellAt(rowStart, colStart);

  var isFirst = true;

  directions.forEach(direction => {
    for (k = 0; k < stepSize; k++) {
      rowStart += direction[0];
      colStart += direction[1];

      var newNum = addCellAt(rowStart, colStart);

      if (newNum > input) {
        printGrid(index + 1);
        console.log("result", newNum);

        throw "done";
      }
    }
    if (isFirst) {
      stepSize++;
    }
    isFirst = false;
  });

  colStart++;
  stepSize++;

  index++;

  printGrid(index);

  if (index > 6) {
    break;
  }
}

function printGrid(squareSize) {
  var output = "";
  for (i = squareSize; i >= -squareSize; i--) {
    for (j = -squareSize; j <= squareSize; j++) {
      if (grid[i] !== undefined) {
        if (grid[i][j] !== undefined) {
          output += grid[i][j];
        }
      }
      output += "\t";
    }
    output += "\n";
  }

  console.log(output);
}

function addCellAt(row, col) {
  if (grid[row] === undefined) {
    grid[row] = {};
  }

  var newNum = getSum(row, col);

  grid[row][col] = newNum;

  return newNum;
}

function getSum(row, col) {
  var testDelta = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1]
  ];

  var sum = 0;

  testDelta.forEach(test => {
    var rowTest = row + test[0];
    var colTest = col + test[1];

    if (grid[rowTest] !== undefined) {
      if (grid[rowTest][colTest] !== undefined) {
        sum += grid[rowTest][colTest];
      }
    }
  });

  return sum;
}
