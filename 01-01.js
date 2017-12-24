var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

var firstItem = input[0];

var prevItem;
var sum = 0;

input.split("").forEach((item, index) => {
  if (item === prevItem) {
    sum += parseInt(item);
    console.log("match", prevItem, item, index);
  }

  prevItem = item;
});

console.log("final match?", prevItem, firstItem);

if (prevItem == firstItem) {
  console.log("final match", prevItem);
  sum += parseInt(firstItem);
}

console.log("sum", sum);
