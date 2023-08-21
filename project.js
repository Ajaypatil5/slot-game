// Game Details that are needed to implemeted
// Starts from here
// 1.Deposit Some Money ✅
// 2.Determine the number of lines to bet on ✅
// 3.Collect a bet amount ✅
// 4.Spin the Slot Machine ✅
// 5.Check if user won 
// 6.Give them winings
// 7.Play Again
// Ends Here


// For taking input we need to make this kindof variable 
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;


const SYMBOLS_COUNT = {
    A : 2,
    B : 4, 
    C : 6,
    D : 8
}
const SYMBOLS_VALUE = {
    A : 5,
    B : 4, 
    C : 3,
    D : 2
}

//deposit is a type of function in ES6 version 
const deposit = () =>{
    while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");

    //parse float is used for type casting in javascript 
    //and if someone gives a string like "Hello" then it will convert it
    // to the NaN which is Not a number in javaScript
    const depositAmountNumber = parseFloat(depositAmount);

    if(isNaN(depositAmountNumber) ||depositAmountNumber<=0){
        console.log("Invalid deposit amount, Please try again!");
    }
    else{
        return depositAmountNumber;
    }
    }
}

const numberOfLinesToBetON = ()=>{
    while (true) {
        const numberOFLines = prompt("Enter Number of Lines: ");
    
        //parse float is used for type casting in javascript 
        //and if someone gives a string like "Hello" then it will convert it
        // to the NaN which is Not a number in javaScript
        const numberOFLinesN = parseFloat(numberOFLines);
    
        if(isNaN(numberOFLinesN) ||numberOFLinesN<=0 || numberOFLinesN>3){
            console.log("Invalid, Please try again!");
        }
        else{
            return numberOFLinesN;
        }
    }
}

const getBet = (balance, numberOFLines) =>{
    while (true) {
        const bet = prompt("Enter the total bet per line: ");
    
        //parse float is used for type casting in javascript 
        //and if someone gives a string like "Hello" then it will convert it
        // to the NaN which is Not a number in javaScript
        const numberBet = parseFloat(bet);
    
        if(isNaN(numberBet) ||numberBet<=0 || numberBet>balance/numberOFLines){
            console.log("Invalid, Please try again!");
        }
        else{
            return numberBet;
        }
    }
}

const Spin = () => {
    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels =[];

    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSupport = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSupport.length)
            const selectedSymbol = reelSupport[randomIndex];
            reels[i].push(selectedSymbol);
            reelSupport.splice(randomIndex, 1);
        }
    }

    return reels;
}
const transpose = (reels)=>{
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);

        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows)=>{
    for(const row of rows){
        let rowString = "";
        for(const[i, symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString+=" | ";
            }
        }
        console.log (rowString);
    }
}

const getWinings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0 ; row<lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings+=bet*SYMBOLS_VALUE[symbols[0]];
        }
    }

    return winnings;
}
const game = () =>{


let balance = deposit();
while (true) {

    console.log("You Have a Balance of $ "+balance);

    const numberOFLines = numberOfLinesToBetON();
    const bet = getBet(balance, numberOFLines);
    balance-=bet*numberOFLines;
    const reels = Spin();
    console.log(reels);
    const transpos = transpose(reels);
    console.log(transpos);
    printRows(transpos);
    const winnings = getWinings(transpos,bet, numberOFLines);
    console.log("You won $ "+winnings);
    balance+=winnings;
    if(balance<=0){
        console.log("You Ran Out Of Money");
        break;
    }

    const playAgain = prompt("Do you want to play again (y/n): ");

    if(playAgain!="y") break;
}
}
game();