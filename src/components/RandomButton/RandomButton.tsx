import React, { useEffect, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux';
import { randomMinMax } from '../../utils/math'

const RandomButton = ({ onPress, counter }: any) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const themeStyles = useSelector<RootStore>(store => store.themeStyle)

    const s = styles(themeStyles)

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
                    ...s.btn,
                    width: btnSize,
                    height: btnSize,
                    elevation: 10,
                }}
                onPress={onPress}
            >
                <Text style={s.btnText}>{counter <= 0 ? 'Start!' : counter}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = (themeStyles: any) => StyleSheet.create({
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeStyles.backgroundColor2,
        borderWidth: 3,
        borderColor: themeStyles.roundBtnBorderColor,
        borderRadius: 100,
        elevation: 5
    },
    btnText: {
        color: themeStyles.textColor
    }

});



export default RandomButton