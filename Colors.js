import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Platform } from 'react-native';

const Colors = () => {
    let bgColorList = [
        '#FF6633',
        '#FFB399',
        '#FF33FF',
        '#FFFF99',
        '#00B3E6',
        '#E6B333',
        '#3366E6',
        '#999966',
        '#99FF99',
        '#B34D4D',
        '#80B300',
        '#809900',
        '#E6B3B3',
        '#6680B3',
        '#66991A',
        '#FF99E6',
        '#CCFF1A',
        '#FF1A66',
        '#E6331A',
        '#33FFCC',
        '#66994D',
        '#B366CC',
        '#4D8000',
        '#B33300',
        '#CC80CC',
    ];

    const [BgList, setBgList] = useState('');

    const onPressFunction = () => {
        console.log('**** color ****');
        const random = Math.floor(Math.random() * bgColorList.length);
        setBgList(bgColorList[random]);
        console.log('**** color ****', bgColorList[random]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello Native</Text>
            <Button
                title={BgList ? BgList : 'Click Me'}
                color={BgList}
                onPress={onPressFunction}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
    },
    text: {
        fontSize: 40,
        color: '#000',
        fontFamily: Platform.OS === 'ios' ? 'cursive' : 'helvetica',
    },
});

export default Colors;
