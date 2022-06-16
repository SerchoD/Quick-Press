import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getStoredRecord, resetRecord, storeNewRecord } from '../../asyncStorage/recordStorage';
import { globalStyles } from '../../globalStyles';
import { Level } from '../../types/types';
import AgainButton from '../AgainButton/AgainButton';
import CustomModal from '../CustomModal/CustomModal';
import RandomButton from '../RandomButton/RandomButton';
interface Props {
    levelProps: Level;
}

const MainGame = ({ levelProps }: Props) => {


    const [counter, setCounter] = useState(0)
    const [secondsLeft, setSecondsLeft] = useState<number>(levelProps.time);
    const [milisecondsLeft, setMilisecondsLeft] = useState(0)
    const [timerToggle, setTimerToggle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [securityDisable, setSecurityDisable] = useState(true)
    const [storedRecord, setStoredRecord] = useState(0)
    const [recordResetRefresh, setRecordResetRefresh] = useState(true)

    const handleCloseModal = () => {
        setShowModal(false)
        timerReset()
        setSecurityDisable(true)
    }

    const handleBtnPress = () => {
        if (secondsLeft > 0) {
            setCounter(counter + 1)
        }
        if (timerToggle === false && secondsLeft > 0) {
            timerStart()
        }
    }

    const handleResetRecord = () => {
        resetRecord()
        setRecordResetRefresh(!recordResetRefresh)
    }

    const timerStart = () => {
        setTimerToggle(true);
        if (secondsLeft === 30) {
            setSecondsLeft(secondsLeft => secondsLeft - 1)
            setMilisecondsLeft(10)
        }
    }

    const timerStop = () => setTimerToggle(false);

    const timerReset = () => {
        setSecondsLeft(levelProps.time);
        setMilisecondsLeft(0);
        setTimerToggle(false);
        setCounter(0)
    };

    useEffect(() => {
        if (showModal === true) {
            setTimeout(() => {
                setSecurityDisable(false)
            }, 1000);
        }
    }, [showModal])

    useEffect(() => {
        let interval: any;
        if (timerToggle) {
            interval = setInterval(() => {
                setMilisecondsLeft(miliseconds => miliseconds - 1)
            }, 100);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timerToggle]);

    useEffect(() => {
        if (timerToggle) {
            if (milisecondsLeft <= 0) {
                setSecondsLeft(seconds => seconds - 1);
                setMilisecondsLeft(10)
            }
        }
    }, [milisecondsLeft])

    useEffect(() => {
        if (secondsLeft <= 0) {
            timerStop()
            setMilisecondsLeft(0)
            setShowModal(true)

            if (counter > storedRecord) {
                storeNewRecord(counter)
            }
        }
    }, [secondsLeft])

    useEffect(() => {
        getStoredRecord()
            .then(record => setStoredRecord(record));
    }, [timerToggle, recordResetRefresh])


    return (
        <SafeAreaView>
            <CustomModal showModal={showModal}>
                <View>
                    <View >
                        <Text style={styles.modalScoreText}>Your score: {counter}</Text>
                    </View>

                    <View>
                        <Text style={styles.modalScoreText}>Goal: {levelProps.goal}</Text>
                    </View>
                </View>

                <AgainButton
                    securityDisable={securityDisable}
                    handleCloseModal={handleCloseModal}
                />
            </CustomModal>

            <View style={styles.container}>
                <View>
                    <Text
                        style={{
                            ...styles.clock,
                            opacity: Number(`${timerToggle ? .1 : .8}`)
                        }}
                    >
                        {`${secondsLeft < 10 ? '0' : ''}${secondsLeft}:${milisecondsLeft}${milisecondsLeft < 10 ? '0' : ''}`}
                    </Text>
                </View>
                {!timerToggle &&
                    <View>
                        <Text style={styles.goalText}>Goal: {levelProps.goal}</Text>
                    </View>
                }

                <RandomButton
                    counter={counter}
                    onPress={handleBtnPress}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(55,55,55,1)'
    },
    clock: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontSize: 100,
        color: 'white',
        width: '100%',
        height: 'auto',
    },
    modalScoreText: {
        color: 'rgba(200,200,200,1)',
        fontSize: 30,
        fontWeight: '700',
        marginTop: 20
    },
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
    },
    resetRecordBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        width: 35,
        height: 30,
        borderRadius: 100,
        backgroundColor: 'darkred',
    },
    resetRecordBtnText: {
        color: globalStyles.color,
        fontSize: 10
    },
    goalText: {
        color: globalStyles.color,
        fontSize: 20,
        marginTop: -20
    }
});

export default MainGame