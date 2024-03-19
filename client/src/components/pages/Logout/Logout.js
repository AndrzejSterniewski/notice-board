import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../../config';
import { logOut } from '../../../redux/userRedux';

const Logout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: 'DELETE',
        };

        fetch(`${API_URL}/auth/logout`, options)
            .then(() => {
                dispatch(logOut());
            });
    }, [dispatch]);

    return null;
};

export default Logout;