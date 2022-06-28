import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { globalStyles } from '../../globalStyles';
import { RootStore } from '../../redux';

interface Props {
    securityDisable?: boolean;
    handleCloseModal?(): any;
    onPress?(): any;
    text: string;
    reloadTheme?: boolean;
}

const CustomButton = ({ securityDisable, handleCloseModal, onPress, text, reloadTheme }: Props) => {
    const themeStyles: any = useSelector<RootStore>(store => store.themeStyle)


    const [s, setS] = useState<any>(styles(themeStyles))


    useEffect(() => {
        setS(styles(themeStyles))
    }, [reloadTheme])

    return (
        <TouchableOpacity onPress={handleCloseModal || onPress} disabled={securityDisable}>
            <View style={{
                ...s.modalAgainBtn,
                // opacity: `${securityDisable ? .5 : 1}`
            }}>
                <Text style={s.modalAgainText}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = (themeStyles: any) => StyleSheet.create({
    modalAgainBtn: {
        marginBottom: 40,
        elevation: 5
    },
    modalAgainText: {
        textAlign: 'center',
        borderWidth: 2,
        width: 150,
        height: 40,
        paddingTop: 10,
        borderRadius: 10,
        color: themeStyles.textColor,
        backgroundColor: themeStyles.backgroundColor2,
        borderColor: themeStyles.roundBtnBorderColor,
        ...globalStyles.numbersTextShadow
    }
});

export default CustomButton