document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const countdownContainer = document.getElementById("countdown");
    const experimentContainer = document.getElementById("experiment");
    const instructionContainer = document.getElementById("instruction");
    const endMessageContainer = document.getElementById("endMessage");
    const timerText = document.getElementById("timer");
    const stimulusImg = document.getElementById("stimulus");
    const choiceButtons = document.querySelectorAll("#experiment button");

    let currentStimulusIndex = 0;
    let reactionTimes = [];
    let startTime, countdownInterval, stimulusDisplayInterval;

    const stimuliImages = [
        "Image/image_1.png", "Image/image_2.png", "Image/image_3.png", 
        "Image/image_4.png", "Image/image_5.png", "Image/image_6.png", 
        "Image/image_7.png", "Image/image_8.png", "Image/image_9.png", "Image/image_10.png"
    ];

    // Start Experiment
    startButton.addEventListener("click", () => {
        instructionContainer.style.display = "none";
        countdownContainer.style.display = "block";
        startCountdown();
    });

    // Restart Experiment
    restartButton.addEventListener("click", () => {
        endMessageContainer.style.display = "none";
        instructionContainer.style.display = "block";
        resetExperiment();
    });

    // Countdown before experiment
    function startCountdown() {
        let countdown = 5;
        timerText.textContent = countdown;
        countdownInterval = setInterval(() => {
            countdown -= 1;
            timerText.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                countdownContainer.style.display = "none";
                startExperiment();
            }
        }, 1000);
    }

    // Start experiment with stimulus presentation
    function startExperiment() {
        experimentContainer.style.display = "block";
        currentStimulusIndex = 0;
        displayStimulus();
    }

    // Display each stimulus image for 1 second and record reaction
    function displayStimulus() {
        if (currentStimulusIndex >= stimuliImages.length) {
            endExperiment();
            return;
        }
        stimulusImg.src = stimuliImages[currentStimulusIndex];
        startTime = new Date().getTime();
        
        choiceButtons.forEach(button => button.disabled = false);
        stimulusDisplayInterval = setTimeout(() => {
            currentStimulusIndex += 1;
            displayStimulus();
        }, 1000);
    }

    // Record reaction and move to next stimulus
    choiceButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const reactionTime = new Date().getTime() - startTime;
            reactionTimes.push({ choice: e.target.textContent, time: reactionTime });
            choiceButtons.forEach(button => button.disabled = true);
            clearTimeout(stimulusDisplayInterval);
            currentStimulusIndex += 1;
            displayStimulus();
        });
    });

    // End Experiment
    function endExperiment() {
        experimentContainer.style.display = "none";
        endMessageContainer.style.display = "block";
        console.log("Experiment data:", reactionTimes);
    }

    // Reset experiment data
    function resetExperiment() {
        reactionTimes = [];
    }
});
