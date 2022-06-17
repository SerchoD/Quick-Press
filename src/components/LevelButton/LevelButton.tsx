import React, { useEffect, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from 'react-native'

interface Props {
    number: number;
    onPress(): any;
    key?: any;
    disabled?: boolean;
}

const LevelButton = ({ number, onPress, key, disabled = false }: Props) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [deviceWidth, setDeviceWidth] = useState<number>(windowWidth);
    const [deviceHeight, setDeviceHeight] = useState<number>(windowHeight);

    const windowDeviceMinorSize = () => {
        if (deviceWidth < deviceHeight) {
            return deviceWidth
        } else {
            return deviceHeight
        }
    }
    const btnSize = (windowDeviceMinorSize() * 15) / 100; // (15%) X percent of window Screen.

    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        setDeviceWidth(width);
        setDeviceHeight(height);
    });

    return (
        <View key={key} style={{ opacity: disabled ? .2 : 1 }}>
            <TouchableOpacity
                style={{
                    ...styles.btn,
                    width: btnSize,
                    height: btnSize,
                    elevation: 10,
                }}
                disabled={disabled}
                onPress={onPress}
            >
                <Text style={styles.btnText}>{number <= 0 ? 'Start!' : number}</Text>
            </TouchableOpacity>
        </View >
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
    btnDisabled: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderWidth: 3,
        borderColor: 'rgba(200,200,200,1)',
        borderRadius: 100,
        elevation: 1
    },
    btnText: {
        color: 'rgba(200,200,200,1)'
    }

});



export default LevelButton