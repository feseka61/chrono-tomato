function convert2digits(num) {
    return num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
};

function totalTimeWorked() {
    if  (currentWorkState == 'working') {
        totalSeconds += 1;
        totalMinutes = Math.floor(totalSeconds / 60);
        workHours = Math.floor(totalMinutes / 60);
        workMinutes = totalMinutes - (workHours * 60)
        workSeconds = totalSeconds - (totalMinutes * 60)
        totalWorkTimePara.textContent = convert2digits(workHours) + ":" + convert2digits(workMinutes) + ":" + convert2digits(workSeconds);
    }
};

function timer() {

    totalTimeWorked()

    let state = document.getElementById('state');

    switch (currentWorkState) {
        case 'working':
            state.textContent = 'FOCUS & DO YOUR BEST!'

            break;
        case 'long resting':
            state.textContent = 'TAKE A LONG REST.'
            break;
        case 'resting':
            state.textContent = 'TIME FOR A SHORT BREAK.'
            break;
    };

    if (seconds == 0) {
        minutes = minutes - 1;
        seconds = 59;
    } else {
        minutes = minutes;
        seconds = seconds - 1;
    };
    tomatime.textContent = convert2digits(minutes) + ':' + convert2digits(seconds);

    if (currentWorkState == 'working') {
        if (seconds == 0 & minutes == 0) {
            gong.play()
            switch (workTimes) {
                case 3:
                    workTimes = 0;
                    minutes = longRestMin;
                    seconds = 1;
                    currentWorkState = 'long resting';
                    pomodoros += 1;
                    longBreaks += 1;
                    pomodorosPara.textContent = pomodoros + " pomodoros completed";
                    longBreaksPara.textContent = longBreaks + " long breaks taken";
                    break;
        
                default:
                    minutes = restMin;
                    seconds = 1;
                    currentWorkState = 'resting'
                    pomodoros +=1
                    pomodorosPara.textContent = pomodoros + " pomodoros completed";
                    break;
            };
        };
    } else {
        if (seconds == 0 & minutes == 0) {
            gong.play()
            minutes = focusMin;
            seconds = 0;
            currentWorkState = 'working'
            workTimes += 1
        };
    };
};

function setTimer() {
    focusMin = document.getElementById('workMinutes').value;
    restMin = document.getElementById('restMinutes').value;
    longRestMin = document.getElementById('longRestMinutes').value;
};

function resetter() {
    setTimer();

    clearInterval(timing);
    document.getElementById('strtimg').src = 'pictures/play.png';
    buttonState = 'start';

    minutes = focusMin;
    seconds = 0;
    tomatime.textContent = convert2digits(minutes) + ':' + convert2digits(seconds);

    totalMinutes = 0;
    totalSeconds = 0;

    workHours = 0;
    workMinutes = 0;
    workSeconds = 0;

    pomodoros = 0;
    longBreaks = 0;

    pomodorosPara.textContent = pomodoros + " pomodoros completed";
    longBreaksPara.textContent = longBreaks + " long breaks taken";
    totalWorkTimePara.textContent = convert2digits(workHours) + ":" + convert2digits(workMinutes) + ":" + convert2digits(workSeconds);
};

/*.............................................................................................................*/

let focusMin = document.getElementById('workMinutes').value;
let restMin = document.getElementById('restMinutes').value;
let longRestMin = document.getElementById('longRestMinutes').value;

let totalMinutes = 0;
let totalSeconds = 0;

let workHours = 0;
let workMinutes = 0;
let workSeconds = 0;

let pomodoros = 0;
let longBreaks = 0;

let pomodorosPara = document.getElementById("pomodoros");
let longBreaksPara = document.getElementById("longBreaks");
let totalWorkTimePara = document.getElementById("totalWorkTime");

let gong = document.getElementById('gong');

pomodorosPara.textContent = pomodoros + " pomodoros completed";
longBreaksPara.textContent = longBreaks + " long breaks taken";
totalWorkTimePara.textContent = convert2digits(workHours) + ":" + convert2digits(workMinutes) + ":" + convert2digits(workSeconds);


let settings = document.querySelector(".settings");
settings.style.visibility = "hidden";

let info = document.querySelector(".info");
info.style.visibility = "hidden";

let settingsAndInfo = document.querySelector(".settingsAndInfo");

let minutes = focusMin;
let seconds = 0;

let currentWorkState = 'working';
let workTimes = 0;

let tomatime = document.getElementById('time');
tomatime.textContent = convert2digits(minutes) + ':' + convert2digits(seconds);

let state = document.getElementById('state');

let startButton = document.getElementById('startpause');

let buttonState = 'start';

startButton.addEventListener('click', (e) => {
    state = startButton.textContent
    if (buttonState == 'start') {
        document.getElementById('strtimg').src = 'pictures/pause.png';
        buttonState = 'pause';
        window.timing = timer();
        window.timing = setInterval(timer, 1000);
    } else {
        document.getElementById('strtimg').src = 'pictures/play.png';
        buttonState = 'start';
        clearInterval(timing);
    }
});

let resetButton = document.getElementById('reset');

resetButton.addEventListener('click',resetter);

let infoButton = document.getElementById('info');

let settingsButton = document.getElementById('settings');

infoButton.addEventListener('click', (e) => {
    switch (info.style.visibility) {
        case "visible":
            info.style.visibility = "hidden";
            settingsAndInfo.style.borderColor = "black";
            document.getElementById('infoimg').src = 'pictures/infoinactive.png';
            break;
    
        default:
            info.style.visibility = "visible";
            document.getElementById('infoimg').src = 'pictures/infoactive.png';
            settings.style.visibility = "hidden";
            settingsAndInfo.style.borderColor = "transparent";
            document.getElementById('settingsimg').src = 'pictures/settingsinactive.png';
            break;
    };
});

settingsButton.addEventListener('click', (e) => {
    switch (settings.style.visibility) {
        case "visible":
            settings.style.visibility = "hidden";
            settingsAndInfo.style.borderColor = "black";
            document.getElementById('settingsimg').src = 'pictures/settingsinactive.png';
            break;
    
        default:
            settings.style.visibility = "visible";
            info.style.visibility = "hidden";
            settingsAndInfo.style.borderColor = "transparent";
            document.getElementById('settingsimg').src = 'pictures/settingsactive.png';
            document.getElementById('infoimg').src = 'pictures/infoinactive.png';
            break;
    };
});

let applyButton = document.getElementById('applyButton')

applyButton.addEventListener('click', (e) => {
    setTimer();

    minutes = focusMin;
    seconds = 0;
    tomatime.textContent = convert2digits(minutes) + ':' + convert2digits(seconds);    
});