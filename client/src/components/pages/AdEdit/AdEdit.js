import { Container } from "react-bootstrap";
import EditAdForm from "../../features/EditAdForm/EditAdForm";

const AdEdit = () => {
    return (
        <Container>
            <h1 className="text-center">Edit ad</h1>
            <EditAdForm />
        </Container>
    );
};

export default AdEdit;