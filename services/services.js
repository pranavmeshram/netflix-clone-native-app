import axios from 'axios';
import { moviesUrl } from './servicesUrl';


const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=fefa9c369cd17b76463335d240ac21ee"


// Get Upcoming Movies
export const getUpcomingMovies = async () => {
    const resp = await axios.get(`${BASE_URL}/movie/upcoming/?${API_KEY}`);
    return resp.data.results;
};


// Get Popular Movies
export const getPopularMovies = async () => {
    const resp = await axios.get(`${BASE_URL}/movie/popular/?${API_KEY}`);
    return resp.data.results;
};


// Get Popular TV
export const getPopularTv = async () => {
    const resp = await axios.get(`${BASE_URL}/tv/popular/?${API_KEY}`);
    return resp.data.results;
};


// Get Family Movies
export const getFamilyMovies = async () => {
    const resp = await axios.get(`${BASE_URL}/discover/movie/?${API_KEY}&with_genres=10751`);
    return resp.data.results;
};


// Get Documentery Movies
export const getDocumentaryMovies = async () => {
    const resp = await axios.get(`${BASE_URL}/discover/movie/?${API_KEY}&with_genres=99`);
    return resp.data.results;
};


// Get Details Movies
export const getDetails = async (id, type = 'movie') => {
    const resp = await axios.get(`${BASE_URL}/${type}/${id}?${API_KEY}`);
    return resp.data;
};