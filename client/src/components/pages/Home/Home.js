import { useSelector } from "react-redux";
import { getAllAds } from '../../../redux/adsRedux';
import { Row, Card, Container } from 'react-bootstrap';
import Loader from '../../views/Loader/Loader';

const Home = () => {

    const ads = useSelector(getAllAds);

    return (
        <Container>
            <h1>NoticeBoard Home Page</h1>
            {(ads.length === 0) && <Loader />}
            <Row>
                {ads.map(ad => <Card key={ad.id} {...ad} />)}
            </Row>
        </Container>
    );
};

export default Home;