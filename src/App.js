import logo from './logo.svg';
import './App.css';


import React, { useState, useRef, useEffect } from 'react';

const MyCamera = () => {
  const [imageData, setImageData] = useState(null);
  const videoRef = useRef(null);

  const accessCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const takePicture = async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0);

    const base64Image = canvas.toDataURL('image/jpeg'); // Adjust format as needed
    setImageData(base64Image);
  };

  useEffect(() => {
    accessCamera();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: 640, height: 480 }} />
      <button onClick={takePicture}>Take Picture</button>
      {imageData && (
        <img src={imageData} alt="Captured Image" />
      )}
    </div>
  );
};


function App() {
  return (
    <div className="App">
    <MyCamera></MyCamera>
    </div>
  );
}

export default App;
