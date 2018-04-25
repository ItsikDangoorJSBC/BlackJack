const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateCard() {
    var randCard = Math.floor(Math.random() * 13) + 1;
    //console.log(randCard);
    if(randCard > 10) {
        randCard = 10;
    }
    return randCard;
}

function generateInitialTwoCard() {
    var sum = 0;
    for(let i = 0; i < 2; i += 1) {
        sum += generateCard();
    }
    return sum;
}

function addCardToSum(sum) {
    var randCard = generateCard();
    personCards.cards.push(randCard);
    sum += randCard;
    return sum;
}

function isWinOrBurnedOrLow() {
    if(personCards.sumCards === 21){
        console.log(`Black Jack, ${personCards.name} you win!`);
    } else if (personCards.sumCards > 21){
        console.log(`${personCards.name} you are burned! your hand is: ${personCards.sumCards}`);
    } else {
        console.log(`${personCards.name}, too Low cards`);
    }
    rl.close();
}

//listener for a close event on the Readline instance.
rl.on('close', function() {
    console.log("all %s cards are %j", personCards.name, personCards.cards);
    process.exit(1);
});

var personCards = {
    name: '',
    cards: [],
    sumCards: 0
};


function main() {
    var initialCardValues = generateInitialTwoCard();
    personCards.cards.push(initialCardValues);
    personCards.sumCards = initialCardValues;
    console.log(personCards.sumCards);
    var isLive = true;

    rl.question("What your name? ", function(answer) {
        personCards.name = answer;
        rl.write(`So ${personCards.name} you want to play!\nSo [H]it -OR- [S]top?  (other key illegal)\n`);
        rl.on('line', function(card) {
            if(card.toLowerCase().trim() === 's') {
                isLive = false;
                isWinOrBurnedOrLow();
            } else if(card.toLowerCase().trim() === 'h') {
                personCards.sumCards = addCardToSum(personCards.sumCards);
            } else {
                rl.setPrompt(`Unusual key stroke ${personCards.name}!!!\n`);
                rl.prompt();
                rl.close();
            }

            if(isLive) {
                rl.setPrompt(`So [H]it -OR- [S]top?  (other key illegal)\n`);
                rl.prompt();
            }
        });
    });
}


main();