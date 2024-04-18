import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { API_URL } from '../../../config';
import Loader from '../../views/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { addAd } from '../../../redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';

const AdForm = (props) => {

    const [text, setText] = useState(props.text || '');
    const [title, setTitle] = useState(props.title || '');
    const [date, setDate] = useState(props.date || '');
    const [picture, setPicture] = useState(props.picture || null);
    const [price, setPrice] = useState(props.price || '');
    const [location, setLocation] = useState(props.location || '');
    
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleSubmit = e => {

        e.preventDefault();

        const fd = new FormData();
        fd.append('text', text);
        fd.append('title', title);
        fd.append('date', date);
        fd.append('picture', picture);
        fd.append('price', price);
        fd.append('location', location);

        const options = {
            method: 'POST',
            body: fd
        };

        setStatus('loading');
        fetch(`${API_URL}/api/ads`, options)
            .then(res => {
                if (res.status === 200) {
                    setStatus('success');
                }
                else if (res.status === 400) {
                    setStatus('clientError');
                }
                else {
                    setStatus('serverError');
                }
                return res.json()
            })
            .then(res => {
                dispatch(addAd(
                    {
                        text,
                        title,
                        date,
                        picture: res.picture,
                        price,
                        location
                    }
                ));
                navigate('/');
            }
            )
            .catch((err) => {
                setStatus('serverError');
            });
    };

    if(!user) return <div>You are not logged in!</div>
    return (
        // <Form onSubmit={validate(handleSubmit)}>
        < Form className="col-12 col-sm-3 mx-auto text-center" onSubmit={handleSubmit} >

            {status === 'success' && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have successfully added your ad.</p>
                </Alert>
            )}

            {status === 'serverError' && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again.</p>
                </Alert>
            )}

            {status === 'clientError' && (
                <Alert variant="danger">
                    <Alert.Heading>Not enough data</Alert.Heading>
                    <p>You have to fill all the fields.</p>
                </Alert>
            )}

            {status === 'loading' && (
                <Loader />
            )}

            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter title"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Description..."
                    style={{ height: '100px' }}
                    value={text}
                    onChange={e => setText(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Pictures</Form.Label>
                <Form.Control
                    type="file"
                    // value={picture}
                    onChange={e => setPicture(e.target.files[0])} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Enter price"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Enter location</Form.Label>
                <Form.Control
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Location"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Publish
            </Button>

        </Form>
    )
}

export default AdForm;