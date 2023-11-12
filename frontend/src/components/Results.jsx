import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Card from 'react-bootstrap/Card';

// eslint-disable-next-line react/prop-types
export default function Results({data}){
    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col xs="6" md="6" lg="6">
                    {
                        // eslint-disable-next-line react/prop-types
                        data?.map(({category, footprint, group, name, rating_quality},index)=>{
                            return (
                                <Card key={index} style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                        <Card.Text>
                                            {category}
                                        </Card.Text>
                                        <Card.Text>
                                            {footprint}
                                        </Card.Text>
                                        <Card.Text>
                                            {rating_quality}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

