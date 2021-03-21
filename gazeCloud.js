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
    GazeCloudAPI.StopEyeTracking();
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
        var object_1 = gaze.getBoundingClientRect();
        var object_2 = rect.getBoundingClientRect();

        if (object_1.left < object_2.left + object_2.width && object_1.left + object_1.width > object_2.left &&
            object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top) {
            document.getElementById('rect').style.backgroundColor = "red";
            setTimeout(function () {
                //   document.getElementById('yes').click()
                startCount()
            }, 3000);
            if (c == 3) {
                document.getElementById('rect').click()
            }

        }
        else {
            document.getElementById('rect').style.backgroundColor = "green";
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

function check() {
    alert('hey')
}