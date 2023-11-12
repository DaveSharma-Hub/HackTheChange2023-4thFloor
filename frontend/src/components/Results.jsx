import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Tooltip from '@mui/material/Tooltip';
import { Button } from "@mui/material";
// eslint-disable-next-line react/prop-types
export default function Results({ data, imgSrc }) {
  return (
    <Container style={{ width: "100vw" }}>
      <Button onClick={()=>{window.location.reload()}}>
        Upload another image
      </Button>
      <Row>
        <Col xs="6" md="6" lg="6" style={{ marginTop: "50px" }}>
          <Row>
            <h2>{data.predicted?.predictedLabel}</h2>
            <img src={imgSrc} style={{ borderRadius: "20px" }} />
          </Row>
          <Tooltip title="Find foods in the same category that have better carbon footprints" arrow>
            <h4>Alternatives with better footprints:</h4>
          </Tooltip>
          <Row style={{display:'grid', gridTemplateColumns:'auto auto auto'}}>
            {
                // eslint-disable-next-line react/prop-types
                data.betterFootprints?.map(
                  ({ category, footprint, group, name, rating_quality }, index) => {
                    return (
                      <Card key={index} style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Title>{name}</Card.Title>
                          <Card.Text>{category}</Card.Text>
                          <Card.Text>{footprint}</Card.Text>
                          <Card.Text>{rating_quality}</Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  }
                )
              }
          </Row>
        </Col>
        <Col>
          <Row className="justify-content-md-center">
            <Col xs="3" md="6" lg="6">
              <h4>Food Recognized as</h4>
              {data.predicted?.topScores?.map(({ label, score }, index) => {
                return (
                  <Card key={index} style={{ width: "15rem" }}>
                    <Card.Body>
                      <Card.Title>Prediction: {label}</Card.Title>
                      <Card.Text>Confidence: {score}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
            <Col xs="6" md="6" lg="6" style={{height: "80vh", overflowY: "auto"}}>
            <h4>Carbon footprint information:</h4>
              {
                // eslint-disable-next-line react/prop-types
                data.foodprint?.map(
                  ({ category, footprint, group, name, rating_quality }, index) => {
                    return (
                      <Card key={index} style={{ width: "15rem" }}>
                        <Card.Body>
                          <Card.Title>Name: {name}</Card.Title>
                          <Card.Text>Food Category: {category}</Card.Text>
                          <Card.Text>
                          <Tooltip title="Computed carbon footprint for the specific product" arrow>
                            Foodprint:{footprint} <i> CO2 eq/kg </i>
                          </Tooltip>
                          </Card.Text>
                          <Card.Text>
                            <Tooltip title="Rating quality of footprint field 1:highest, 5: lowest" arrow>
                                Rating quality: {rating_quality}
                            </Tooltip>
                            </Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  }
                )
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
