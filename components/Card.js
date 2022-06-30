import React from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';


const placeholderImage = require("../assets/img/placeholder-img.png");
class Card extends React.PureComponent {

    render() {
        const { item } = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
            //   onPress={this.onPress}
            >
                <Image
                    resizeMode="cover"
                    style={styles.movieImg}
                    source={
                        item.poster_path
                            ? { uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }
                            : placeholderImage
                    }
                />
                {!item.poster_path && (<Text style={styles.movieName}>{item.title}</Text>)}
            </TouchableOpacity>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        height: 200,
    },
    movieImg: {
        height: 200,
        width: 120,
        borderRadius: 20,
    },
    movieName: {
        position: 'absolute',
        width: 100,
        top: 10,
        textAlign: 'center',

    },


});

Card.propTypes = {
    item: PropTypes.object,
};

export default Card;