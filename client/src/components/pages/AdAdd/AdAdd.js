import { Container } from "react-bootstrap";
import AddAdForm from "../../features/AddAdForm/AddAdForm";

const AdAdd = () => {
    return (
        <Container>
            <h1 className="text-center">Add ad</h1>
            <AddAdForm />
        </Container>
    );
};

export default AdAdd;