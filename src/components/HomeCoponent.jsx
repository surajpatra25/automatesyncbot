import React, { useState, useEffect } from 'react';

const SpeechRecognitionExample = () => {
  const [recognition, setRecognition] = useState(null);
  const [recognizing, setRecognizing] = useState(false);
  const [transcription, setTranscription] = useState('');

  useEffect(() => {
    const initSpeechRecognition = () => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setTranscription(finalTranscript);
      };

      setRecognition(recognition);
    };

    if (window.webkitSpeechRecognition) {
      initSpeechRecognition();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  }, []);

  const toggleRecognition = () => {
    if (recognition) {
      if (recognizing) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setRecognizing(!recognizing);
    }
  };

  return (
    <div>
      <h1>Speech Recognition Example</h1>
      <button onClick={toggleRecognition}>
        {recognizing ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div>
        <p>Your speech will appear here:</p>
        <div>{transcription}</div>
      </div>
    </div>
  );
};

export default SpeechRecognitionExample;
