/*;(function(exports) {

	function Timer() {
		this.endTime = new Date().getTime();
	}

	Timer.prototype = {

		setEndTime: function(time) {
			this.endTime = new Date().getTime() + time;
		},
		setEndTimeFromServer: function(time) {
			this.endTime = time;
			this.timeRemaining();
		},
		timeRemaining: function() {
			this.timeLeft = this.endTime - new Date().getTime();
		},
		format: function() {
			var time = this.timeLeft,
				seconds = Math.floor((time / 1000) % 60),
				minutes = Math.floor((time / (1000 * 60)) % 60),
				hours = Math.floor((time / (1000 * 60 * 60)) % 24);

			var formattedTime = "";
			if (hours > 0 && hours < 10) {
				formattedTime += "0" + hours + ":";
			} else if (hours >= 10) {
				formattedTime += hours + ":";
			}

			if (seconds < 0 && minutes != 0) {
			    minutes -= 0;
			    seconds = 0;
			}
			if (minutes < 10) {
				formattedTime += "0" + minutes + ":";
			} else {
				formattedTime += minutes + ":";
			}

			if (seconds < 10) {
				formattedTime += "0" + seconds;
			} else {
				formattedTime += seconds;
			}

			return formattedTime;
		}
	};

	exports.Timer = Timer;

})(typeof exports === 'undefined' ? this : exports);

;(function() {

	let timer = new Timer(),
		socket = io.connect('http://localhost:3001');
	
	socket.on('currentEndTime', function (data) {
		timer.setEndTimeFromServer(data.time);
	});

	$(function() {
		set = setInterval(function(){
			$('.time').trigger('click');
			clearInterval(set);
		},20000);

		$('.time').on('click', function(e) {
			e.stopPropagation();
			var time = $(this).text() * 60 * 1000;
			timer.setEndTime(time);
			timer.timeRemaining();
			socket.emit('setTimer', { time: time });
		});
	});

	setInterval(function() {
		if (timer.timeLeft > 0) {
			timer.timeRemaining();
			$('#timer').text(timer.format());
		}
	},100);

})();*/
  

  