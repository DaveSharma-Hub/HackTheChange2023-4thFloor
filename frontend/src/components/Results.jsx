import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";

// eslint-disable-next-line react/prop-types
export default function Results({ data }) {
  return (
    <Container style={{ width: "50vw" }}>
      <Row className="justify-content-md-center">
        <Col xs="3" md="6" lg="6">
          {<h2>{data.predicted?.predictedLabel}</h2>}
          {data.predicted?.topScores?.map(({ label, score }, index) => {
            return (
              <Card key={index} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Prediction: {label}</Card.Title>
                  <Card.Text>Confidence: {score}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
        <Col xs="3" md="6" lg="6">
          {
            // eslint-disable-next-line react/prop-types
            data.foodprint?.map(
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
        </Col>
      </Row>
      <Row>
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
    </Container>
  );
}
