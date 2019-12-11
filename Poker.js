const arguments = process.argv.splice(2);

const handPlayerOne = arguments.splice(0, 5);
const handPlayerTwo = arguments;

console.log(handPlayerOne);
console.log(arguments);

