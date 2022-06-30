import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, ScrollView } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaryMovies } from '../services/services';

const dimensions = Dimensions.get('screen');

const Home = () => {

    const [moviesImages, setMoviesImages] = useState('');
    const [popularMovies, setPopularMovies] = useState('');
    const [popularTv, setPopularTv] = useState('');
    const [familyMovies, setFamilyMovies] = useState('');
    const [documentaryMovies, setDocumentaryMovies] = useState('');
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

        getPopularTv().then(movies => {
            setPopularTv(movies)
        }).catch(err => {
            setError(err);
        });

        getFamilyMovies().then(movies => {
            setFamilyMovies(movies)
        }).catch(err => {
            setError(err);
        });

        getDocumentaryMovies().then(movies => {
            setDocumentaryMovies(movies)
        }).catch(err => {
            setError(err);
        });

    }, [])



    return (
        <React.Fragment>
            <ScrollView>

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

                <View style={styles.carousel}>
                    <List title="Popular Tv" content={popularTv} />
                </View>

                <View style={styles.carousel}>
                    <List title="Family Movies" content={familyMovies} />
                </View>

                <View style={styles.carousel}>
                    <List title="Documentary Movies" content={documentaryMovies} />
                </View>

            </ScrollView>
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