import { Card, ListGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config';

const Ad = (props) => {

    return (
                <Card style={{ width: '20rem' }} className="text-center">
                    <Card.Img variant="top" src={IMGS_URL + props.picture} style={{ height: '20rem' }} className="object-fit-cover"/>
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{props.location}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="primary" as={Link} to={`/ad/${props._id}`}>Details</Button>
                    </Card.Body>
                </Card>
    )
}

export default Ad;