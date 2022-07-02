import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaryMovies } from '../services/services';

const dimensions = Dimensions.get('screen');

const Home = () => {

    const [moviesImages, setMoviesImages] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [familyMovies, setFamilyMovies] = useState();
    const [documentaryMovies, setDocumentaryMovies] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getPopularTv(),
            getFamilyMovies(),
            getDocumentaryMovies(),
        ])
    }

    useEffect(() => {
        getData().then(
            ([
                upcomingMoviesData,
                popularMoviesData,
                popularTvData,
                familyMoviesData,
                documentaryMoviesData,
            ]) => {
                const moviesImagesArray = [];
                upcomingMoviesData.forEach(item => {
                    moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + item.poster_path)
                });
                setMoviesImages(moviesImagesArray);
                setPopularMovies(popularMoviesData);
                setPopularTv(popularTvData);
                setFamilyMovies(familyMoviesData);
                setDocumentaryMovies(documentaryMoviesData);
                setIsLoading(false);
            }
        )
            .catch(
                err => {
                    setError(err);
                })
            .finally(
                () => {
                    setIsLoading(false);
                }
            )

    }, [])



    return (
        <React.Fragment>
            <ActivityIndicator size="large" color="#76BA99" />
        </React.Fragment>
    );
};


const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    sliderDots: {
        height: 0
    },
    carousel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Home;