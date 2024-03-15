import { useSelector } from "react-redux";
import { getAllAds } from '../../../redux/adsRedux';
import { Row, Card } from 'react-bootstrap';
import Loader from '../../views/Loader/Loader';

const Home = () => {

    const ads = useSelector(getAllAds);

    return (
        <div>
            <h1>NoticeBoard Home Page</h1>
            {(ads.length === 0) && <Loader />}
            <Row>
                {ads.map(ad => <Card key={ad.id} {...ad} />)}
            </Row>
        </div>
    );
};

export default Home;