import React, { useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { globalStyles } from '../../globalStyles';
import { RootStore } from '../../redux';

interface Props {
    number: number;
    onPress(): any;
    key?: any;
    disabled?: boolean;
}

const LevelButton = ({ number, onPress, key, disabled = false }: Props) => {
    const themeStyles = useSelector<RootStore>(store => store.themeStyle)

    const s = styles(themeStyles)

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
        <View key={key} style={{ opacity: disabled ? .25 : 1 }}>
            <TouchableOpacity
                style={{
                    ...s.btn,
                    width: btnSize,
                    height: btnSize,
                }}
                disabled={disabled}
                onPress={onPress}
            >
                <Text style={s.btnText}>{number <= 0 ? 'Start!' : number}</Text>
            </TouchableOpacity>
        </View >
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
        elevation: 10
    },
    btnText: {
        textAlign: 'center',
        color: themeStyles.textColor,
        marginTop: '35%',
        width: '75%',
        height: '75%',
        ...globalStyles.numbersTextShadow
    }

});



export default LevelButton