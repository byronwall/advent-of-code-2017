var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

var lines = input.split("\n");
var sum = 0;
lines.forEach(line => {
  var words = line.split(" ");

  words.sort();

  var isGood = true;
  for (i = 1; i < words.length; i++) {
    if (words[i] == words[i - 1]) {
      isGood = false;
    }
  }
  if (isGood) {
    sum += 1;
  }
});

console.log("result", sum);
