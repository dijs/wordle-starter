const fs = require("fs");

const words = fs.readFileSync("./words.txt", "utf-8").split("\n");

const freq = {};

for (let word of words) {
  for (let letter of word.split("")) {
    freq[letter] = (freq[letter] || 0) + 1;
  }
}

const mostCommonLetters = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);

const sevenBest = mostCommonLetters.slice(0, 7);
const bestWordScores = {};

function hasDuplicateLetter(word) {
  const letters = {};
  for (let i = 0; i < word.length; i++) {
    if (letters[word[i]]) {
      return true;
    } else {
      letters[word[i]] = 1;
    }
  }
  return false;
}

function getScore(word) {
  return word.split("").reduce((sum, e) => {
    return sum + mostCommonLetters.indexOf(e);
  }, 0);
}

for (let word of words) {
  if (
    !hasDuplicateLetter(word) &&
    word.split("").every((letter) => sevenBest.includes(letter))
  ) {
    bestWordScores[word] = getScore(word);
  }
}

console.table(
  Object.keys(bestWordScores).sort(
    (x, y) => bestWordScores[x] - bestWordScores[y]
  )
);
