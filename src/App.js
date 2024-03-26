import React, { useState, useRef, useEffect } from 'react';

const MyCamera = () => {
  const [imageData, setImageData] = useState(null);
  const [enabledCamera, setEnabledCamera] = useState(null)
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const accessCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log(stream)
      videoRef.current.srcObject = stream;
      setEnabledCamera(true)
    } catch (error) {

      setEnabledCamera(true)
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
    <div style={{width:"100%", height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      {/* Canvas positioned on top with opacity for visibility */}
      
     {enabledCamera? <div style={{ width: '80%', height: 480 , border:"10px solid purple", borderRadius:'10px', position:'relative'}}>
      {/* <div style={{width:'200px', height:'250px', borderRadius:'100%', border:"5px solid purple", position:'absolute', top:'calc(50% - 150px )', right:'calc(50% - 100px )'}}></div> */}
      <video ref={videoRef} autoPlay muted style={{ width: '100%', color: 'white', borderRadius: '10px' }} />
      </div> :
     
     "Não conseguimos acessar sua câmera!"}
      <button onClick={takePicture} disabled={!enabledCamera}>Take Picture</button>
      {imageData && (
        <img src={imageData} alt="Captured Image" />
      )}
    </div>
  );
};

export default MyCamera;


// style={{backgroundColor:'purple', color: 'white', borderRadius: '10px'}}
// style={{ width: 640, height: 480, borderRadius:'10px', border: '10px solid purple', maxWidth:'90%'}}