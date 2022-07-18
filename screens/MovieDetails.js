import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator, Modal, Pressable } from 'react-native';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import { getDetails } from '../services/services';
import Error from '../components/Error';
import PlayButton from '../components/PlayButton';
import PlayVideo from '../components/PlayVideo';

const placeholderImage = require("../assets/img/placeholder-img.png");

const height = Dimensions.get('screen').height;

const MovieDetails = ({ route, navigation }) => {
    const detailId = route.params.detailId;

    // const original_name = route.params.detailId;
    // const type = original_name ? 'tv' : 'movie';

    const [screenDetail, setScreenDetail] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getDetails(detailId)
            .then(
                apiData => {
                    setScreenDetail(apiData);
                    setIsLoading(false);
                    setError(false);
                }
            )
            .catch(
                () => {
                    setIsLoading(false);
                    setError(true);
                    setScreenDetail();
                })

    }, [detailId]);

    const videoShown = () => {
        setModalVisible(!modalVisible);
    }

    console.log("screenDetail2", screenDetail);

    return (
        <React.Fragment>
            <View>
                {isLoading && !error
                    ? <ActivityIndicator size="large" color="#2b2d42" />
                    :
                    <ScrollView decelerationRate="normal">

                        <Image
                            resizeMode="stretch"
                            style={styles.movieImg}
                            source={
                                screenDetail?.poster_path && !error
                                    ? { uri: 'https://image.tmdb.org/t/p/w500' + screenDetail?.poster_path }
                                    : placeholderImage
                            }
                        />
                        <View style={styles.container}>

                            <View style={styles.playButtonContainer}>
                                <PlayButton handlePress={videoShown} />
                            </View>

                            <Text style={styles.movieTitle}>{screenDetail?.title}</Text>

                            {screenDetail.genres && (
                                <View style={styles.genresContainer}>
                                    {screenDetail.genres.map(genre => {
                                        return (
                                            <Text key={genre.id} style={styles.genreText}>
                                                {genre.name}
                                            </Text>
                                        )
                                    })}

                                </View>
                            )}
                            <StarRating
                                starStyle={styles.rating}
                                disabled={false}
                                maxStars={5}
                                starSize={30}
                                rating={screenDetail.vote_average / 2}
                                fullStarColor={'gold'}
                            />
                            <Text style={styles.overview}>
                                {screenDetail.overview}
                            </Text>
                            <Text style={styles.releaseDate}>
                                {"Release date: " + dateFormat(screenDetail.release_date, "dS, mmm, yyyy")}
                            </Text>
                        </View>

                    </ScrollView>
                }

                <Modal animationType="slide" visible={modalVisible} supportedOrientations={['portrait', 'landscape']}>

                    <View style={styles.videoModelContainer}>
                        {/* <Pressable onPress={videoShown}>
                            <Text>Close Me</Text>
                        </Pressable> */}
                        <PlayVideo onClose={videoShown} />
                    </View>

                </Modal>
            </View>

            {error && <Error />}
        </React.Fragment >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    movieImg: {
        height: height / 1.8,
    },
    movieTitle: {
        marginTop: 25,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "justify",
    },
    genresContainer: {
        flexDirection: "row",
        alignContent: "center",
        marginTop: 10,
    },
    genreText: {
        marginRight: 10,
        fontWeight: "bold",
        color: "#000",
    },
    rating: {
        marginTop: 10,
    },
    overview: {
        padding: 15,
        color: "#000",
        textAlign: "justify",
        letterSpacing: 1,
    },
    releaseDate: {
        fontWeight: "bold",
        color: "#000",
        letterSpacing: 1,
    },
    playButtonContainer: {
        position: 'absolute',
        top: -20,
        right: 15,
    },
    videoModelContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
});

export default MovieDetails;
