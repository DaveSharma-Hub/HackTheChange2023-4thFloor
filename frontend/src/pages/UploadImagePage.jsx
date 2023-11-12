import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { getFoodPrint } from "../api/utils";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "./styles.css";
import borderImage from './border.png';
import Results from "../components/Results";

const UploadImagePage = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [ videoConstraints, setVideoConstraints] = useState({
    width: 500,
    height: 400,
    facingMode: { exact: "environment" },
  });
  const [useCamera, setUseCamera] = useState(false);
  const [firstPage, setFirstPage] = useState(true);
  const [ProgressStatement, setProgressStatement] = useState('');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleUploadImage = async() => {
    setFirstPage(false);
    setLoading(true);
    setProgressStatement('Receiving image characteristics');
    //await new Promise((res)=>{setTimeout(res,1000)});
    setProgressStatement('Calculating emission');
    const data = await getFoodPrint('bread');
    //await new Promise((res)=>{setTimeout(res,1000)});
    setResults(data);
    setLoading(false);
  }

  return (
    <>
    {
      firstPage ?
      <div>
        {
        useCamera ? 
        <div>
            <Container style={{ marginTop: "100px" }}>
               <Row className="justify-content-md-center">
                <Col xs="12" md="6" lg="6" style={{ marginTop: "100px" }}>
                        <img src={borderImage}/>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/png"
                            videoConstraints={videoConstraints}
                            minScreenshotWidth={100}
                            minScreenshotHeight={100}
                        />
                    <Col>
                        <Button onClick={()=>{
                            setVideoConstraints({
                                ...videoConstraints,
                                facingMode: videoConstraints.facingMode === 'user' ? { exact: "environment" } : 'user',
                            })}}
                        >
                            Flip Camera
                        </Button>
                        <Button onClick={capture}>Capture Photo</Button>
                    </Col>
                    {imgSrc && <img src={imgSrc} alt="img" />}
                </Col>
                </Row>
            </Container>
            </div>
            : null
        }
        <button onClick={()=>{setUseCamera(true)}}>Upload from camera</button>
        <button onClick={()=>{handleUploadImage()}}>Upload</button>
      </div>
      : 
      loading 
      ?
      <div>
        <Box sx={{ display: 'flex' }}>
            <h1>{ProgressStatement}</h1>
            <CircularProgress />
        </Box>
      </div>
      :
      <div>
        <img src={imgSrc} />
        <Results data={results} />
      </div>
    }
    </>
  );
};

export default UploadImagePage;