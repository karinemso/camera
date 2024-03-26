import React, { useState, useRef, useEffect } from 'react';

const MyCamera = () => {
  const [imageData, setImageData] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const accessCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const drawFaceGuide = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const faceWidth = canvas.width * 0.8; // Adjust size as needed
    const faceHeight = faceWidth * 1.5;
    const faceX = (canvas.width - faceWidth) / 2;
    const faceY = (canvas.height - faceHeight) / 2;

    context.strokeStyle = '#0000FF';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(faceX, faceY);
    context.lineTo(faceX + faceWidth, faceY);
    context.lineTo(faceX + faceWidth, faceY + faceHeight);
    context.lineTo(faceX, faceY + faceHeight);
    context.closePath();
    context.stroke();
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

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      drawFaceGuide();
    }
  }, [videoRef, canvasRef]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: 640, height: 480, borderRadius:'10px', border: '10px solid purple', maxWidth:'90%'}} />
      <canvas ref={canvasRef} width={640} height={480} />
      <button style={{backgroundColor:'purple', color: 'white', borderRadius: '10px'}} onClick={takePicture}>Take Picture</button>
      {imageData && (
        <img src={imageData} alt="Captured Image" />
      )}
    </div>
  );
};

export default MyCamera;