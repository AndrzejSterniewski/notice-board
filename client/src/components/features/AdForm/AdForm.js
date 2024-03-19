import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AdForm = () => {

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [picture, setPicture] = useState('');
    const [location, setLocation] = useState('');
    const [userInfo, setUserInfo] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        // <Form onSubmit={validate(handleSubmit)}>
        < Form className="col-12 col-sm-3 mx-auto text-center" onSubmit={handleSubmit} >
            <h1 className="my-4">Add ad</h1>
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
                    value={picture}
                    onChange={e => setPicture(e.target.files)} />
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

            <Form.Group className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Control
                    type="text"
                    value={userInfo}
                    onChange={e => setUserInfo(e.target.value)}
                    placeholder="User"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Publish
            </Button>

        </Form>
    )
}

export default AdForm;