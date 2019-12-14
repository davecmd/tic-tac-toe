

let gameBoard = (() => { // Module for the gameboard
   let markers = new Array(3);
    for (let i = 0; i < markers.length; i++) {
        markers[i] = new Array(2);
    }

   const fillClear = () => {
    for (var i = 0; i < 3; i++) { 
        for (var j = 0; j < 3; j++) { 
            markers[i][j] = ''; 
  
        } 
        console.log(markers[i]);
    } 
   };

   return {markers, fillClear}
})();

let player = (myTurn) => {
let wins = 0; 
  return {wins, myTurn}
};

let playerOne = player(true); // Player Object
let playerTwo = player(false);

let displayScore = () => {
    let scoreOne = playerOne.wins;
    const displayUsernameOne = document.querySelector('#score-1');
    displayUsernameOne.innerHTML = "Score One: " + scoreOne;

    let scoreTwo = playerTwo.wins;
    const displayUsernameTwo = document.querySelector('#score-2');
    displayUsernameTwo.innerHTML = "Score Two: " + scoreTwo;

}

let startGame = () => {
    displayUsername();
    displayScore();
    const startForm = document.querySelector('form');
    startForm.style.display = "none";
    const gridGame = document.querySelector('.game-ui');
    gridGame.style.display = "block";
}

// let accessGrid(runThis) => {
//     let markersList = document.querySelectorAll('.tic-tac-toe .grid-item');
//     let markersArray = [...markersList]; // Spread list to seperate array items
//     console.log(markersList);
//     console.log(markersArray);
//     markersArray.forEach(marker => { // Update each grid item based off passed array
//         runThis;
//     });
// }

let displayUsername = () => {
    let usernameOne = document.getElementById("name-1").value;
    const displayUsernameOne = document.querySelector('#username-1');
    displayUsernameOne.innerHTML = "Player One: " + usernameOne;

    let usernameTwo = document.getElementById("name-2").value;
    const displayUsernameTwo = document.querySelector('#username-2');
    displayUsernameTwo.innerHTML = "Player Two: " + usernameTwo;
}



let clearDOM = () => {
    let markersList = document.querySelectorAll('.tic-tac-toe .grid-item');
    let markersArray = [...markersList]; // Spread list to seperate array items
    markersArray.forEach(marker => { // Create and map DOM to code
        marker.innerHTML = '';
    });
}




let addClicking = () => {
    let markersList = document.querySelectorAll('.tic-tac-toe .grid-item');
    let markersArray = [...markersList]; // Spread list to seperate array items
    console.log(markersList);
    console.log(markersArray);
    markersArray.forEach(marker => { // Update each grid item based off passed array
        marker.addEventListener('click', function() {placeMarker(marker)});
        console.log("Bla" + marker);
    });
};

let dict = {};

let displayController = (markers) => { // Displays given array to tic tac toe grid
    let markersList = document.querySelectorAll('.tic-tac-toe .grid-item');
    let markersArray = [...markersList]; // Spread list to seperate array items
    console.log(markersList);
    console.log(markersArray);
    let i = 0
    markersArray.forEach(marker => { // Create and map DOM to code
        dict[marker.id] = i;
        console.log(dict);
        i++;
    });
};


let placeMarker = (marker) => {
    console.log("work");
    if (playerOne.myTurn == true) {
        if (dict[marker.id] < 3 && gameBoard.markers[0][dict[marker.id]] == '') {
            gameBoard.markers[0][dict[marker.id]] = 'X';
            marker.innerHTML = 'X';
            console.log('la');
            playerOne.myTurn = false;
            playerTwo.myTurn = true;
        }
        else if (dict[marker.id] < 6 &&  gameBoard.markers[1][dict[marker.id]-3] == '') {
            gameBoard.markers[1][dict[marker.id]-3] = 'X';
            marker.innerHTML = 'X';
            playerOne.myTurn = false;
            playerTwo.myTurn = true;
        }
        else if (gameBoard.markers[2][dict[marker.id]-6] == '') {
            gameBoard.markers[2][dict[marker.id]-6] = 'X';
            marker.innerHTML = 'X';
            playerOne.myTurn = false;
            playerTwo.myTurn = true;
        }

        for (var i = 0; i < 3; i++) { 
            console.log(gameBoard.markers[i]);
        }
        console.log(dict);
    }
    else {
        if (dict[marker.id] < 3 && gameBoard.markers[0][dict[marker.id]] == '') {
            gameBoard.markers[0][dict[marker.id]] = 'O';
            marker.innerHTML = 'O';
            console.log('la');
            playerOne.myTurn = true;
            playerTwo.myTurn = false;
        }
        else if (dict[marker.id] < 6 &&  gameBoard.markers[1][dict[marker.id]-3] == '') {
            gameBoard.markers[1][dict[marker.id]-3] = 'O';
            marker.innerHTML = 'O';
            playerOne.myTurn = true;
            playerTwo.myTurn = false;
        }
        else if (gameBoard.markers[2][dict[marker.id]-6] == '') {
            gameBoard.markers[2][dict[marker.id]-6] = 'O';
            marker.innerHTML = 'O';
            playerOne.myTurn = true;
            playerTwo.myTurn = false;
        }
    }
    checkWinner();
};

let restartGame = () => {
    displayScore();
    gameBoard.fillClear();
    setTimeout(function(){clearDOM();}, 2000);
}

let winOutcome = (wins) => {
    wins = wins + 1;   
    return wins
  };

// let displayWinner = (outcome) => {
//     const winner = document.querySelector('#display-winner');
//     if (outcome == 1) {
//         winner.innerHTML = "Player One Wins!";
//     }
//     else if (outcome == 2 ) {
//         winner.innerHTML = "Player Two Wins!";
//     }
//     else {
//         winner.innerHTML = "Player Two Wins!";
//     }
// }


let checkWinner = () => {
    let win = false;
    for (var i = 0; i < 3; i++) { // Check horizontal win conditions
        let winConditionOne = 0;
        let winConditionTwo = 0;
        for (var j = 0; j < 3; j++) { 
            if (gameBoard.markers[i][j] == "X") {
                winConditionOne++;
            }
            if (gameBoard.markers[i][j] == "O") {
                winConditionTwo++;
            }
        } 
        if (winConditionOne >= 3) {
            playerOne.wins = winOutcome(playerOne.wins);
            restartGame();
        }
        else if (winConditionTwo >= 3) {
            playerTwo.wins = winOutcome(playerTwo.wins);
            restartGame();
        }
        
    } 
    for (var i = 0; i < 3; i++) { // Check vertical win conditions
        let winConditionOne = 0;
        let winConditionTwo = 0;
        for (var j = 0; j < 3; j++) { 
            if (gameBoard.markers[j][i] == "X") {
                winConditionOne++;
            }
            if (gameBoard.markers[j][i] == "O") {
                winConditionTwo++;
            }
        } 
        if (winConditionOne >= 3) {
            playerOne.wins = winOutcome(playerOne.wins);
            restartGame();
        }
        else if (winConditionTwo >= 3) {
            playerTwo.wins = winOutcome(playerTwo.wins);
            restartGame();
        }
        
    } 

    if (gameBoard.markers[0][0] == 'X' && gameBoard.markers[1][1] == 'X' && gameBoard.markers[2][2] == 'X') { // Check matrix diagonal win condition
        playerOne.wins = winOutcome(playerOne.wins);
        restartGame();
    }

    if (gameBoard.markers[0][0] == 'O' && gameBoard.markers[1][1] == 'O' && gameBoard.markers[2][2] == 'O') {
        playerTwo.wins = winOutcome(playerTwo.wins);
        restartGame();
    }
 

    if (gameBoard.markers[0][2] == 'X' && gameBoard.markers[1][1] == 'X' && gameBoard.markers[2][0] == 'X') { // Check alternate diagonal win condition
        playerOne.wins = winOutcome(playerOne.wins);
        restartGame();
    }
    else if (gameBoard.markers[0][2] == 'O' && gameBoard.markers[1][1] == 'O' && gameBoard.markers[2][0] == 'O') {
        playerTwo.wins = winOutcome(playerTwo.wins);
        restartGame();
    }

    let tie = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard.markers[i][j] == "") {
                tie = false;
            }
        }
    }
    if (tie == true) {
        restartGame();
    }

}



const startButton = document.querySelector('#start'); // Select start button 
startButton.addEventListener('click', startGame);



addClicking();
gameBoard.fillClear();

displayController(gameBoard.markers);