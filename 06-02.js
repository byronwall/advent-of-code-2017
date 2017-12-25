var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

var values = input.split("\t").map(parseFloat);

//values = [0, 2, 7, 0];

var haveSeen = [hash(values)];

var masterIndex = 0;

while (true) {
  // find the biggest

  var max = -1;
  var maxIndex = 0;

  for (let i = 0; i < values.length; i++) {
    const element = values[i];

    if (element > max) {
      max = element;
      maxIndex = i;
    }
  }

  // found the biggest, spread it out
  var spreadSize = values[maxIndex];

  values[maxIndex] = 0;

  //console.log("before", hash(values));

  for (let j = 1; j <= spreadSize; j++) {
    var index = (maxIndex + j) % values.length;
    values[index]++;
  }

  //console.log("after", hash(values));

  masterIndex++;

  var thisHash = hash(values);
  var hashIndex = haveSeen.indexOf(thisHash);

  if (hashIndex > -1) {
    // repeat value
    throw "result: " + (masterIndex - hashIndex);
  }

  haveSeen.push(thisHash);

  if (masterIndex > 1000000) {
    break;
  }
}

console.log("****no answer");

function hash(arr) {
  return arr.join("-");
}
