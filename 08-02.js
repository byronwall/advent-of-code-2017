var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

// get lines

var lines = input.split("\n");

var registers = {};

ops = {};

var maxMax = Number.NEGATIVE_INFINITY;

lines.forEach(line => {
  var parts = line.split("if").map(part => part.trim());

  var step = parts[0];
  var cond = parts[1];

  // process the step

  var stepPieces = step.split(" ");
  var register = stepPieces[0];
  var dir = stepPieces[1];
  var amount = (dir === "inc" ? 1 : -1) * parseFloat(stepPieces[2]);

  //console.log("increase", register, amount);

  // process condition

  var condPieces = cond.split(" ");
  var condReg = condPieces[0];
  var condOp = condPieces[1];
  var condAmt = parseFloat(condPieces[2]);

  ops[condOp] = true;

  if (testCommand(condReg, condOp, condAmt)) {
    if (registers[register] === undefined) {
      registers[register] = 0;
    }

    registers[register] += amount;

    // get new max
    var thisMax = getMaxVal();
    if (thisMax > maxMax) {
      maxMax = thisMax;
    }
  }

  //console.log("cond", condReg, condOp, condAmt);
});

throw "maxMax: " + maxMax;

function getMaxVal() {
  // run through registers and find the max
  var maxVal = Number.NEGATIVE_INFINITY;

  Object.keys(registers).forEach(registerName => {
    var register = registers[registerName];
    if (register > maxVal) {
      maxVal = register;
    }
  });
  return maxVal;
}

function testCommand(register, op, value) {
  if (registers[register] === undefined) {
    registers[register] = 0;
  }

  var regValue = registers[register];

  switch (op) {
    case "&gt;":
      return regValue > value;
      break;
    case "&lt;":
      return regValue < value;
      break;
    case "&gt;=":
      return regValue >= value;
      break;
    case "&lt;=":
      return regValue <= value;
      break;
    case "==":
      return regValue == value;
      break;
    case "!=":
      return regValue != value;
      break;
  }
}
