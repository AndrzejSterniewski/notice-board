import { Col, Card, ListGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { IMGS_URL } from '../../../config';

const Ad = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    return (
        // <Col sm={3} className="p-2 text-center">
            //  {/* <Card sm={3} className="p-2 text-center"> */}
            // {/* <Card> */}
                <Card style={{ width: '20rem' }} className="text-center">
                    <Card.Img variant="top" src={IMGS_URL + props.picture} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{props.location}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="primary" as={Link} to={`/ad/${props._id}`}>Details</Button>
                        {/* <Button variant="danger" as={Link} to={`/ad/remove/${props.id}`}>Remove</Button> */}
                    </Card.Body>
                </Card>
            // {/* </Card> */}
        // </Col>
    )
}

export default Ad;