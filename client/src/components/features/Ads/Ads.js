import { useSelector } from "react-redux";
import { getAllAds } from '../../../redux/adsRedux';
import { Row } from 'react-bootstrap';
import Loader from '../../views/Loader/Loader';
import Ad from '../../common/Ad/Ad';

const Ads = () => {

    const ads = useSelector(getAllAds);

    return (
        <>
            {(ads.length === 0) && <Loader />}
            <Row>
                {ads.map(ad => <Ad key={ad.id} {...ad} />)}
            </Row>
        </>
    )
}

export default Ads;