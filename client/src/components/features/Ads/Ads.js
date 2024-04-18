import { useSelector } from "react-redux";
import { getAllAds } from '../../../redux/adsRedux';
import { Col, Row } from 'react-bootstrap';
import Loader from '../../views/Loader/Loader';
import AdAtHomePage from '../../common/AdAtHomePage/AdAtHomePage'


const Ads = () => {

    const ads = useSelector(getAllAds);

    return (
        <>
            {(ads.length === 0) && <Loader />}
            <Row className="m-4">
                {/* {ads.map(ad => <AdAtHomePage key={ad.id} {...ad} />)} */}


                {ads.map((ad) => (
                    <Col key={ad._id} xs='12' md='6' lg='4' className='mb-4 d-flex justify-content-center'>
                        <AdAtHomePage {...ad} key={ad._id} xs='12' md='6' lg='4' className='mb-4'/>
                    </Col>
                ))}


            </Row>
        </>
    )
}

export default Ads;