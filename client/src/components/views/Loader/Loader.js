import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <>
            <Spinner animation="border" role="status" className="block mx-auto d-flex justify-content-center">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>
    );
};

export default Loader;