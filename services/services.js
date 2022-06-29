import axios from 'axios';
import { moviesUrl } from './servicesUrl';


const BASE_UR = "https://api.themoviedb.org/3";
const API_KEY = "api_key=fefa9c369cd17b76463335d240ac21ee"


// Get Popular Movies
export const getPopularMovies = async () => {
    const resp = await axios.get(`${BASE_UR}/movie/popular/?${API_KEY}`);
    return resp.data.results;
};


// Get Upcoming Movies
export const getUpcomingMovies = async () => {
    const resp = await axios.get(`${BASE_UR}/movie/upcoming/?${API_KEY}`);
    return resp.data.results;
};


// Get Popular TV
export const getPopularTv = async () => {
    const resp = await axios.get(`${BASE_UR}/tv/popular/?${API_KEY}`);
    return resp.data.results;
};
