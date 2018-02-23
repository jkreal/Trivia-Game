//

var currentQuestion = questions[0];
var prevQuestions = [];
var questionNumber = 1;
var gameRunning = true;
var score = 0;
var intervalId;
var number;

window.onload = function () {
	timer.run();
	randomQuestion();
	updateContent();
}

function randomQuestion() {

	do {
		currentQuestion = questions[Math.floor(Math.random() * (questions.length))];
	} while (prevQuestions.includes(currentQuestion));

	prevQuestions.push(currentQuestion);
}

function storeQuestion() {
	prevQuestions.push(currentQuestion);
}

var timer = {

	run: function () {
		number = 20;
		intervalId = setInterval(function () {
			this.number--;
			$('#timer').text(this.number);

			if (this.number === 0) {
				clearInterval(intervalId);
				timeUp();
				stop();
			}

		}, 1000);
	},

	stop: function () {
		clearInterval(intervalId);
	}

}

function updateContent() {

	$('#title').text("Question #" + questionNumber);
	$('#question').text(currentQuestion.question);
	$('#main-image').attr('src', currentQuestion.imgsrc);
	$('.answers').children().children().each(function (index, current) {
		$(current).text(currentQuestion.answers[index]);
	});

}

$('.answer-button').on("click", function () {
	console.log($(this).text());
	if (gameRunning) {
		if ($(this).text() === currentQuestion.correct) {
			console.log("success");
			showAnswer(true);
		}
		else {
			console.log("wrong answer");
			showAnswer(false);
		}
	}
});

function showAnswer(correct) {
	timer.stop();
	$('#next-button').show();
	if (correct) {
		$('#title').text("Correct!");
		score++;
	}
	else {
		$('#title').text("Incorrect!");
	}

	$('.answers').children().children().each(function (index, current) {
		if ($(this).text() !== currentQuestion.correct) {
			$(this).addClass('btn-danger').removeClass('btn-default');
		}
		else {
			$(this).addClass('btn-success').removeClass('btn-default');
		}
	});
}

function resetButtons() {
	$('.answers').children().children().each(function (index, current) {
		$(current).show();
		if ($(this).text() !== currentQuestion.correct) {
			$(this).addClass('btn-default').removeClass('btn-danger');
		}
		else {
			$(this).addClass('btn-default').removeClass('btn-success');
		}
	});
}

$('#next-button').on("click", function () {
	if (!gameRunning) {
		resetGame();


	} else if (questionNumber < questions.length) {
		resetButtons();
		timer.run();
		$(this).hide();
		questionNumber++;
		$('#title').text("Question #" + questionNumber);
		randomQuestion();
		updateContent();
	}
	else {
		console.log("over");
		gameOver();
	}

});

function timeUp() {
	$('#timer').text("Time's Up!");
	$('#next-button').show();

	hideAnswers();
}

function gameOver() {
	$('#timer').text("You scored " + score + " out of " + questions.length + "!");
	$('#next-button').text("Play Again");
	gameRunning = false;
	$('#question').text("");
	hideAnswers();
}

function hideAnswers() {
	$('.answers').children().children().each(function (index, current) {
		$(current).hide();
	});
}

function showAnswers() {
	$('.answers').children().children().each(function (index, current) {
		$(current).show();
	});
}

function resetGame() {
	resetButtons();
	$('#next-button').text("Next Question");
	$('#next-button').hide();
	gameRunning = true;
	questionNumber = 1;
	prevQuestions = [];
	timer.run();
	$('#title').text("Question #" + questionNumber);
	randomQuestion();
	updateContent();
	showAnswers();
}
