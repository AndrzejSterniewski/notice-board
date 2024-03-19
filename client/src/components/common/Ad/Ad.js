import { Col, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Ad = (props) => {
    return (
        <Col>
            <Card sm={4} className="p-2">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text>
                            {props.text}
                        </Card.Text>
                        <Card.Img>

                        </Card.Img>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{props.price}</ListGroup.Item>
                        <ListGroup.Item>{props.date}</ListGroup.Item>
                        <ListGroup.Item>{props.location}</ListGroup.Item>
                        <ListGroup.Item>{props.userInfo}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="primary" as={Link} to={`/ad/edit/${props.id}`}>Edit</Button>
                        <Button variant="danger" as={Link} to={`/ad/remove/${props.id}`}>Remove</Button>
                    </Card.Body>
                </Card>
            </Card>
        </Col>
    )
}

export default Ad;