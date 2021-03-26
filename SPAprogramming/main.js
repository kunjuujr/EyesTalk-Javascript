//keyboard to alphabet
function keyboardToAlphabet() {
    var keyboard = document.getElementById('keyboard');
    var alphabet = document.getElementById('alphabet');

    if (keyboard.style.display == "block") {
        keyboard.style.display = "none";
        alphabet.style.display = "block";

    }
    else {
        keyboard.style.display = 'block';
        alphabet.style.display = "none";
    }
}

//keyboard to main
function keyboardToMain() {
    var keyboard = document.getElementById('keyboard');
    var mainpage = document.getElementById('main');

    if (keyboard.style.display == "block") {
        keyboard.style.display = "none";
        mainpage.style.display = "block";

    }
    else {
        keyboard.style.display = 'block';
        mainpage.style.display = "none";
    }
}

//main to keyboard page

function mainToKeyboard() {
    var keyboard = document.getElementById('keyboard');
    var mainpage = document.getElementById('main');

    if (mainpage.style.display == "block") {
        mainpage.style.display = "none";
        keyboard.style.display = "block";

    }
    else {
        mainpage.style.display = 'block';
        keyboard.style.display = "none";
    }
}

//calibration to main page
function calibToMain() {

    var calib = document.getElementById('calibration');
    var mainpage = document.getElementById('main');

    if (calib.style.display == "block") {
        calib.style.display = "none";
        mainpage.style.display = "block";

    }
    else {
        calib.style.display = 'block';
        mainpage.style.display = "none";
    }

}

//MAin to calibration page
function mainToCalib() {

    var calib = document.getElementById('calibration');
    var mainpage = document.getElementById('main');

    if (mainpage.style.display == "block") {
        mainpage.style.display = "none";
        calib.style.display = "block";
    }
    else {
        mainpage.style.display = 'block';
        calib.style.display = "none";
    }

}

//Function for Eye tracking starting with timer and all that
function start() {

    var c = 0;
    var t;
    var timer_is_on = 0;
    function timedCount() {
        document.getElementById("txt").innerHTML = c;
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
        console.log("GazeData", GazeData);
        // localStorage.setItem("GazeData", GazeData);
        document.getElementById("state").innerHTML = GazeData.state;
        document.getElementById("docX").innerHTML = GazeData.docX;
        document.getElementById("docY").innerHTML = GazeData.docY;
        document.getElementById("time").innerHTML = GazeData.time;
        var x = GazeData.docX;
        var y = GazeData.docY;

        var gaze = document.getElementById("gaze");
        x -= gaze.clientWidth / 2;
        y -= gaze.clientHeight / 2;

        gaze.style.left = x + "px";
        gaze.style.top = y + "px";

        if (GazeData.state != 0) {
            if (gaze.style.display == "block") gaze.style.display = "none";
        } else {
            if (gaze.style.display == "none") gaze.style.display = "block";
        }

        var rect = document.getElementById("rect");
        var back = document.getElementById("back");
        var board = document.getElementById("board")
        var backspace = document.getElementById("backspace")

        var object_1 = gaze.getBoundingClientRect();
        var object_2 = rect.getBoundingClientRect();
        var object_3 = back.getBoundingClientRect();
        var object_4 = board.getBoundingClientRect();
        var object_5 = backspace.getBoundingClientRect();

        //for rect 
        if (object_1.left < object_2.left + object_2.width && object_1.left + object_1.width > object_2.left &&
            object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top) {

            setTimeout(function () {
                startCount()
            }, 3000);
            if (c == 3) {
                document.getElementById('rect').click()
                stopCount()
                c = 0;
            }

        }


        //for back
        else if (object_1.left < object_3.left + object_3.width && object_1.left + object_1.width > object_3.left &&
            object_1.top < object_3.top + object_3.height && object_1.top + object_1.height > object_3.top) {
            document.getElementById('back').style.color = "black";

            setTimeout(function () {
                startCount()
            }, 3000);
            if (c == 3) {
                document.getElementById('back').click()
                stopCount()
                c = 0;
            }

        }


        //for board

        else if (object_1.left < object_4.left + object_4.width && object_1.left + object_1.width > object_4.left &&
            object_1.top < object_4.top + object_4.height && object_1.top + object_1.height > object_4.top) {
            document.getElementById('board').style.color = "black";

            setTimeout(function () {
                startCount()
            }, 3000);
            if (c == 3) {
                document.getElementById('board').click()
                stopCount()
                c = 0;
            }

        }


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

        }

        else {
            stopCount()
            c = 0;

        }
    }
}

function end() {
    GazeCloudAPI.StopEyeTracking();
}

function commit() {
    this.$store.commit("EDIT_STATE", GazeData);
}