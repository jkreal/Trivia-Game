var currentQuestion = questions[0];
var prevQuestions = [];
var questionNumber = 1;
var gameRunning = true;
var intervalId;
var number;

window.onload = function () {
	timer.run();
	randomQuestion();
	updateContent();
}

function randomQuestion() {
var questionNum = 0;

	do {
		questionNum++;
		currentQuestion = questions[Math.floor(Math.random() * (questions.length))];

		if(questionNum >= questions.length){
			break;
		}
	} while (prevQuestions.includes(currentQuestion));

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


			if (this.number == 0) {
				clearInterval(intervalId);
				gameOver();
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
	}
	else {
		$('#title').text("Incorrect!");
	}

	$('.answers').children().children().each(function (index, current) {
		if ($(this).text() !== currentQuestion.correct) {
			$(this).hide();
		}
	});
}

function resetButtons() {
	$('.answers').children().children().each(function (index, current) {
		$(current).show();
	});
}

$('#next-button').on("click", function () {
	if(questionNumber < questions.length){
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
	}
});

function gameOver(){
	$('#timer').text("Time's Up!");
}