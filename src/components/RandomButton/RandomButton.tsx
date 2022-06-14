import React, { useEffect, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { randomMinMax } from '../../utils/math'

const RandomButton = ({ onPress, counter }: any) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [deviceWidth, setDeviceWidth] = useState<number>(windowWidth);
    const [deviceHeight, setDeviceHeight] = useState<number>(windowHeight);
    const [horizontalPosition, setHorizontalPosition] = useState<number>(0);
    const [verticalPosition, setVerticalPosition] = useState<number>(0);

    const windowDeviceMinorSize = () => {
        if (deviceWidth < deviceHeight) {
            return deviceWidth
        } else {
            return deviceHeight
        }
    }
    const btnSize = (windowDeviceMinorSize() * 15) / 100; // (15%) X percent of window Screen.

    useEffect(() => {
        setHorizontalPosition(randomMinMax({ min: 0, max: (deviceWidth - btnSize) }));
        setVerticalPosition(randomMinMax({ min: 0, max: (deviceHeight - btnSize) }));
    }, [counter, deviceWidth]);

    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        setDeviceWidth(width);
        setDeviceHeight(height);
    });

    return (
        <View
            style={{
                position: 'absolute',
                top: counter < 1 ?
                    (deviceHeight / 2) - (btnSize / 2) // Vertical Center 
                    :
                    verticalPosition,
                left: counter < 1 ?
                    deviceWidth / 2 - (btnSize / 2) // Horizontal Center
                    :
                    horizontalPosition,
            }}
        >
            <TouchableOpacity
                style={{
                    ...styles.btn,
                    width: btnSize,
                    height: btnSize,
                    elevation: 10,
                    shadowColor: 'red'
                }}
                onPress={onPress}
            >
                <Text style={styles.btnText}>{counter <= 0 ? 'Start!' : counter}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(100,100,100,1)',
        borderWidth: 3,
        borderColor: 'rgba(200,200,200,1)',
        borderRadius: 100,
        elevation: 1
    },
    btnText: {
        color: 'rgba(200,200,200,1)'
    }

});



export default RandomButton