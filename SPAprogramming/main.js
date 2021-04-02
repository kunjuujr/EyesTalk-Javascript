//keyboard to alphabet
function keyboardToAlphabet() {
	var keyboard = document.getElementById('keyboard');
	var alphabet = document.getElementById('alphabet');

	if (keyboard.style.display == 'block') {
		keyboard.style.display = 'none';
		alphabet.style.display = 'block';
	} else {
		keyboard.style.display = 'block';
		alphabet.style.display = 'none';
	}
}

//keyboard to main
function keyboardToMain() {
	var keyboard = document.getElementById('keyboard');
	var mainpage = document.getElementById('main');

	if (keyboard.style.display == 'block') {
		keyboard.style.display = 'none';
		mainpage.style.display = 'block';
	} else {
		keyboard.style.display = 'block';
		mainpage.style.display = 'none';
	}
}

//main to keyboard page

function mainToKeyboard() {
	var keyboard = document.getElementById('keyboard');
	var mainpage = document.getElementById('main');

	if (mainpage.style.display == 'block') {
		mainpage.style.display = 'none';
		keyboard.style.display = 'block';
	} else {
		mainpage.style.display = 'block';
		keyboard.style.display = 'none';
	}
}

//calibration to main page
function calibToMain() {
	var calib = document.getElementById('calibration');
	var mainpage = document.getElementById('main');

	if (calib.style.display == 'block') {
		calib.style.display = 'none';
		mainpage.style.display = 'block';
	} else {
		calib.style.display = 'block';
		mainpage.style.display = 'none';
	}
}

//MAin to calibration page
function mainToCalib() {
	var calib = document.getElementById('calibration');
	var mainpage = document.getElementById('main');

	if (mainpage.style.display == 'block') {
		mainpage.style.display = 'none';
		calib.style.display = 'block';
	} else {
		mainpage.style.display = 'block';
		calib.style.display = 'none';
	}
}

//Function for Eye tracking starting with timer and all that
function start() {
	var c = 0;
	var t;
	var timer_is_on = 0;
	function timedCount() {
		document.getElementById('txt').innerHTML = c;
		c = c + 1;
		t = setTimeout(timedCount, 1000);
	}

	function startCount() {
		if (!timer_is_on) {
			timer_is_on = 1;
			timedCount();
		}
	}

	function stopCount() {
		clearTimeout(t);
		timer_is_on = 0;
	}

	GazeCloudAPI.StartEyeTracking();
	GazeCloudAPI.OnResult = function (GazeData) {
		console.log('GazeData', GazeData);
		// localStorage.setItem("GazeData", GazeData);
		document.getElementById('state').innerHTML = GazeData.state;
		document.getElementById('docX').innerHTML = GazeData.docX;
		document.getElementById('docY').innerHTML = GazeData.docY;
		document.getElementById('time').innerHTML = GazeData.time;
		var x = GazeData.docX;
		var y = GazeData.docY;

		var gaze = document.getElementById('gaze');
		x -= gaze.clientWidth / 2;
		y -= gaze.clientHeight / 2;

		gaze.style.left = x + 'px';
		gaze.style.top = y + 'px';

		if (GazeData.state != 0) {
			if (gaze.style.display == 'block') gaze.style.display = 'none';
		} else {
			if (gaze.style.display == 'none') gaze.style.display = 'block';
		}

		var rect = document.getElementById('rect');
		var back = document.getElementById('back');
		var board = document.getElementById('board');
		//var backspace = document.getElementById("backspace")
		var but1 = document.getElementById('myButton1');
		var but2 = document.getElementById('myButton2');
		var but3 = document.getElementById('myButton3');
		var but4 = document.getElementById('myButton4');
		var but5 = document.getElementById('myButton5');
		var but6 = document.getElementById('myButton6');

		var object_1 = gaze.getBoundingClientRect();
		var object_2 = rect.getBoundingClientRect();
		var object_3 = back.getBoundingClientRect();
		var object_4 = board.getBoundingClientRect();
		//var object_5 = backspace.getBoundingClientRect();
		var object_6 = but1.getBoundingClientRect();
		var object_7 = but2.getBoundingClientRect();
		var object_8 = but3.getBoundingClientRect();
		var object_9 = but4.getBoundingClientRect();
		var object_10 = but5.getBoundingClientRect();
		var object_11 = but6.getBoundingClientRect();

		//for rect
		if (
			object_1.left < object_2.left + object_2.width &&
			object_1.left + object_1.width > object_2.left &&
			object_1.top < object_2.top + object_2.height &&
			object_1.top + object_1.height > object_2.top
		) {
			setTimeout(function () {
				startCount();
			}, 3000);
			if (c == 3) {
				document.getElementById('rect').click();
				stopCount();
				c = 0;
			}
		}

		//for back
		else if (
			object_1.left < object_3.left + object_3.width &&
			object_1.left + object_1.width > object_3.left &&
			object_1.top < object_3.top + object_3.height &&
			object_1.top + object_1.height > object_3.top
		) {
			setTimeout(function () {
				startCount();
			}, 4000);
			if (c == 4) {
				document.getElementById('back').click();
				stopCount();
				c = 0;
			}
		}

		//for board
		else if (
			object_1.left < object_4.left + object_4.width &&
			object_1.left + object_1.width > object_4.left &&
			object_1.top < object_4.top + object_4.height &&
			object_1.top + object_1.height > object_4.top
		) {
			setTimeout(function () {
				startCount();
			}, 4000);
			if (c == 4) {
				document.getElementById('board').click();
				stopCount();
				c = 0;
			}
		}

		/*
        //for backspace
        else if (object_1.left < object_5.left + object_5.width && object_1.left + object_1.width > object_5.left &&
            object_1.top < object_5.top + object_5.height && object_1.top + object_1.height > object_5.top) {

            setTimeout(function () {
                startCount()
            }, 3000);
            if (c == 3) {
                document.getElementById('backspace').click()
                stopCount()
                c = 0;
            }

        }*/

		//keyboard but1
		else if (
			object_1.left < object_6.left + object_6.width &&
			object_1.left + object_1.width > object_6.left &&
			object_1.top < object_6.top + object_6.height &&
			object_1.top + object_1.height > object_6.top
		) {
			setTimeout(function () {
				startCount();
			}, 4000);
			if (c == 4) {
				document.getElementById('myButton1').click();
				stopCount();
				c = 0;
			}
		}

		//keyboard but2
		else if (
			object_1.left < object_7.left + object_7.width &&
			object_1.left + object_1.width > object_7.left &&
			object_1.top < object_7.top + object_7.height &&
			object_1.top + object_1.height > object_7.top
		) {
			setTimeout(function () {
				startCount();
			}, 4000);
			if (c == 4) {
				document.getElementById('myButton2').click();
				stopCount();
				c = 0;
			}
		}

		//keyboard but3
		else if (
			object_1.left < object_8.left + object_8.width &&
			object_1.left + object_1.width > object_8.left &&
			object_1.top < object_8.top + object_8.height &&
			object_1.top + object_1.height > object_8.top
		) {
			setTimeout(function () {
				startCount();
			}, 4000);
			if (c == 4) {
				document.getElementById('myButton3').click();
				stopCount();
				c = 0;
			}
		}

		//keyboard but4
		else if (
			object_1.left < object_9.left + object_9.width &&
			object_1.left + object_1.width > object_9.left &&
			object_1.top < object_9.top + object_9.height &&
			object_1.top + object_1.height > object_9.top
		) {
			setTimeout(function () {
				startCount();
			}, 4000);
			if (c == 4) {
				document.getElementById('myButton4').click();
				stopCount();
				c = 0;
			}
		}

		//keyboard but5
		else if (
			object_1.left < object_10.left + object_10.width &&
			object_1.left + object_1.width > object_10.left &&
			object_1.top < object_10.top + object_10.height &&
			object_1.top + object_1.height > object_10.top
		) {
			setTimeout(function () {
				startCount();
			}, 4000);
			if (c == 4) {
				document.getElementById('myButton5').click();
				stopCount();
				c = 0;
			}
		}

		//keyboard but6
		else if (
			object_1.left < object_11.left + object_11.width &&
			object_1.left + object_1.width > object_11.left &&
			object_1.top < object_11.top + object_11.height &&
			object_1.top + object_1.height > object_11.top
		) {
			setTimeout(function () {
				startCount();
			}, 4000);
			if (c == 4) {
				document.getElementById('myButton6').click();
				stopCount();
				c = 0;
			}
		} else {
			stopCount();
			c = 0;
		}
	};
}

function end() {
	GazeCloudAPI.StopEyeTracking();
}

function commit() {
	this.$store.commit('EDIT_STATE', GazeData);
}

var str = '';
var alpha = '';

//alphabets
function myFunction1() {
	boardBegin();
	myButton1.onclick = function () {
		alphabets();
		myButton1.onclick = function () {
			abcde();
			myButton1.onclick = function () {
				alpha = 'A';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'B';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'C';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'D';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				alpha = 'E';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton2.onclick = function () {
			fghij();
			myButton1.onclick = function () {
				alpha = 'F';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'G';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'H';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'I';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				alpha = 'J';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton3.onclick = function () {
			klmn();
			myButton1.onclick = function () {
				alpha = 'K';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'L';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'M';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'N';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				boardBegin();
			};
		};
		myButton4.onclick = function () {
			opqr();
			myButton1.onclick = function () {
				alpha = 'O';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'P';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'Q';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'R';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				boardBegin();
			};
		};
		myButton5.onclick = function () {
			stuv();
			myButton1.onclick = function () {
				alpha = 'S';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'T';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'U';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'V';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				boardBegin();
			};
		};
		myButton6.onclick = function () {
			wxyz();
			myButton1.onclick = function () {
				alpha = 'W';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'X';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'Y';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'Z';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				boardBegin();
			};
		};
	};
}

function myFunction1() {
	boardBegin();
	myButton1.onclick = function () {
		alphabets();
		myButton1.onclick = function () {
			abcde();
			myButton1.onclick = function () {
				alpha = 'A';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'B';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'C';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'D';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				alpha = 'E';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton2.onclick = function () {
			fghij();
			myButton1.onclick = function () {
				alpha = 'F';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'G';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'H';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'I';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				alpha = 'J';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton3.onclick = function () {
			klmn();
			myButton1.onclick = function () {
				alpha = 'K';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'L';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'M';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'N';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				boardBegin();
			};
		};
		myButton4.onclick = function () {
			opqr();
			myButton1.onclick = function () {
				alpha = 'O';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'P';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'Q';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'R';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				boardBegin();
			};
		};
		myButton5.onclick = function () {
			stuv();
			myButton1.onclick = function () {
				alpha = 'S';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'T';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'U';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'V';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				boardBegin();
			};
		};
		myButton6.onclick = function () {
			wxyz();
			myButton1.onclick = function () {
				alpha = 'W';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = 'X';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = 'Y';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = 'Z';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				boardBegin();
			};
		};
	};

	myButton2.onclick = function () {
		numsym();
		myButton1.onclick = function () {
			num1();
			myButton1.onclick = function () {
				alpha = '0';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = '1';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = '2';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = '3';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				alpha = '4';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton2.onclick = function () {
			num2();
			myButton1.onclick = function () {
				alpha = '5';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = '6';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = '7';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = '8';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton5.onclick = function () {
				alpha = '9';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton3.onclick = function () {
			sym1();
			myButton1.onclick = function () {
				alpha = '!';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = '@';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = '#';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = '$';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};

			myButton5.onclick = function () {
				alpha = '%';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton4.onclick = function () {
			sym2();
			myButton1.onclick = function () {
				alpha = '^';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = '&';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = '_';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = '(';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};

			myButton5.onclick = function () {
				alpha = ')';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton5.onclick = function () {
			sym3();
			myButton1.onclick = function () {
				alpha = '-';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = '+';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = '=';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = '*';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};

			myButton5.onclick = function () {
				alpha = '/';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
		myButton6.onclick = function () {
			sym4();
			myButton1.onclick = function () {
				alpha = '?';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton2.onclick = function () {
				alpha = ':';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton3.onclick = function () {
				alpha = ',';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton4.onclick = function () {
				alpha = '.';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};

			myButton5.onclick = function () {
				alpha = '"';
				str = str + alpha;
				document.getElementById('display1').value = str;
			};
			myButton6.onclick = function () {
				boardBegin();
			};
		};
	};

	myButton5.onclick = function () {
		emo();
		myButton1.onclick = function () {
			alpha = '😂';
			str = str + alpha;
			document.getElementById('display1').value = str;
		};
		myButton2.onclick = function () {
			alpha = '😁';
			str = str + alpha;
			document.getElementById('display1').value = str;
		};
		myButton3.onclick = function () {
			alpha = '😪';
			str = str + alpha;
			document.getElementById('display1').value = str;
		};
		myButton4.onclick = function () {
			alpha = '😡';
			str = str + alpha;
			document.getElementById('display1').value = str;
		};

		myButton5.onclick = function () {
			alpha = '❤️';
			str = str + alpha;
			document.getElementById('display1').value = str;
		};
		myButton6.onclick = function () {
			boardBegin();
		};
	};
}
//back button
function back() {
	boardBegin();
}

//backspace button
function backspace() {
	var sl = str.length - 1;
	str = str.slice(0, sl);

	document.getElementById('display1').value = str;
}

function space() {
	str = str + '  ';
	document.getElementById('display1').value = str;
}

//intitial keyboard value reset
function boardBegin() {
	but1 = document.getElementById('myButton1');
	but1.value = 'Alphabets';
	but1.onclick = function () {
		myFunction1();
	};

	but2 = document.getElementById('myButton2');
	but2.value = 'Numbers/Symbols';
	but2.onclick = function () {
		myFunction1();
	};

	but3 = document.getElementById('myButton3');
	but3.value = 'Space';
	but3.onclick = function () {
		space();
	};

	but4 = document.getElementById('myButton4');
	but4.value = 'Words';
	but4.onclick = function () {
		myFunction1();
	};

	but5 = document.getElementById('myButton5');
	but5.value = 'Emojis';
	but5.onclick = function () {
		myFunction1();
	};

	but6 = document.getElementById('myButton6');
	but6.value = 'Backspace';
	but6.onclick = function () {
		backspace();
	};
}

function alphabets() {
	document.getElementById('myButton1').value = 'A/B/C/D/E';
	document.getElementById('myButton2').value = 'F/G/H/I/J';
	document.getElementById('myButton3').value = 'K/L/M/N';
	document.getElementById('myButton4').value = 'O/P/Q/R';
	document.getElementById('myButton5').value = 'S/T/U/V/';
	document.getElementById('myButton6').value = 'W/X/Y/Z';
}

function abcde() {
	document.getElementById('myButton1').value = 'A';
	document.getElementById('myButton2').value = 'B';
	document.getElementById('myButton3').value = 'C';
	document.getElementById('myButton4').value = 'D';
	document.getElementById('myButton5').value = 'E';
	document.getElementById('myButton6').value = 'Back';
}

function fghij() {
	document.getElementById('myButton1').value = 'F';
	document.getElementById('myButton2').value = 'G';
	document.getElementById('myButton3').value = 'H';
	document.getElementById('myButton4').value = 'I';
	document.getElementById('myButton5').value = 'J';
	document.getElementById('myButton6').value = 'Back';
}

function klmn() {
	document.getElementById('myButton1').value = 'K';
	document.getElementById('myButton2').value = 'L';
	document.getElementById('myButton3').value = 'M';
	document.getElementById('myButton4').value = 'N';
	document.getElementById('myButton5').value = 'Back';
	document.getElementById('myButton6').value = '';
}

function opqr() {
	document.getElementById('myButton1').value = 'O';
	document.getElementById('myButton2').value = 'P';
	document.getElementById('myButton3').value = 'Q';
	document.getElementById('myButton4').value = 'R';
	document.getElementById('myButton5').value = 'Back';
	document.getElementById('myButton6').value = '';
}

function stuv() {
	document.getElementById('myButton1').value = 'S';
	document.getElementById('myButton2').value = 'T';
	document.getElementById('myButton3').value = 'U';
	document.getElementById('myButton4').value = 'V';
	document.getElementById('myButton5').value = 'Back';
	document.getElementById('myButton6').value = '';
}

function wxyz() {
	document.getElementById('myButton1').value = 'W';
	document.getElementById('myButton2').value = 'X';
	document.getElementById('myButton3').value = 'Y';
	document.getElementById('myButton4').value = 'Z';
	document.getElementById('myButton5').value = 'Back';
	document.getElementById('myButton6').value = '';
}

function numsym() {
	document.getElementById('myButton1').value = '0/1/2/3/4';
	document.getElementById('myButton2').value = '5/6/7/8/9';
	document.getElementById('myButton3').value = '!/@/#/$/%';
	document.getElementById('myButton4').value = '^/&/_/(/)';
	document.getElementById('myButton5').value = '-/+/=/*//';
	document.getElementById('myButton6').value = '?/:/,/./"';
}
function num1() {
	document.getElementById('myButton1').value = '0';
	document.getElementById('myButton2').value = '1';
	document.getElementById('myButton3').value = '2';
	document.getElementById('myButton4').value = '3';
	document.getElementById('myButton5').value = '4';
	document.getElementById('myButton6').value = 'Back';
}

function num2() {
	document.getElementById('myButton1').value = '5';
	document.getElementById('myButton2').value = '6';
	document.getElementById('myButton3').value = '7';
	document.getElementById('myButton4').value = '8';
	document.getElementById('myButton5').value = '9';
	document.getElementById('myButton6').value = 'Back';
}

function sym1() {
	document.getElementById('myButton1').value = '!';
	document.getElementById('myButton2').value = '@';
	document.getElementById('myButton3').value = '#';
	document.getElementById('myButton4').value = '$';
	document.getElementById('myButton5').value = '%';
	document.getElementById('myButton6').value = 'Back';
}

function sym2() {
	document.getElementById('myButton1').value = '^';
	document.getElementById('myButton2').value = '&';
	document.getElementById('myButton3').value = '*';
	document.getElementById('myButton4').value = '(';
	document.getElementById('myButton5').value = ')';
	document.getElementById('myButton6').value = 'Back';
}

function sym3() {
	document.getElementById('myButton1').value = '-';
	document.getElementById('myButton2').value = '+';
	document.getElementById('myButton3').value = '=';
	document.getElementById('myButton4').value = '*';
	document.getElementById('myButton5').value = '/';
	document.getElementById('myButton6').value = 'Back';
}

function sym4() {
	document.getElementById('myButton1').value = '?';
	document.getElementById('myButton2').value = ':';
	document.getElementById('myButton3').value = '.';
	document.getElementById('myButton4').value = ',';
	document.getElementById('myButton5').value = '"';
	document.getElementById('myButton6').value = 'Back';
}

function emo() {
	document.getElementById('myButton1').value = '😂';
	document.getElementById('myButton2').value = '😁';
	document.getElementById('myButton3').value = '😢';
	document.getElementById('myButton4').value = '😡';
	document.getElementById('myButton5').value = '❤️';
	document.getElementById('myButton6').value = 'Back';
}
