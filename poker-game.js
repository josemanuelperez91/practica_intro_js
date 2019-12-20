import { PokerHand, PokerCard } from './Poker';

const arguments = process.argv.splice(2);

const handPlayerOne = new PokerHand(arguments.slice(0, 5).map(function (card) {
    return new PokerCard(card);
}));
const handPlayerTwo = new PokerHand(arguments.slice(5).map(function (card) {
    return new PokerCard(card);
}));

if (handPlayerOne.verifyHand() && handPlayerTwo.verifyHand()) {

    let winMessage = "";

    pointsPlayerOne = handPlayerOne.handPoints;
    pointsPlayerTwo = handPlayerTwo.handPoints;


    if (pointsPlayerOne.value === pointsPlayerTwo.value) {

        switch (pointsPlayerOne.name) {
            case "Straight Flush":

                if (handPlayerOne.higherCard.numericValue > handPlayerTwo.higherCard.numericValue) {
                    winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                } else {
                    winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                }
                break;
            case "Four of a Kind":

                if (handPlayerOne.fourOfAKind[0].numericValue > handPlayerTwo.fourOfAKind[0].numericValue) {
                    winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                } else {
                    winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                }
                break;
            case "Full House":

                if (handPlayerOne.threeOfAKind[0][0].numericValue > handPlayerTwo.threeOfAKind[0][0].numericValue) {
                    winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                } else {
                    winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                }
                break;

            case "Flush":

                if (handPlayerOne.higherCard.numericValue > handPlayerTwo.higherCard.numericValue) {
                    winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                } else {
                    winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                }
                break;

            case "Straight":

                if (handPlayerOne.higherCard.numericValue > handPlayerTwo.higherCard.numericValue) {
                    winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                } else {
                    winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                }
                break;

            case "Three of a Kind":

                if (handPlayerOne.threeOfAKind[0].numericValue > handPlayerTwo.threeOfAKind[0].numericValue) {
                    winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                } else {
                    winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                }
                break;

            case "Two Pairs":

                const playerOneFirstPair = handPlayerOne.pair;
                const playerOneSecondPair = handPlayerOne.twoPairs.filter(arrayCard => !playerOneFirstPair.includes(arrayCard));

                const playerTwoFirstPair = handPlayerOne.pair;
                const playerTwoSecondPair = handPlayerOne.twoPairs.filter(arrayCard => !playerTwoFirstPair.includes(arrayCard));

                if (playerOneFirstPair[0].numericValue === playerTwoFirstPair[0].numericValue) {
                    if (playerOneSecondPair[0].numericValue === playerTwoSecondPair[0].numericValue) {

                        const playerOnefifthCard = handPlayerOne.hand.filter(card =>
                            !playerOneFirstPair.includes(card) && !playerOneSecondPair.includes(card));
                        const playerTwofifthCard = handPlayerOne.hand.filter(card =>
                            !playerTwoFirstPair.includes(card) && !playerTwoSecondPair.includes(card));

                        if (playerOnefifthCard[0].numericValue > playerTwofifthCard[0].numericValue) {
                            winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                        } else {
                            winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                        }
                    }

                } else {
                    if (playerOneFirstPair[0].numericValue > playerTwoFirstPair[0].numericValue) {
                        winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                    } else {
                        winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                    }
                }
                break;

            case "Pair":

                if (handPlayerOne.pair[0].numericValue === handPlayerTwo.pair[0].numericValue) {

                    if (handPlayerOne.higherCard.numericValue > handPlayerTwo.higherCard.numericValue) {
                        winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                    } else {
                        winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                    }
                } else {
                    if (handPlayerOne.pair[0].numericValue > handPlayerTwo.pair[0].numericValue) {
                        winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                    } else {
                        winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                    }
                }

                break;

            case "High Card":

                playerOneHigherCard = handPlayerOne.higherCard;
                playerTwoHigherCard = handPlayerTwo.higherCard;

                while (playerOneHigherCard != playerTwoHigherCard && handPlayerOne.hand.length > 0) {

                    handPlayerOne.splice(handPlayerOne.indexOf(playerOneHigherCard), 1);
                    playerOneHigherCard = handPlayerOne.higherCard;

                    handPlayerTwo.splice(handPlayerTwo.indexOf(playerTwoHigherCard), 1);
                    playerTwoHigherCard = handPlayerTwo.higherCard;

                }
                if (playerOneHigherCard.numericValue > playerTwoHigherCard) {
                    winMessage = ("Player One Wins, " + pointsPlayerOne.name);
                } else {
                    winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
                }

                break;

        }

    } else {

        if (pointsPlayerOne.value > pointsPlayerTwo.value) {
            winMessage = ("Player One Wins, " + pointsPlayerOne.name);
        } else {
            winMessage = ("Player Two Wins, " + pointsPlayerTwo.name);
        }
    }

    console.log(winMessage ? winMessage : "Empate");
} else {
    console.log("Invalid Poker hand input");
}