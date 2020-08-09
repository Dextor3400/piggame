/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, previousScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;

        //Display
        var diceDOM = document.querySelector('.dice');

        var diceDOMTwo = document.querySelector('.diceTwo');

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        diceDOMTwo.style.display = 'block';
        diceDOMTwo.src = 'dice-' + diceTwo + '.png';

        //Update score if rolled number was not 1
        if (dice !== 1 && diceTwo !== 1) {
            //Add Score
            checkPreviousScore();
            roundScore += dice + diceTwo;
            previousScore = roundScore;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        var winningScore = document.getElementById('matches').value;
        // Add Curentscore to globalscore       
        scores[activePlayer] += roundScore;
        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.diceTwo').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

function nextPlayer(){
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function checkPreviousScore(){
    if(previousScore == 6 && roundScore == 6){
        scores[activePlayer] = 0;
        roundScore = 0;     
        scores[activePlayer] = 0;

        document.querySelector('#current-' + activePlayer).textContent = roundScore
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        nextPlayer();
    }
}

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}





//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//document.querySelector('.dice').style.display = 'none';









