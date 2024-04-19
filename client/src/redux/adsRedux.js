import { API_URL } from '../config';
import { nanoid } from 'nanoid';

//selectors
export const getAllAds = (state => state.ads.filter(ad => ad.title.toLowerCase().includes(state.searchString.toLowerCase())));
export const getAdById = ({ ads }, id) => ads.find(ad => ad._id === id);

//actions
const createActionName = actionName => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const UPDATE_AD = createActionName('UPDATE_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

//action creators
export const loadAds = payload => ({ type: LOAD_ADS, payload });
export const addAd = payload => ({ type: ADD_AD, payload });
export const updateAd = payload => ({ type: UPDATE_AD, payload });
export const removeAd = payload => ({ type: REMOVE_AD, payload });

export const loadAdsRequest = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_URL}/api/ads`);
            const data = await response.json();
            console.log(data);
            dispatch(loadAds(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const removeAdRequest = (id) => {
    return async (dispatch) => {
        try {
            const options = {
                method: 'DELETE',
                // credentials: 'include',
                // przywrócić gdy będzie połączona apka w jedna całość
            };
            await fetch(`${API_URL}/api/ads/${id}`, options);
            dispatch(removeAd(id));
        } catch (error) {
            console.log(error);
        }
    };
};

const adsReducer = (statePart = [], action) => {
    switch (action.type) {
        case LOAD_ADS:
            return [...action.payload];
        case ADD_AD:
            return [...statePart, { ...action.payload, _id: nanoid() }]
        case UPDATE_AD:
            return statePart.map((ad) => ad._id === action.payload._id ? { ...ad, ...action.payload } : ad);
        case REMOVE_AD:
            return statePart.filter((ad) => ad._id !== action.payload);
        default:
            return statePart;
    };
};


export default adsReducer;