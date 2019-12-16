const arguments = process.argv.splice(2);

class PokerCard {

    constructor(stringCard) {
        this.cardValue = stringCard.split("")[0];
        this.cardSuit = stringCard.split("")[1];
    }

    get suit() {
        return this.cardSuit;
    }
    get value() {
        return this.cardValue;
    }

    get numericValue() {

        switch (this.cardValue) {

            case "A":
                return 14;
            case "K":
                return 13;
            case "Q":
                return 12;
            case "J":
                return 11;
            case "T":
                return 10;
            default:
                return Number(this.cardValue);
        }
    }
}
class PokerHand {

    /**
     * 
     * @param {PokerCard[]} hand 
     */
    constructor(hand) {
        this.hand = hand;
    }
    /**
     * @returns the highest value card in the PokerHard
     */
    get higherCard() {
        return this.hand.reduce((higherCard, card) => {
            if (higherCard.numericValue > card.numericValue) {
                return higherCard;
            } else {
                return card;
            }
        });
    }

    /**
     * @returns an array with the highest value pair in the PokerHand, or false if there is no pair
     */
    get pair() {

        let pairedCards = [];

        this.hand.forEach(cardA => {
            this.hand.forEach(cardB => {
                if (cardA != cardB && cardA.value === cardB.value) {
                    if (pairedCards.length === 2) {
                        if (cardA.numericValue > pairedCards[0].numericValue) {
                            pairedCards = [];
                            pairedCards.push(cardA, cardB);
                        }
                    } else {
                        pairedCards.push(cardA, cardB);
                    }
                }
            });
        });
        if (pairedCards.length > 0)
            return pairedCards;
        else
            return false;
    }
    /**
     * @returns an array with the two arrays of pairs in the Pokerhand, or false if there is no two pairs
     */
    get twoPairs() {
        let firstPairedCards = [];
        let SecondPairedCards = [];

        this.hand.forEach(cardA => {
            this.hand.forEach(cardB => {
                if (cardA != cardB && cardA.value === cardB.value) {
                    if (firstPairedCards.length > 0) {
                        if (SecondPairedCards.length === 0 && !firstPairedCards.includes(cardA)) {
                            SecondPairedCards.push(cardA, cardB);
                        }
                    } else {
                        firstPairedCards.push(cardA, cardB);
                    }
                }
            });
        });

        if (firstPairedCards.length > 0 && SecondPairedCards.length > 0)
            return [firstPairedCards, SecondPairedCards];
        else
            return false;
    }
    /**
   * @returns an array with the three of a kind in the Pokerhand, or false if there is no three of a kind
   */
    get threeOfAKind() {

        let threeOfAKindCards = [];

        this.hand.forEach(cardRef => {
            if (threeOfAKindCards.length < 3) {
                threeOfAKindCards = [];
                threeOfAKindCards[0] = cardRef;
                this.hand.forEach(card => {
                    if (card != cardRef && card.value === cardRef.value) {
                        threeOfAKindCards.push(card);
                    }
                });
            }
        });
        if (threeOfAKindCards.length === 3)
            return threeOfAKindCards;
        else
            return false;
    }
    /**
   * @returns an array with the straight ordered from highest to lowest card, or false if there is no straight
   */
    get straight() {

        let orderedStraightHand = [];
        orderedStraightHand.push(this.higherCard);
        let counter = 0;
        while (orderedStraightHand.length > counter) {
            this.hand.forEach(card => {
                if (card.numericValue === orderedStraightHand[counter].numericValue - 1) {
                    orderedStraightHand.push(card);
                }
            });
            counter++;
        }
        if (orderedStraightHand.length > 1)
            return orderedStraightHand;
        else
            return false;
    }
    /**
    * @returns an array with the hand with flush, or false if there is no flush
    */
    get flush() {
        let hasFlush = true;
        this.hand.forEach(card => {
            if (card.suit != this.hand[0].suit) {
                hasFlush = false;
            }
        });
        if (hasFlush)
            return this.hand
        else
            return false;
    }
    /**
  * @returns an array with the three Of A Kind array of cards and the array with the pair within the fullhouse,
  *  or false if there is no fullhouse
  */
    get fullHouse() {
        let threeOfAKindCards = this.threeOfAKind;
        if (threeOfAKindCards) {
            let restOfHand = this.hand.filter(card => !threeOfAKindCards.includes(card));
            if (new PokerHand(restOfHand).pair) {
                return [threeOfAKindCards, restOfHand];
            }
        }
        return false;

    }
    /**
* @returns an array with the four of a kind in the PokerHand, or false if there is no four of a kind
*/
    get fourOfAKind() {
        let fourOfAKindCards = [];

        this.hand.forEach(cardRef => {
            if (fourOfAKindCards.length < 4) {
                fourOfAKindCards = [];
                fourOfAKindCards[0] = cardRef;
                this.hand.forEach(card => {
                    if (card != cardRef && card.value === cardRef.value) {
                        fourOfAKindCards.push(card);
                    }
                });
            }
        });
        if (fourOfAKindCards.length === 4)
            return fourOfAKindCards;
        else
            return false;
    }
    get straightFlush() {
        let straightCards = this.straight;
        if (straightCards && this.flush) {
            return straightCards;
        } else {
            return false;
        }
    }

    get handPoints() {

        if (this.straightFlush)
            return { name: "Straight Flush", value: 8 };
        if (this.fourOfAKind)
            return { name: "Four of a Kind", value: 7 };
        if (this.fullHouse)
            return { name: "Full House", value: 6 };
        if (this.flush)
            return { name: "Flush", value: 5 };
        if (this.straight)
            return { name: "Straight", value: 4 };
        if (this.threeOfAKind)
            return { name: "Three of a Kind", value: 3 };
        if (this.twoPairs)
            return { name: "Two Pairs", value: 2 };
        if (this.pair)
            return { name: "Pair", value: 1 };

        return { name: "High Card", value: 0 };
    }
}

const handPlayerOne = new PokerHand(arguments.slice(0, 5).map(function (card) {
    return new PokerCard(card);
}));
const handPlayerTwo = new PokerHand(arguments.slice(5).map(function (card) {
    return new PokerCard(card);
}));

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