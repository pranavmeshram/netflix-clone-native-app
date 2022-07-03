import React from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import Card from './Card';


class List extends React.PureComponent {

    render() {
        const { title, content, navigation } = this.props;

        const renderItem = ({ item }) => (
            <Card item={item} navigation={navigation} />
        );

        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View>
                    <FlatList
                        data={content}
                        horizontal={true}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    list: {
        marginTop: 25,
    },

    text: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 20,
    },
});

List.propTypes = {
    title: PropTypes.string,
    content: PropTypes.array,
    navigation: PropTypes.object,
};

export default List;