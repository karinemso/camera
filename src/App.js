import React, { useState, useRef, useEffect } from 'react';

import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const AiCamera = () => {
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    let video;
    const initFaceDetection = async () => {
      video = document.getElementById('inputVideo');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(video, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
        if (detections.length > 0) {
          setFaceDetected(true);
        } else {
          setFaceDetected(false);
        }
      }, 1000); // Check every second
    };

    const handleVideoLoaded = () => {
      initFaceDetection();
    };

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoaded);
      }
    };
  }, []);

  return (
    <div>
      {faceDetected ? <p>User is well-positioned</p> : <p>Please position your face in the camera frame</p>}
      <Webcam onLoadedData={() => console.log('Video loaded')} />
    </div>
  );
};



const MyCamera = () => {
  const [imageData, setImageData] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const accessCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log(stream)
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
    <div style={{width:"100vw", height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      {/* Canvas positioned on top with opacity for visibility */}
      
     <video ref={videoRef} autoPlay muted style={{ width: 640, height: 480, backgroundColor:'purple', color: 'white', borderRadius: '10px' }} /> 
    
      <button onClick={takePicture}>Take Picture</button>
      {imageData && (
        <img src={imageData} alt="Captured Image" />
      )}


      <AiCamera></AiCamera>
    </div>
  );
};

export default MyCamera;


// style={{backgroundColor:'purple', color: 'white', borderRadius: '10px'}}
// style={{ width: 640, height: 480, borderRadius:'10px', border: '10px solid purple', maxWidth:'90%'}}