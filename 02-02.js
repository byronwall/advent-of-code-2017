var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

var rows = input.split("\n");

console.log(rows);

var sum = 0;

rows.forEach(row => {
  var cols = row.split("\t");

  console.log(cols);

  var nums = cols.map(item => item.trim()).map(parseFloat);

  nums = nums
    .sort((a, b) => {
      return a - b;
    })
    .reverse();

  console.log(nums);

  for (i = 0; i < nums.length - 1; i++) {
    for (j = i + 1; j < nums.length; j++) {
      if (nums[i] % nums[j] == 0) {
        console.log("match at", i, i, nums[i], nums[j], nums[i] / nums[j]);
        sum += nums[i] / nums[j];
      }
    }
  }
});

console.log("sum", sum);
