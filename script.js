var time = 10;
var breakTime = 2;
var isWork = true;
var previousMinutesTens = -1;
var previousMinutesUnity = -1;
var previousSecondsTens = -1;
var countdownTimer = null;
var StartTime = 25 * 60;
const StartButton = document.querySelector(".start");
const SettingPopup = document.querySelector(".settings-popup");
const SaveButton = document.querySelector(".submit");
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
	} else {
		isWrok = true;
		UpdateTimer(time);
	}
}

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
			time = time - 1;
			UpdateTimer(time);
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
