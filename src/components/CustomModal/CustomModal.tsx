import { StatusBar } from 'expo-status-bar';
import React from 'react'
import {
    Dimensions,
    Modal,
    StyleSheet,
    View
} from 'react-native'

interface Props {
    children: any;
    showModal: boolean;
    setShowModal?: void | boolean;
    height?: number;
}

const CustomModal = ({ children, showModal, height = windowHeight * 0.65 }: Props) => {

    return (
        <Modal
            visible={showModal}
            transparent={true}
            animationType='slide'
        >
            <View style={styles.modalContainer}>
                <View style={{ ...styles.modal, height: height }}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(22,22,22,.8)',
        elevation: 3,
        width: windowWidth * 0.8,
        // height:  windowHeight * 0.65,
        borderRadius: 15

    }
});

export default CustomModal