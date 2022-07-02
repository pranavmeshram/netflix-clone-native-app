import React from 'react';
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from 'react-native';

const Error = (props) => {
    const { errorText1, errorText2 } = props;


    return (
        <View style={styles.container}>
            <Text style={styles.text}>{errorText1}</Text>
            <Text style={styles.text}>{errorText2}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontWeight: "bold",
        color: "#000",
        paddingBottom: 10,
    },
});

Error.defaultProps = {
    errorText1: "Oops! Something went wrong.",
    errorText2: "Make sure you are online and restart the App.",
};

Error.propTypes = {
    errorText1: PropTypes.string,
    errorText2: PropTypes.string,
};

export default Error;