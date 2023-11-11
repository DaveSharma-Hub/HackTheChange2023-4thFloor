import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";


const UploadImagePage = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [ videoConstraints, setVideoConstraints] = useState({
    width: 640,
    height: 480,
    facingMode: { exact: "environment" },
  });

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        minScreenshotWidth={180}
        minScreenshotHeight={180}
      />
      <button onClick={()=>{
        setVideoConstraints({
            ...videoConstraints,
            facingMode: videoConstraints.facingMode === 'user' ? { exact: "environment" } : 'user',
        })
      }}>Flip Camera</button>
      <button onClick={capture}>Capture Photo</button>
      {imgSrc && <img src={imgSrc} alt="img" />}
    </>
  );
};

export default UploadImagePage;