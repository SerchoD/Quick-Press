import React, { Children } from 'react'
import { Button, Dimensions, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'

interface Props {
    children: any;
    showModal: boolean;
    setShowModal?: void | boolean;
}

const CustomModal = ({ children, showModal, }: Props) => {

    return (
        <>
            <Modal
                visible={showModal}
                transparent={true}
                animationType='slide'
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        {children}
                    </View>
                </View>
            </Modal>
        </>
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
        backgroundColor: 'rgba(22,22,22,.9)',
        elevation: 3,
        width: windowWidth * 0.8,
        height: windowHeight * 0.65,
        borderRadius: 10

    }
});

export default CustomModal