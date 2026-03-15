import React, { useRef, useState, useEffect } from "react";

const IdentityVerification = () => {

  const videoRef = useRef(null);
  const photoCanvasRef = useRef(null);
  const signatureCanvasRef = useRef(null);
  const mergeCanvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    startCamera();
  }, []);

  // START CAMERA
  const startCamera = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      videoRef.current.srcObject = stream;

    } catch (error) {

      console.log("Camera error:", error);

    }

  };

  // CAPTURE PHOTO
  const capturePhoto = () => {

    const video = videoRef.current;
    const canvas = photoCanvasRef.current;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setPhoto(image);

    // STOP CAMERA AFTER CAPTURE

    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());

  };

  // SIGNATURE DRAWING START

  const startDrawing = (e) => {

    const canvas = signatureCanvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    setIsDrawing(true);

  };

  // DRAW

  const draw = (e) => {

    if (!isDrawing) return;

    const canvas = signatureCanvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();

  };

  // STOP DRAWING

  const stopDrawing = () => {

    setIsDrawing(false);

  };

  // CLEAR SIGNATURE

  const clearSignature = () => {

    const canvas = signatureCanvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

  };

  // GENERATE VERIFICATION CARD

  const generateCard = () => {

    const canvas = mergeCanvasRef.current;
    const ctx = canvas.getContext("2d");

    const photoImg = new Image();
    const signatureImg = new Image();

    photoImg.src = photo;
    signatureImg.src = signatureCanvasRef.current.toDataURL();

    photoImg.onload = () => {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = "20px Arial";
      ctx.fillText("Employee Verification Card", 70, 30);

      ctx.drawImage(photoImg, 100, 50, 200, 150);

      signatureImg.onload = () => {

        ctx.fillText("Signature:", 50, 250);

        ctx.drawImage(signatureImg, 150, 220, 200, 80);

      };

    };

  };

  // DOWNLOAD CARD

  const downloadCard = () => {

    const canvas = mergeCanvasRef.current;

    const link = document.createElement("a");

    link.download = "verification-card.png";
    link.href = canvas.toDataURL();

    link.click();

  };

  return (

    <div style={{ marginTop: "40px" }}>

      <h2>Identity Verification</h2>

      {/* CAMERA VIDEO */}

      <video
        ref={videoRef}
        autoPlay
        style={{ width: "300px", border: "2px solid black" }}
      />

      <br /><br />

      <button onClick={capturePhoto}>
        Capture Photo
      </button>

      <canvas
        ref={photoCanvasRef}
        style={{ display: "none" }}
      />

      {/* PHOTO PREVIEW */}

      {photo && (

        <div>

          <h3>Captured Photo</h3>

          <img
            src={photo}
            alt="captured"
            style={{ width: "300px" }}
          />

        </div>

      )}

      {/* SIGNATURE PAD */}

      <h3>Signature Pad</h3>

      <canvas
        ref={signatureCanvasRef}
        width="400"
        height="150"
        style={{
          border: "2px solid black",
          background: "#fff"
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <br /><br />

      <button onClick={clearSignature}>
        Clear Signature
      </button>

      <br /><br />

      {/* MERGE CANVAS */}

      <h3>Verification Card</h3>

      <canvas
        ref={mergeCanvasRef}
        width="400"
        height="350"
        style={{
          border: "2px solid black"
        }}
      />

      <br /><br />

      <button onClick={generateCard}>
        Generate Verification Card
      </button>

      <br /><br />

      <button onClick={downloadCard}>
        Download Card
      </button>

    </div>

  );

};

export default IdentityVerification;