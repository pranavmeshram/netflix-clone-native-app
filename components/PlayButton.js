import React, { PureComponent } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


class PlayButton extends PureComponent {
    render() {
        const { handlePress } = this.props;

        return (
            <Pressable onPress={handlePress} style={styles.playButton}>
                <Icon name={"caret-forward-outline"} size={15} color={"#fff"} />
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    playButton: {
        alignContent: "center",
        borderRadius: 50,
        width: 38,
        padding: 8,
        backgroundColor: "#4481FC"
    },
});


export default PlayButton;