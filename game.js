/*jshint esversion: 6 */


//initialise variables
var playing = false;
var score;
var timeRemaining;
var correctAns;

//if we click start/reset button
document.getElementById('startreset').onclick = function () {
    //if we are playing
    if (playing == true) {
        //if already playing reset the game
        location.reload(); //this reloads the page

    } else {
        //if we are not playing

        //set playing to true
        playing = true;

        //reset score
        score = 1;

        //show the score
        document.getElementById('scorevalue').innerHTML = score;

        //show time remaining
        timeRemaining = 60;
        show('timeremaining');

        document.getElementById('timeremainingvalue').innerHTML = timeRemaining + 'sec';

        hide('gameover');
        //reduce time by 1sec
        startCountdown();

        //change start button
        document.getElementById('startreset').textContent = 'Reset Game';


        //generate quest/answer
        generateQA();
    }
};
for (let i = 1; i < 5; i++) {
    document.getElementById('box'+ i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAns) {
                score++;
                document.getElementById('scorevalue').innerHTML = score;

                //show correct box and hide wrong box
                hide('wrong');
                show('correct');
                setTimeout(() => {
                    hide('correct');
                }, 1000);

                //Generate new Q/A

                generateQA();
            } else {
                hide('correct');
                show('wrong');
                setTimeout(() => {
                    hide('wrong');
                }, 1000);
            }
        }
    };
}

//FUNCTIONS

//start counter
function startCountdown() {
    //reduce by 1sec
    var time = setInterval(() => {
        timeRemaining--;
        document.getElementById('timeremainingvalue').innerHTML = timeRemaining + 'sec';

        //time left?
        if (timeRemaining === 0) {
            stopCountDown(time); //stop the timer
            show('gameover');
            document.getElementById('gameover').innerHTML = '<p>Game Over</p> <p>Your Score is ' + score + '.</p>';

            //hide timeremaining element
            hide('timeremaining');
            playing = false;
            document.getElementById('startreset').textContent = 'Start Game';
        }
    }, 1000);
}

function stopCountDown(time) {
    clearInterval(time);
}

//hide the element by id
function hide(id) {
    document.getElementById(id).style.display = 'none';
}

//show the element by id
function show(id) {
    document.getElementById(id).style.display = 'block';
}

//generate Q and A
function generateQA() {
    var x = randomNumber();
    var y = randomNumber();
    correctAns = x * y;
    document.getElementById('question').innerHTML = x + 'x' + y;
    var correctPosition = Math.round(Math.random() * 3) + 1;
    document.getElementById('box' + correctPosition).innerHTML = correctAns;

    //fill other with wrong answer

    var answers = [correctAns];
    for (let i = 1; i < 5; i++) {
        if (i !== correctPosition) {
            var wrongAns;
            do {
                wrongAns = randomNumber() * randomNumber();
            } while (answers.indexOf(wrongAns) > -1);
            document.getElementById('box' + i).innerHTML = wrongAns;
            answers.push(wrongAns);
        }

    }
}

function randomNumber() {
    return Math.round(Math.random() * 9) + 1;
}