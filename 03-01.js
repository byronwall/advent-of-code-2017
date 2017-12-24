var input = document.getElementsByClassName("puzzle-input")[0].innerHTML.trim();
var num = parseInt(input);

var num_rt = Math.sqrt(num);

var corner_index = Math.floor(num_rt);

console.log(num, num_rt, corner_index);

var index = 3;

while (input > index ** 2) {
  index += 2;

  if (index > 10000) {
    break;
  }
}

// index is now the lower right corner

var indexVal = index ** 2;

var step = (index - 1) / 2;

var totalMoves = indexVal - num;

console.log(indexVal, step, totalMoves);

// numbers of halves to reach point

var iters = totalMoves / step;

console.log(iters);

var iter = Math.floor(iters);

if (iter % 2 == 0) {
  console.log("even dist");
  var stepDelta = totalMoves - step * iter;

  console.log("step delta");

  var result = index - 1 - stepDelta;

  console.log("answer", result);
}
