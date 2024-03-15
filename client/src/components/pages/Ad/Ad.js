import { Container, Card, ListGroup } from "react-bootstrap";

const Ad = () => {
    return (
        <Container>
            <div>Ad</div>
            <Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                        <Card.Title>Ad Title</Card.Title>
                        <Card.Text>
                            Ad text written in this place.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Price</ListGroup.Item>
                        <ListGroup.Item>Date</ListGroup.Item>
                        <ListGroup.Item>Location</ListGroup.Item>
                        <ListGroup.Item>User Info</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">1st link</Card.Link>
                        <Card.Link href="#">2nd link</Card.Link>
                    </Card.Body>
                </Card>
            </Card>

        </Container>
    );
};

export default Ad;