import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

export const Home = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>CO2eats</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
      <br />
      <Container>
        <Row>
          {/* Can put images in the first column */}
          <Col></Col>
          <Col>
            <Row>
              <Col>
                <p>Welcome to CO2 Eats</p>
                <ListGroup as="ol" numbered>
                  <ListGroup.Item as="li" className="bg-body-dark">
                    Take a picture of your food
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Get your food's carbon footprint and nutritional facts
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Find food alternatives to improve your carbon footprint!
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <Link to="/uploadImage">
                  <Image
                    src="src\assets\camera-icon.svg"
                    roundedCircle
                    style={{ width: "150px", height: "150px" }}
                  />
                </Link>
                <figcaption class="figure-caption">
                  Tap to get started.
                </figcaption>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
