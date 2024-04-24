import { Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getAdById, removeAdRequest } from "../../../redux/adsRedux";
import { useDispatch, useSelector } from "react-redux";
import { IMGS_URL } from '../../../config';

const Ad = () => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const ad = useSelector((state) => getAdById(state, params.id));

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteAd = AdId => {
        dispatch(removeAdRequest(AdId));
        navigate('/');
    };

    return (
        <Col className="d-flex justify-content-center">
                <Card style={{  width: '20rem' }} className="text-center">
                    <Card.Img variant="top" src={IMGS_URL + ad.picture} className="object-fit-cover"/>
                    <Card.Body>
                        <Card.Title>{ad.title}</Card.Title>
                        <Card.Text>
                            {ad.text}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{ad.price}</ListGroup.Item>
                        <ListGroup.Item>{new Date(ad.date).toLocaleDateString()}</ListGroup.Item>
                        <ListGroup.Item>{ad.location}</ListGroup.Item>
                        <ListGroup.Item>{ad.userInfo}</ListGroup.Item>
                    </ListGroup>
                    {user &&
                    (<Card.Body>
                        <Button variant="primary" as={Link} to={`/ad/edit/${ad._id}`}  className="mx-2">Edit</Button>
                        <Button variant="danger" onClick={handleShow} className="mx-2">Delete</Button>
                    </Card.Body>)
                    }
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>The operation will completely remove this ad from the app. <br /> Are you sure you want to do that?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => deleteAd(ad._id)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
        </Col>
    )
}

export default Ad;