import { updateSearchstring } from '../../../redux/searchStringRedux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const SearchForm = (props) => {

    const searchString = useSelector(state => state.searchString);

    const dispatch = useDispatch();

    const handleChange = e => {
        e.preventDefault();
        updateSearchstring();
        dispatch(updateSearchstring(e.target.value));
    };

    return (
        <Form className="col-12 col-sm-3 mx-auto text-center" onSubmit={handleChange}>
            <h1 className="my-4">Search</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    action={props.action}
                    defaultValue={searchString}
                    onChange={handleChange}
                />
            </InputGroup>
            <Button>Search</Button>
        </Form>
    )
}

export default SearchForm;