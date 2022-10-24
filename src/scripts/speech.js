let speech = new SpeechSynthesisUtterance();
speech.lang = "es";

let voices = [];

speech.voice = voices[0];
speech.rate = 6;
speech.volume = 1;
speech.pitch = 1;

const speechText = (text) => {
    window.speechSynthesis.cancel();
    speech.text = text;
    window.speechSynthesis.speak(speech);
};

export { speechText };
