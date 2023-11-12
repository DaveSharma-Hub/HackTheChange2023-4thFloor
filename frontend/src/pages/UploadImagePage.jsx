import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { getBetterFootprintFoods, getFoodMLData, getFoodPrint } from "../api/utils";
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
  const bottomEnd = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [videoConstraints, setVideoConstraints] = useState({
    width: 550,
    height: 400,
    facingMode: "user",
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
    let { predictedLabel, topScores } = await getFoodMLData(imgSrc);
    //console.log(predictedLabel, topScores);
    setProgressStatement("Calculating emission");
    predictedLabel = predictedLabel.replace("_", " ");
    //const foodprint = await getFoodPrint(predictedLabel);
    //console.log(foodprint);
    const foodprint = [
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
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    //const betterFootprints = await getBetterFootprintFoods(foodprint, foodprint[0].category);

    const data = {
      predicted: {
        predictedLabel,
        topScores
        // :[
        //   {
        //     label:'Food1',
        //     score:1.0
        //   },
        //   {
        //     label:'Food2',
        //     score:0.45 
        //   },
        //   {
        //     label:'Food3',
        //     score:0.65
        //   }
        // ],
      },
      foodprint,
      betterFootprints : [
            {
                category: "Grain",
                footprint: 1.25,
                group: "Grains",
                name: "Bread",
                rating_quality: 1,
              },
              {
                category: "Grain",
                footprint: 1.25,
                group: "Grains",
                name: "Bread",
                rating_quality: 1,
              },
      ]
    };

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
                        className="bg-inherit"
                        style={{
                          margin: "auto",
                          marginTop: "25px",
                          marginBottom: "25px",
                          display: "block",
                          textAlign: "center",
                          width: "30%",
                          height: "200%",
                          borderRadius:'20px'
                        }}
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
                      <Button
                        variant="outline-info"
                        style={{
                          margin: "auto",
                          marginTop: "25px",
                          marginBottom: "25px",
                          display: "block",
                          textAlign: "center",
                          width: "50%",
                          height: "200%",
                          borderRadius:'20px'
                        }}
                        onClick={capture}
                      >
                        Capture Photo
                      </Button>
                    <Button
                      style={{
                        margin: "auto",
                        marginTop: "25px",
                        marginBottom: "25px",
                        display: "block",
                        textAlign: "center",
                        width: "15%",
                        borderRadius:'20px'
                      }}
                      onClick={()=>{bottomEnd.current?.scrollIntoView({ behavior: "smooth" })}}
                    >
                      Preview
                    </Button>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            <div style={{ height: "40vh" }}></div>
          )}
          <Container>
            <Row className="justify-content-md-center">
              <Col xs="12" md="12" lg="12">
                <Button
                  variant="outline-primary"
                  style={{
                    margin: "auto",
                    display: "block",
                    textAlign: "center",
                    width: "500px",
                    height: "100px",
                    borderRadius:'20px'
                  }}
                  onClick={() => {
                    setUseCamera(true);
                  }}
                >
                  Use Camera
                </Button>
              </Col>
              <Col xs="12" md="12" lg="12">
                <Button
                  variant="outline-secondary"
                  style={{
                    margin: "auto",
                    marginBottom: "50px",
                    display: "block",
                    textAlign: "center",
                    width: "500px",
                    height: "100px",
                    marginTop: "50px",
                    borderRadius:'20px'
                  }}
                >
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="myFile"
                    name="filename"
                    onChange={handleUploadImageFromLocal}
                  />
                  <label for="myFile">Upload from Gallery</label>
                </Button>
              </Col>
              <Col xs="6" md="6" lg="6">
                <div style={{display:'flex'}}>
                  <div>
                  {imgSrc && <img src={imgSrc} alt="img" style={{width:'50vw'}} ref={bottomEnd}/>}
                  </div>
                  {imgSrc ? (
                    <Button
                      onClick={() => {
                        handleUploadImage();
                      }}
                    >
                      Continue
                    </Button>
                  ) : null}
                </div>
              </Col>
            </Row>
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
            <Results data={results} imgSrc={imgSrc}/>
            {/* <Row className="justify-content-md-center">
              <Col xs="12" md="6" lg="6" style={{ marginTop: "50px" }}>
               
              </Col>
            </Row> */}
          </Container>
        </div>
      )}
    </>
  );
};

export default UploadImagePage;
