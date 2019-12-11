const argument = process.argv[2];
let isNumber = Number(argument);


const romanLetters = ["I", "V", "X", "L", "C", "D", "M"];
const romanValues = [1, 5, 10, 50, 100, 500, 1000];


let romanToArabic = (roman) => {
    let romanString = new String(roman).toUpperCase();
    let romanStringLength = romanString.length;
    let arabicDigit = 0;
    let isSkippingLetter = false;

    for (let i = 0; i < romanStringLength; i++) {

        if (!isSkippingLetter) {
            switch (romanString[i]) {
                case "I":

                    if (romanString[i + 1] === "V") {
                        arabicDigit = arabicDigit + 4;
                        isSkippingLetter = true;
                    } else if (romanString[i + 1] === "X") {
                        arabicDigit = arabicDigit + 9;
                        isSkippingLetter = true;
                    } else {
                        arabicDigit = arabicDigit + 1;
                    }
                    break;
                case "V":

                    arabicDigit = arabicDigit + 5;

                    break;

                case "X":
                    if (romanString[i + 1] === "L") {
                        arabicDigit = arabicDigit + 40;
                        isSkippingLetter = true;
                    } else if (romanString[i + 1] === "C") {
                        arabicDigit = arabicDigit + 90;
                        isSkippingLetter = true;
                    } else {
                        arabicDigit = arabicDigit + 10;
                    }

                    break;

                case "L":

                    arabicDigit = arabicDigit + 50;

                    break;

                case "C":
                    if (romanString[i + 1] === "D") {
                        arabicDigit = arabicDigit + 400;
                        isSkippingLetter = true;
                    } else if (romanString[i + 1] === "M") {
                        arabicDigit = arabicDigit + 900;
                        isSkippingLetter = true;
                    } else {
                        arabicDigit = arabicDigit + 100;
                    }
                    break;
                case "D":

                    arabicDigit = arabicDigit + 500;

                    break;
                case "M":

                    arabicDigit = arabicDigit + 1000;

                    break;
                default:
                    return false;

            }

        } else {
            isSkippingLetter = false;
        }
    }
    return arabicDigit;

}

let arabicToRoman = (arabic) => {
    let arabicDigit = Number(arabic);
    if (arabicDigit > 3999 || arabicDigit < 1) return "Numero no covertible";
    let romanString = "";

    for (let i = 6; i >= 0; i--) {

        while (arabicDigit - romanValues[i] >= 0) {
            arabicDigit = arabicDigit - romanValues[i];
            romanString += romanLetters[i];
        }

        if (i > 0) {
            if (i % 2 === 0) {
                let minValueToSub = (romanValues[i] - romanValues[i - 2]);
                if (arabicDigit >= minValueToSub && arabicDigit < romanValues[i]) {
                    arabicDigit = arabicDigit - minValueToSub;
                    romanString += romanLetters[i - 2] + romanLetters[i];
                }
            } else {
                let minValueToSub = (romanValues[i] - romanValues[i - 1]);

                if (arabicDigit >= minValueToSub && arabicDigit < romanValues[i]) {
                    arabicDigit = arabicDigit - minValueToSub;
                    romanString += romanLetters[i - 1] + romanLetters[i];
                }
            }
        }
    }
    return romanString;
}

let isRomanNumber = (roman) => {

    let romanString = new String(roman).toUpperCase();
    let romanStringLength = romanString.length;

    for (let i = romanStringLength - 1; i >= 0; i--) {

        switch (romanString[i]) {
            case "I":

                for (let j = i - 3; j >= 0; j--) {
                    if (romanString[j] === "I")
                        return false;
                }
                if (romanString[i - 1] === "I") {
                    let higherRomanLetters = romanLetters.splice(1);
                    if (higherRomanLetters.includes(romanString[i + 1])) {
                        return false;
                    }
                }
                break;
            case "V":

                for (let j = i - 1; j >= 0; j--) {
                    if (romanString[j] === "V")
                        return false;
                }
                for (let j = i + 1; j < romanStringLength; j++) {
                    let higherRomanLetters = romanLetters.splice(2);
                    if (higherRomanLetters.includes(romanString[j])) {
                        return false;
                    }
                }
                break;

            case "X":
                for (let j = i - 3; j >= 0; j--) {
                    if (romanString[j] === "X")
                        return false;
                }

                if (romanString[i - 1] === "X") {
                    let higherRomanLetters = romanLetters.splice(3);
                    if (higherRomanLetters.includes(romanString[i + 1])) {
                        return false;
                    }
                }

                break;

            case "L":

                for (let j = i - 1; j >= 0; j--) {
                    if (romanString[j] === "L")
                        return false;
                }
                for (let j = i + 1; j < romanStringLength; j++) {
                    let higherRomanLetters = romanLetters.splice(4);
                    if (higherRomanLetters.includes(romanString[j])) {
                        return false;
                    }
                }
                break;

            case "C":
                for (let j = i - 3; j >= 0; j--) {
                    if (romanString[j] === "C")
                        return false;
                }

                if (romanString[i - 1] === "C") {
                    let higherRomanLetters = romanLetters.splice(5);
                    if (higherRomanLetters.includes(romanString[i + 1])) {
                        return false;
                    }
                }
                break;
            case "D":

                for (let j = i - 1; j >= 0; j--) {
                    if (romanString[j] === "D")
                        return false;
                }
                for (let j = i + 1; j < romanStringLength; j++) {
                    let higherRomanLetters = romanLetters.splice(6);
                    if (higherRomanLetters.includes(romanString[j])) {
                        return false;
                    }
                }
                break;
            case "M":

                for (let j = i - 3; j >= 0; j--) {
                    if (romanString[j])
                        return false;
                }

                for (let j = i - 1; j >= 0; j--) {
                    if (romanString[j] != "M" && romanString[j] != "C") {
                        return false;
                    }
                }
                break;
            default:
                return false;

        }

    }
    return true;
}


if (isNumber) {
    console.log(arabicToRoman(argument));
} else {
    if (isRomanNumber(argument)) {
        console.log(romanToArabic(argument));
    } else {
        console.log("Input NO valido");
    }
}

    // while (arabicDigit - 1000 >= 0) {
    //     arabicDigit = arabicDigit - 1000;
    //     romanString += "M";
    // }
    // if (arabicDigit >= 900 && arabicDigit < 1000) {
    //     arabicDigit = arabicDigit - 900;
    //     romanString += "CM";
    // }
    // while (arabicDigit - 500 >= 0) {
    //     arabicDigit = arabicDigit - 500;
    //     romanString += "D";
    // }
    // if (arabicDigit >= 400 && arabicDigit < 500) {
    //     arabicDigit = arabicDigit - 400;
    //     romanString += "CD";
    // }
    // while (arabicDigit - 100 >= 0) {
    //     arabicDigit = arabicDigit - 100;
    //     romanString += "C";
    // }
    // if (arabicDigit >= 90 && arabicDigit < 100) {
    //     arabicDigit = arabicDigit - 90;
    //     romanString += "XC";
    // }
    // while (arabicDigit - 50 >= 0) {
    //     arabicDigit = arabicDigit - 50;
    //     romanString += "L";
    // }
    // if (arabicDigit >= 40 && arabicDigit < 50) {
    //     arabicDigit = arabicDigit - 40;
    //     romanString += "XL";
    // }
    // while (arabicDigit - 10 >= 0) {
    //     arabicDigit = arabicDigit - 10;
    //     romanString += "X";
    // }
    // if (arabicDigit >= 9 && arabicDigit < 10) {
    //     arabicDigit = arabicDigit - 9;
    //     romanString += "IX";
    // }
    // while (arabicDigit - 5 >= 0) {
    //     arabicDigit = arabicDigit - 5;
    //     romanString += "V";
    // }
    // if (arabicDigit >= 4 && arabicDigit < 5) {
    //     arabicDigit = arabicDigit - 4;
    //     romanString += "IV";
    // }

    // while (arabicDigit - 1 >= 0) {
    //     arabicDigit = arabicDigit - 1;
    //     romanString += "I";
    // }