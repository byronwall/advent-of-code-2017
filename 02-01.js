var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

var rows = input.split("\n");

console.log(rows);

var sum = 0;

rows.forEach(row => {
  var cols = row.split("\t");

  console.log(cols);

  var nums = cols.map(item => item.trim()).map(parseFloat);

  console.log(nums);

  var max = Math.max.apply(null, nums);
  var min = Math.min.apply(null,nums);

  console.log("vals", max, min, max - min);

  sum += max - min;
});

console.log("sum", sum);
