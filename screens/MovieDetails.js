import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { getDetails } from '../services/services';
import Error from '../components/Error';


const placeholderImage = require("../assets/img/placeholder-img.png");

const height = Dimensions.get('screen').height;

const MovieDetails = ({ route, navigation }) => {
    const detailId = route.params.detailId;

    // const original_name = route.params.detailId;
    // const type = original_name ? 'tv' : 'movie';

    const [screenDetail, setScreenDetail] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

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

    return (
        <React.Fragment>
            {isLoading && !error
                ? <ActivityIndicator size="large" color="#2b2d42" />
                :
                <ScrollView>

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
                        <Text style={styles.movieTitle}>{screenDetail?.title}</Text>
                    </View>

                </ScrollView>
            }

            {error && <Error />}
        </React.Fragment>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    movieImg: {
        height: height / 1.8,
    },
    movieTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: "bold",
        color: "#000"

    },


});

export default MovieDetails;
