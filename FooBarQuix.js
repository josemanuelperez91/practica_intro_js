const argument = process.argv[2];

let divisible_number = Number(argument);
let digits_array = argument.split('');
let output_string = "";

if (divisible_number % 3 == 0) {
    output_string += "Foo";
}
if (divisible_number % 5 == 0) {
    output_string += "Bar";
}
if (divisible_number % 7 == 0) {
    output_string += "Quix";
}
digits_array.forEach(digit => {

    if (digit === "3") {
        output_string += "Foo";
    }
    if (digit === "5") {
        output_string += "Bar";
    }
    if (digit === "7") {
        output_string += "Quix";
    }
});

if (output_string) {
    console.log(output_string);
} else {
    console.log(divisible_number);
}