var time = 5;
var breakTime = 2;
var isWork = true;
var previousMinutesTens = -1;
var previousMinutesUnity = -1;
var previousSecondsTens = -1;
var countdownTimer = null;
var StartTime = time;
var StartBreak = breakTime;
var CurrentBG = 0;
var volume = 0.1;
const StartButton = document.querySelector(".start");
const SettingPopup = document.querySelector(".settings-popup");
const SaveButton = document.querySelector(".submit");
const Backgrounds = document.querySelectorAll(".background");
const ButtonLeft = document.querySelector(".go-left");
const ButtonRight = document.querySelector(".go-right");
const Title = document.querySelector(".title-of-bg");

function getTimeSegmentElements(segmentElement) {
	const segmentDisplay = segmentElement.querySelector(".segment-display");
	const segmentDisplayTop = segmentElement.querySelector(
		".segment-display__top"
	);
	const segmentDisplayBottom = segmentElement.querySelector(
		".segment-display__bottom"
	);
	const segmentOverlayTop = segmentElement.querySelector(
		".segment-overlay__top"
	);
	const segmentOverlayBottom = segmentElement.querySelector(
		".segment-overlay__bottom"
	);
	const segmentOverlay = segmentElement.querySelector(".segment-overlay");
	return {
		segmentDisplay,
		segmentDisplayTop,
		segmentDisplayBottom,
		segmentOverlayTop,
		segmentOverlayBottom,
		segmentOverlay,
	};
}

function updateSegmentValue(displayElement, overlayElement, value) {
	displayElement.innerHTML = value;
	overlayElement.innerHTML = value;
}

function updateTimeSegment(segmentElement, timeValue) {
	const segmentElements = getTimeSegmentElements(segmentElement);
	segmentElements.segmentOverlay.classList.add("flip");

	updateSegmentValue(
		segmentElements.segmentDisplayTop,
		segmentElements.segmentOverlayBottom,
		timeValue
	);

	segmentElements.segmentOverlay.addEventListener("animationend", function () {
		updateSegmentValue(
			segmentElements.segmentOverlayTop,
			segmentElements.segmentDisplayBottom,
			timeValue
		);
		segmentElements.segmentOverlay.classList.remove("flip");
	});
}

function UpdateTimeSection(SectionID, timeValue) {
	const firstNumber = Math.floor(timeValue / 10);
	const secondNumber = timeValue % 10;

	const sectionElement = document.getElementById(SectionID);
	const sectionElements = sectionElement.querySelectorAll(".time-segment");

	if (SectionID == "seconds") {
		console.log(previousSecondsTens, secondNumber);
		if (firstNumber != previousSecondsTens) {
			updateTimeSegment(sectionElements[0], firstNumber);
		}
		updateTimeSegment(sectionElements[1], secondNumber);
		previousSecondsTens = firstNumber;
	} else {
		if (firstNumber != previousMinutesTens) {
			updateTimeSegment(sectionElements[0], firstNumber);
		}
		if (secondNumber != previousMinutesTens) {
			updateTimeSegment(sectionElements[1], secondNumber);
		}
		previousMinutesTens = secondNumber;
		previousMinutesUnity = firstNumber;
	}
}

function UpdateTimer(timeInSec) {
	if (minutes != Math.floor(timeInSec / 60)) {
		minutes = Math.floor(timeInSec / 60);
		UpdateTimeSection("minutes", minutes);
	} else {
		minutes = Math.floor(timeInSec / 60);
	}

	seconds = timeInSec % 60;
	UpdateTimeSection("seconds", seconds);
}

function FinishCountdown() {
	if (isWork == true) {
		UpdateTimer(breakTime);
		isWork = false;
		time = StartTime;
	} else {
		isWork = true;
		UpdateTimer(time);
		breakTime = StartBreak;
	}
}

UpdateTimer(time);
var sound = new Audio("/css/Rain.mp3");
sound.loop = true;
sound.volume = 0.1;
sound.play();

StartButton.addEventListener("click", () => {
	if (StartButton.classList.contains("stop")) {
		StartButton.classList.remove("stop");
		StartButton.innerHTML = "Start";
		clearInterval(countdownTimer);
		countdownTimer = null;
	} else {
		StartButton.classList.add("stop");
		StartButton.innerHTML = "Stop";
		countdownTimer = setInterval(() => {
			console.log(isWork);
			if (time == 0 || breakTime == 0) {
				FinishCountdown();
			}
			if (isWork) {
				time = time - 1;
				UpdateTimer(time);
			} else {
				breakTime = breakTime - 1;
				UpdateTimer(breakTime);
			}
		}, 1000);
	}
});

document.querySelector(".stop").addEventListener("click", () => {
	clearInterval(countdownTimer);
	countdownTimer = null;
	time = StartTime;
	UpdateTimer(time);
	StartButton.classList.remove("stop");
	StartButton.innerHTML = "Start";
});

document.querySelector(".settings").addEventListener("click", () => {
	if (SettingPopup.classList.contains("show")) {
		SettingPopup.classList.remove("show");
	} else {
		SettingPopup.classList.add("show");
	}
});

SaveButton.addEventListener("click", () => {
	const WorkTimeMins = parseInt(document.querySelector(".work-time-min").value);
	const WorkTimeSec = parseInt(document.querySelector(".work-time-sec").value);
	const BreakTimeMin = parseInt(
		document.querySelector(".break-time-min").value
	);
	const BreakTimeSec = parseInt(
		document.querySelector(".break-time-sec").value
	);
	time =
		parseInt(document.querySelector(".work-time-min").value) * 60 +
		parseInt(document.querySelector(".work-time-sec").value);
	breakTime =
		parseInt(document.querySelector(".break-time-min").value) * 60 +
		parseInt(document.querySelector(".break-time-sec").value);
	UpdateTimer(time);
	StartTime = time;
	SettingPopup.classList.remove("show");
});

Backgrounds.forEach((Background) => {
	Background.addEventListener("transitionend", () => {
		ButtonRight.disabled = false;
		ButtonLeft.disabled = false;
	});
});

function ChangeNameOfBG(nr) {
	if (nr == 0) {
		Title.innerHTML = "Rainy Day";
		console.log(sound);
		sound.pause();
		sound.currentTime = 0;
		sound = new Audio("/css/Rain.mp3");
		sound.loop = true;
		sound.volume = volume;
		sound.play();
	} else if (nr == 1) {
		Title.innerHTML = "Fireplace";
		console.log(sound);
		sound.pause();
		sound = new Audio("/css/Fireplace.mp3");
		sound.currentTime = 0;
		sound.loop = true;
		sound.volume = volume;
		sound.play();
	} else if (nr == 2) {
		Title.innerHTML = "Busy Town";
		console.log(sound);
		sound.pause();
		sound = new Audio("/css/Town.mp3");
		sound.currentTime = 0;
		sound.loop = true;
		sound.volume = volume;
		sound.play();
	} else if (nr == 3) {
		Title.innerHTML = "Meadow";
		sound.pause();
		sound = new Audio("/css/Meadow.mp3");
		sound.currentTime = 0;
		sound.loop = true;
		sound.volume = volume;
		sound.play();
	}
}

ButtonRight.addEventListener("click", () => {
	ButtonRight.disabled = true;
	if (CurrentBG < 3) {
		Backgrounds[CurrentBG].style.width = "0%";
		Backgrounds[CurrentBG].style.right = "none";
		Backgrounds[CurrentBG].style.left = "0";
		CurrentBG += 1;
		Backgrounds[CurrentBG].style.width = "100%";
		ChangeNameOfBG(CurrentBG);
	}
});
ButtonLeft.addEventListener("click", () => {
	ButtonLeft.disabled = true;
	if (CurrentBG > 0) {
		Backgrounds[CurrentBG].style.left = "auto";
		Backgrounds[CurrentBG].style.right = "0";
		Backgrounds[CurrentBG].style.width = "0%";

		CurrentBG -= 1;
		Backgrounds[CurrentBG].style.width = "100%";
		Backgrounds[CurrentBG].style.left = "none";
		Backgrounds[CurrentBG].style.right = "0";
		ChangeNameOfBG(CurrentBG);
	}
});
