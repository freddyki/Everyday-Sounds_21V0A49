const soundButtons = document.querySelectorAll('.sound-button');
const messageDiv = document.getElementById('message');
const hintDiv = document.getElementById('hint');
const scoreDiv = document.getElementById('score');
const soundAudios = document.querySelectorAll('audio');

let score = 0;

function playSound(event) {
    const keyCode = event.target.dataset.key;
    const soundAudio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const sound = event.target.dataset.sound;
    const imagePath = `images/${sound.toLowerCase()}.png`;

    const soundImage = new Image();
    soundImage.src = imagePath;
    soundImage.onload = () => {
        messageDiv.innerHTML = `Click on the button or press '${event.key}' to play the sound<br>${sound}`;
        messageDiv.appendChild(soundImage);
        soundAudio.currentTime = 0;
        soundAudio.play();

        // Display hint after a delay
        setTimeout(() => {
            showHint(sound);
        }, 2000);
    };
}

function showHint(sound) {
    // Provide hints based on everyday sound
    let hint = '';
    switch (sound.toLowerCase()) {
        case 'door':
            hint = 'Hint: The sound of opening or closing a door.';
            break;
        case 'phone':
            hint = 'Hint: The ringtone or notification sound of a phone.';
            break;
        case 'car':
            hint = 'Hint: The sound of a car engine or honking.';
            break;
        case 'clock':
            hint = 'Hint: The ticking or chiming sound of a clock.';
            break;
    }

    hintDiv.textContent = hint;
}

soundButtons.forEach(button => {
    button.addEventListener('click', playSound);
});

window.addEventListener('keydown', function (event) {
    const soundButton = document.querySelector(`.sound-button[data-key="${event.keyCode}"]`);
    if (soundButton) {
        soundButton.click();
    }
});

// Update score and reset hint after each correct answer
soundAudios.forEach(audio => {
    audio.addEventListener('ended', function () {
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        hintDiv.textContent = '';
    });
});
