import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import Error from '../components/Error';
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaryMovies } from '../services/services';

const dimensions = Dimensions.get('screen');

const Home = ({ navigation }) => {

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
                () => {
                    setError(true);
                })
            .finally(
                () => {
                    setIsLoading(false);
                }
            )

    }, [])



    return (
        <React.Fragment>
            {isLoading && !error
                ? <ActivityIndicator size="large" color="#2b2d42" />
                : <ScrollView>

                    {/* upcomingMoviesData */}
                    {moviesImages && (
                        <View style={styles.sliderContainer}>
                            <SliderBox
                                images={moviesImages}
                                sliderBoxHeight={dimensions.height / 1.5}
                                dotStyle={styles.sliderDots}
                                autoplay={true}
                                circleLoop={true}
                            />
                        </View>
                    )}

                    {/* popularMoviesData */}
                    {popularMovies && (
                        <View style={styles.carousel}>
                            <List title="Popular Movies" content={popularMovies} navigation={navigation} />
                        </View>
                    )}

                    {/* popularTvData */}
                    {popularTv && (
                        <View style={styles.carousel}>
                            <List title="Popular Tv" content={popularTv} navigation={navigation} />
                        </View>
                    )}

                    {/* familyMoviesData */}
                    {familyMovies && (
                        <View style={styles.carousel}>
                            <List title="Family Movies" content={familyMovies} navigation={navigation} />
                        </View>
                    )}

                    {/* documentaryMoviesData */}
                    {documentaryMovies && (
                        <View style={styles.carousel}>
                            <List title="Documentary Movies" content={documentaryMovies} navigation={navigation} />
                        </View>
                    )}

                </ScrollView>
            }

            {error && <Error />}
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