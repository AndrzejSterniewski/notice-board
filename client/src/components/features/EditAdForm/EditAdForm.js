import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { getAdById, updateAd } from '../../../redux/adsRedux';
import AdForm from '../AdForm/AdForm';

const EditAdForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const ad = useSelector(state => getAdById(state, id));

    const handleSubmit = ad => {
        dispatch(updateAd({ ...ad, _id: id }));
        navigate('/')
    };

    if (!ad) return <Navigate to="/" />
    else return (
        <AdForm action={handleSubmit} variant="edit" actionText="Edit ad" id={ad._id} title={ad.title} text={ad.text} date={ad.date} picture={ad.picture} price={ad.price} location={ad.location} />
    )
};

export default EditAdForm;