var input = document.getElementsByTagName("pre")[0].innerHTML.trim();

input = input.replace(/&gt;/g, ">");
input = input.replace(/&lt;/g, "<");

// input = "{{<!>},{<!>},{<!>},{<a>}}";
//input = "{{<a>},{<a>},{<a>},{<a>}}";
// input = "{{{},{},{{}}}}";
//input = '{<{o"i!a,<{i<a>}';
console.log(input);

var result = parseGroup(input);
var score = scoreGroups(result.groups);
var garbage = countGarbageChar(result.groups);

console.log("final groups", score, garbage, result.groups);

var loop = 0;

function parseGroup(strInput) {
  // will take a string and parse out group
  //console.log("parsing... ", strInput);
  var offset = 0;

  // will be made of sub groups
  var groups = [];

  var shouldIgnoreNextGarbage = false;
  var isInGarbage = false;

  var garbageOffsetStart = 0;
  var groupStart = 0;

  while (true) {
    if (loop++ > 100000) {
      throw "need to stop this madness";
    }
    // console.log("start of loop", offset, strInput[offset]);

    if (offset >= strInput.length) {
      //reached the end, need to
      break;
    }

    if (shouldIgnoreNextGarbage) {
      shouldIgnoreNextGarbage = false;
      offset++;
      continue;
    }

    // the next ones are mutually exclusive

    if (strInput[offset] == "{") {
      if (!isInGarbage) {
        // console.log("found sub group");
        // end previous group

        // start a new group
        var subgroups = parseGroup(
          strInput.substr(offset + 1, strInput.length)
        );

        var nextOffset = subgroups.offset + 2;
        offset += nextOffset;

        groupStart = offset;

        // console.log(subgroups, "new offset", offset, "parsing", strInput);

        groups.push(subgroups.groups);

        continue;
      }
    }

    if (strInput[offset] == "}") {
      // end current group
      if (!isInGarbage) {
        // console.log("group ending", offset);
        var group = strInput.slice(groupStart, offset + 1);

        if (group != "}") {
          groups.push(group);
        }

        // send result out
        break;
      }
    }

    if (strInput[offset] == "<") {
      // start garbage
      if (!isInGarbage) {
        // console.log("start of garbage");
        garbageOffsetStart = offset;
        isInGarbage = true;
      }
    }

    if (strInput[offset] == ">") {
      // end garbage
      if (isInGarbage) {
        // console.log("end of garbage");
        var garabge = strInput.slice(garbageOffsetStart, offset + 1);

        groups.push(garabge);
        groupStart = offset + 1;

        isInGarbage = false;
      }
    }

    if (strInput[offset] == "!") {
      // undo next char in garbage
      shouldIgnoreNextGarbage = true;
    }

    if (strInput[offset] == ",") {
      if (!isInGarbage) {
        // console.log("comma found, next group start");
        // mark split of groups
        var lastGroup = strInput.slice(groupStart, offset + 1);
        if (lastGroup != ",") {
          groups.push(lastGroup);
        }

        groupStart = offset + 1;
      }
    }

    offset++;
  }
  // console.log("end parse", strInput, groups);
  return { groups, offset };
}

function scoreGroups(group, parentScore = 0) {
  // get 1 to start
  var score = parentScore;
  group.forEach(item => {
    if (Array.isArray(item)) {
      score += scoreGroups(item, parentScore + 1);
    } else {
      if (item[0] != "<") {
        score += parentScore + 1;
      }
    }
  });

  return score;
}

function countGarbageChar(group) {
  var score = 0;
  group.forEach(item => {
    if (Array.isArray(item)) {
      score += countGarbageChar(item);
    } else {
      for (i = 1; i < item.length - 1; i++) {
        if (item[i] == "!") {
          i += 1;
        } else {
          score++;
        }
      }
    }
  });

  return score;
}
