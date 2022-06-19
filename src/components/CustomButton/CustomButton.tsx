import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
    securityDisable?: boolean;
    handleCloseModal?(): any;
    onPress?(): any;
    text: string;
}

const CustomButton = ({ securityDisable, handleCloseModal, onPress, text }: Props) => {
    return (
        <TouchableOpacity onPress={handleCloseModal || onPress} disabled={securityDisable}>
            <View style={styles.modalAgainBtn}>
                <Text style={{
                    ...styles.modalAgainText,
                    color: `${securityDisable ? 'rgba(222,222,222,.2)' : 'rgba(222,222,222,.8)'}`,
                    backgroundColor: `${securityDisable ? 'rgba(222,222,222,.2)' : 'rgba(111,111,111,.6)'}`,
                    borderColor: `${securityDisable ? 'rgba(222,222,222,.2)' : 'rgba(222,222,222,.8)'}`,
                }}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
        borderRadius: 10
    }
});

export default CustomButton