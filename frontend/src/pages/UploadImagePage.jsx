import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { getFoodMLData, getFoodPrint } from "../api/utils";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "./styles.css";
import Results from "../components/Results";
import { LinearProgress, Stack } from "@mui/material";

const UploadImagePage = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [videoConstraints, setVideoConstraints] = useState({
    width: 550,
    height: 400,
    facingMode: { exact: "environment" },
  });
  const [useCamera, setUseCamera] = useState(false);
  const [firstPage, setFirstPage] = useState(true);
  const [ProgressStatement, setProgressStatement] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleUploadImage = async () => {
    setFirstPage(false);
    setLoading(true);
    setProgressStatement("Receiving image characteristics");
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    const imageD = await getFoodMLData(imgSrc);
    console.log(imageD);
    setProgressStatement("Calculating emission");
    //const data = await getFoodPrint('bread');
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    const data = [
      {
        category: "Grain",
        footprint: 1.23,
        group: "Grains",
        name: "Bread",
        rating_quality: 1,
      },
      {
        category: "Grain",
        footprint: 1.23,
        group: "Grains",
        name: "Bread",
        rating_quality: 1,
      },
      {
        category: "Grain",
        footprint: 1.23,
        group: "Grains",
        name: "Bread",
        rating_quality: 1,
      },
      {
        category: "Grain",
        footprint: 1.23,
        group: "Grains",
        name: "Bread",
        rating_quality: 1,
      },
    ];
    setResults(data);
    setLoading(false);
  };

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  const handleUploadImageFromLocal = async (e) => {
    const res = await getBase64(e.target.files[0]);
    setImgSrc(res);
  };

  return (
    <>
      {firstPage ? (
        <div>
          {useCamera ? (
            <div>
              <Container>
                <Row className="justify-content-md-center">
                  <Col xs="12" md="6" lg="6" style={{ marginTop: "100px" }}>
                    <Webcam
                      style={{
                        borderRadius: "25px",
                      }}
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/png"
                      videoConstraints={videoConstraints}
                      minScreenshotWidth={100}
                      minScreenshotHeight={100}
                    />
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItem: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setVideoConstraints({
                            ...videoConstraints,
                            facingMode:
                              videoConstraints.facingMode === "user"
                                ? { exact: "environment" }
                                : "user",
                          });
                        }}
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
          ) : null}
          <Container>
            <Col>
              <Button
                onClick={() => {
                  setUseCamera(true);
                }}
              >
                Upload from camera
              </Button>
              <input
                type="file"
                id="myFile"
                name="filename"
                onChange={handleUploadImageFromLocal}
              />
              <Button
                onClick={() => {
                  handleUploadImage();
                }}
              >
                Continue
              </Button>
            </Col>
          </Container>
        </div>
      ) : loading ? (
        <div>
          <Container style={{ marginTop: "100px" }}>
            <Row className="justify-content-md-center">
              <Col xs="12" md="6" lg="6" style={{ marginTop: "100px" }}>
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <h1>{ProgressStatement}</h1>
                  <LinearProgress color="secondary" />
                  <LinearProgress color="success" />
                </Stack>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div>
          <Container style={{ marginTop: "100px" }}>
            <Row className="justify-content-md-center">
              <Col xs="12" md="6" lg="6" style={{ marginTop: "50px" }}>
                <img src={imgSrc} style={{ borderRadius: "20px" }} />
              </Col>
              <Col xs="12" md="6" lg="6" style={{ marginTop: "50px" }}>
                <div style={{ height: "80vh", overflowY: "auto" }}>
                  <Results data={results} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default UploadImagePage;
