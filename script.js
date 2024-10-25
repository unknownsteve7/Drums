let isRecording = false;
let recordedSequence = [];
let tempo = 120; // Default tempo
let lastTime = 0;

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();

    if (isRecording) {
        recordedSequence.push({ keyCode: e.keyCode, time: Date.now() - lastTime });
        lastTime = Date.now();
    }
}

function startRecording() {
    isRecording = true;
    recordedSequence = [];
    lastTime = Date.now();
}

function playback() {
    let currentTime = 0;
    recordedSequence.forEach((note) => {
        setTimeout(() => {
            playSound({ keyCode: note.keyCode });
        }, currentTime);
        currentTime += (60000 / tempo) * note.time / 1000; // Adjust based on tempo
    });
}

document.getElementById('tempo').addEventListener('input', (e) => {
    tempo = e.target.value;
});

document.getElementById('record').addEventListener('click', startRecording);
document.getElementById('playback').addEventListener('click', playback);

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
function playSound(e) {
    const keyCode = e.keyCode || e.target.dataset.key;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`div[data-key="${keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();

    if (isRecording) {
        recordedSequence.push({ keyCode: keyCode, time: Date.now() - lastTime });
        lastTime = Date.now();
    }
}

// Add touch event listener to each key
keys.forEach(key => {
    key.addEventListener('touchstart', (e) => {
        playSound(e);
    });
});

