import React, { useState } from 'react';

const SpeechToText = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognition = new window.webkitSpeechRecognition(); // For Chrome, use webkitSpeechRecognition

    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        setIsRecording(true);
    };

    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const currentTranscript = result[0].transcript;
        setTranscript(currentTranscript);
    };

    recognition.onend = () => {
        setIsRecording(false);
    };

    const toggleRecording = () => {
        if (recognition.recognizing) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    return (
        <div>
            <h1>Speech-to-Text Example</h1>
            <button onClick={toggleRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <div>
                <strong>You said this correct ?:</strong> {transcript}
            </div>
        </div>
    );
};

export default SpeechToText;
