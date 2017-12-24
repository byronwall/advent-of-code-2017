var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

var jumpAhead = input.length / 2;

var sum = 0;

for (i = 0; i < input.length; i++) {
  var jumpindex = (i + jumpAhead) % input.length;

  if (input[i] == input[jumpindex]) {
    sum += parseInt(input[i]);
  }
}

console.log("sum:", sum);
