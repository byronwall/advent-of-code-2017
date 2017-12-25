var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

var lines = input.split("\n").map(parseFloat);

console.log(lines);

var instruction = 0;
var index = 0;

while (true) {
  if (instruction >= lines.length) {
    throw "result: " + index;
  }
  var offset = lines[instruction];
  if (offset >= 3) {
    lines[instruction]--;
  } else {
    lines[instruction]++;
  }

  instruction += offset;

  if (index++ > 100000000) {
    break;
  }
}

console.log("noo answeR?");
