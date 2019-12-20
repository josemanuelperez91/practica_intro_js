const argument = process.argv[2];

let number = Number(argument);

for (let iterativeNumber = 1; iterativeNumber <= number; iterativeNumber++) {

    let outputString = "";

    if (iterativeNumber % 3 == 0) {
        outputString += "Foo";
    }
    if (iterativeNumber % 5 == 0) {
        outputString += "Bar";
    }
    if (iterativeNumber % 7 == 0) {
        outputString += "Quix";
    }

    let digits = iterativeNumber.toString().split('');

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
        console.log(iterativeNumber);
    }
}