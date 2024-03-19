import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { API_URL } from '../../../config';
import Loader from '../../views/Loader/Loader';

const AdForm = () => {

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [picture, setPicture] = useState(null);
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = e => {

        e.preventDefault();

        const fd = new FormData();
        fd.append('text', text);
        fd.append('title', title);
        fd.append('date', date);
        fd.append('picture', picture);
        fd.append('location', picture);

        const options = {
            method: 'POST',
            body: fd
        };

        setStatus('loading');
        fetch(`${API_URL}/ad/add`, options)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success');
                }
                else if (res.status === 400) {
                    setStatus('clientError');
                }
                else {
                    setStatus('serverError');
                }
            })
            .catch((err) => {
                setStatus('serverError');
            });
    };

    return (
        // <Form onSubmit={validate(handleSubmit)}>
        < Form className="col-12 col-sm-3 mx-auto text-center" onSubmit={handleSubmit} >

            <h1 className="my-4">Add ad</h1>

            {status === 'success' && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have successfully added your ad.</p>
                </Alert>
            )}

            {status === 'serverError' && (
                <Alert Alert variant="danger">
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
                    onChange={e => setDate(e.target.vale)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Pictures</Form.Label>
                <Form.Control
                    type="file"
                    // value={picture}
                    onChange={e => setPicture(e.target.files[0])} />
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