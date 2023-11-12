import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "./styles.css";
export const Home = () => {
  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        <Row className="justify-content-md-center">
          <Col xs="12" md="6" lg="6">
            <Image
              src="src\assets\image-collage.PNG"
              style={{
                width: "500px",
                height: "500px",
                margin: "auto",
                display: "block",
              }}
            />
          </Col>
          <Col xs="12" md="6" lg="6" style={{ marginTop: "80px" }}>
            <div
              style={{
                textAlign: "center",
                fontFamily: "Open Sans, sans-serif",
              }}
            >
              <h1
                style={{
                  fontWeight: "bolder",
                  fontSize:'80px'
                }}
              >
                Welcome to CO2 Eats
              </h1>
              <p>
                CO2 Eats is an app designed to help track and improve your
                carbon footprint based on your diet.
              </p>
            </div>
            <div
              style={{
                marginTop: "50px",
                fontFamily: "Open Sans, sans-serif",
              }}
            >
              <ol>
                <li>Snap a photo of your meal</li>
                <li>
                  Obtain your meal's carbon footprint and nutritional facts
                </li>
                <li>
                  Find detailed meal alternatives to improve your carbon
                  footprint!
                </li>
              </ol>
            </div>
            <Link to="/uploadImage">
              <Button
                variant="primary"
                style={{
                  margin: "auto",
                  display: "block",
                  marginTop: "50px",
                }}
              >
                Get Started
              </Button>{" "}
            </Link>
            <figcaption
              class="figure-caption"
              style={{
                textAlign: "center",
              }}
            >
              Tap to get started.
            </figcaption>
          </Col>
        </Row>
      </Container>
    </>
  );
};
