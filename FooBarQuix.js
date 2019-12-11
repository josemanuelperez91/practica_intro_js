const argument = process.argv[2];

let divisibleNumber = Number(argument);
let digits = argument.split('');
let outputString = "";

if (divisibleNumber % 3 == 0) {
    outputString += "Foo";
}
if (divisibleNumber % 5 == 0) {
    outputString += "Bar";
}
if (divisibleNumber % 7 == 0) {
    outputString += "Quix";
}
digits.forEach(digit => {

    if (digit === "3") {
        outputString += "Foo";
    }
    if (digit === "5") {
        outputString += "Bar";
    }
    if (digit === "7") {
        outputString += "Quix";
    }
});

if (outputString) {
    console.log(outputString);
} else {
    console.log(divisibleNumber);
}