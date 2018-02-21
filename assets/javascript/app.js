var questionArray = [];
var question = {

	question: {

		question: '',

		rightAnswer: '',
		wrongAnswer: '',

		rightAnswerID: '',

		answer1: {
			answer: '',
			correct: ''
		},

		answer2: {
			answer: '',
			correct: ''
		},

		answer3: {
			answer: '',
			correct: ''
		},

		answer4: {
			answer: '',
			correct: ''
		}

	}

}

window.onload = function () {
	var intervalId;
	timer.run();
	console.log("loaded");

}


var timer = {
	number: 30,

	run: function () {
		number = 30;
		intervalId = setInterval(function () {
			this.number--;
			console.log(this.number);

			$('#timer').text(this.number);
			console.log("tick");
			if (this.number == 0) {
				this.number = 0;
				clearInterval(this.intervalId);
				stop();
			}

		}, 100);
	},

	stop: function () {
		clearInterval(IntervalId);
	}

}