const argument = process.argv[2];
let isNumber = Number(argument);


const romanLetters = ["I", "V", "X", "L", "C", "D", "M"];
const romanValues = [1, 5, 10, 50, 100, 500, 1000];


let romanToArabic = (roman) => {

}

let arabicToRoman = (arabic) => {
    let numArabic = Number(arabic);
    if (numArabic > 3999 || numArabic < 1) return "Numero no covertible";
    let romanString = "";

    for (let i = 6; i >= 0; i--) {

        while (numArabic - romanValues[i] >= 0) {
            numArabic = numArabic - romanValues[i];
            romanString += romanLetters[i];
        }

        if (i > 0) {
            if (i % 2 === 0) {
                let minValueToSub = (romanValues[i] - romanValues[i - 2]);
                // console.log(minValueToSub);
                if (numArabic >= minValueToSub && numArabic < romanValues[i]) {
                    numArabic = numArabic - minValueToSub;
                    romanString += romanLetters[i - 2] + romanLetters[i];
                }
            } else {
                let minValueToSub = (romanValues[i] - romanValues[i - 1]);

                if (numArabic >= minValueToSub && numArabic < romanValues[i]) {
                    numArabic = numArabic - minValueToSub;
                    romanString += romanLetters[i - 1] + romanLetters[i];
                }
            }
        }
    }

    // while (numArabic - 1000 >= 0) {
    //     numArabic = numArabic - 1000;
    //     romanString += "M";
    // }
    // if (numArabic >= 900 && numArabic < 1000) {
    //     numArabic = numArabic - 900;
    //     romanString += "CM";
    // }
    // while (numArabic - 500 >= 0) {
    //     numArabic = numArabic - 500;
    //     romanString += "D";
    // }
    // if (numArabic >= 400 && numArabic < 500) {
    //     numArabic = numArabic - 400;
    //     romanString += "CD";
    // }
    // while (numArabic - 100 >= 0) {
    //     numArabic = numArabic - 100;
    //     romanString += "C";
    // }
    // if (numArabic >= 90 && numArabic < 100) {
    //     numArabic = numArabic - 90;
    //     romanString += "XC";
    // }
    // while (numArabic - 50 >= 0) {
    //     numArabic = numArabic - 50;
    //     romanString += "L";
    // }
    // if (numArabic >= 40 && numArabic < 50) {
    //     numArabic = numArabic - 40;
    //     romanString += "XL";
    // }
    // while (numArabic - 10 >= 0) {
    //     numArabic = numArabic - 10;
    //     romanString += "X";
    // }
    // if (numArabic >= 9 && numArabic < 10) {
    //     numArabic = numArabic - 9;
    //     romanString += "IX";
    // }
    // while (numArabic - 5 >= 0) {
    //     numArabic = numArabic - 5;
    //     romanString += "V";
    // }
    // if (numArabic >= 4 && numArabic < 5) {
    //     numArabic = numArabic - 4;
    //     romanString += "IV";
    // }

    // while (numArabic - 1 >= 0) {
    //     numArabic = numArabic - 1;
    //     romanString += "I";
    // }
    return romanString;

}
let isRomanNumber = (roman) => {

}


if (isNumber) {
    console.log(arabicToRoman(argument));
} else {
    if (isRomanNumber(argument)) {
        console.log(romanToArabic(argument));
    } else {
        console.log("Input no valido");
    }
}