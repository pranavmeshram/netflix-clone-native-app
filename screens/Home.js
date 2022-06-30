import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import { getPopularMovies, getUpcomingMovies } from '../services/services';

const dimensions = Dimensions.get('screen');

const Home = () => {

    const [moviesImages, setMoviesImages] = useState('');
    const [popularMovies, setPopularMovies] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        getUpcomingMovies().then(movies => {
            const moviesImagesArray = [];
            movies.forEach(item => {
                moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + item.poster_path)
            });
            setMoviesImages(moviesImagesArray);
        })

        getPopularMovies().then(movies => {
            setPopularMovies(movies)
        }).catch(err => {
            setError(err);
        });
    }, [])



    return (
        <React.Fragment>
            <View style={styles.sliderContainer}>
                <SliderBox
                    images={moviesImages}
                    sliderBoxHeight={dimensions.height / 1.5}
                    dotStyle={styles.sliderDots}
                    autoplay={true}
                    circleLoop={true}
                />
            </View>

            <View style={styles.carousel}>
                <List title="Popular Movies" content={popularMovies} />
            </View>
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