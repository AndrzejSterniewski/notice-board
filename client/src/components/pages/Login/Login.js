import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../../views/Loader/Loader';
import { API_URL } from '../../../config';
import { logIn } from '../../../redux/userRedux';
import { useNavigate } from "react-router-dom"

const Login = () => {

    const user = useSelector((state) => state.user);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        console.log(login, password);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        };

        setStatus('loading');
        fetch(`${API_URL}/auth/login`, options)
            .then(res => {
                if (res.status === 200) {
                    setStatus('success');
                    dispatch(logIn({ login }));
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
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
        <div>

            <Form className="col-12 col-sm-3 mx-auto text-center" onSubmit={handleSubmit}>

                <h1 className="my-4">Log in</h1>

                {status === 'success' && (
                    <Alert variant="success">
                        <Alert.Heading>Success!</Alert.Heading>
                        <p>Welcome back {login}! You have been successfully logged in.</p>
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
                        <Alert.Heading>Incorrect data</Alert.Heading>
                        <p>Login or password are incorrect.</p>
                    </Alert>
                )}

                {status === 'loginError' && (
                    <Alert variant="warning">
                        <Alert.Heading>Wrong login or password.</Alert.Heading>
                        <p>Wrong login or password.</p>
                    </Alert>
                )}

                {status === 'loading' && (
                    <Loader />
                )}

                {!user &&
                    <>
                        <Form.Group className="mb-3" controlId="formLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Log in
                        </Button>
                    </>
                }
            </Form>

        </div>
    );
};

export default Login;