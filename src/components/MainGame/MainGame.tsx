import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { getStoredCurrentLevel, storeCurrentLevel } from '../../asyncStorage/currentLevelStorage';
import { globalStyles } from '../../globalStyles';
import { Level } from '../../types/types';
import CustomButton from '../CustomButton/CustomButton';
import CustomModal from '../CustomModal/CustomModal';
import RandomButton from '../RandomButton/RandomButton';
import { LEVELS } from '../../constants/Levels'

interface Props {
    levelProps: Level;
}

const MainGame = ({ levelProps }: Props) => {

    const [counter, setCounter] = useState(0)
    const [secondsLeft, setSecondsLeft] = useState<number>(levelProps.time);
    const [milisecondsLeft, setMilisecondsLeft] = useState(0)
    const [timerIsRunning, setTimerIsRunning] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [securityDisable, setSecurityDisable] = useState(true)
    const [currentLevel, setCurrentLevel] = useState<number>(1)
    const [currentlevelProps, setCurrentLevelProps] = useState<Level>(levelProps)

    const handleCloseModal = () => {
        setShowModal(false)
        timerReset()
        setSecurityDisable(true)
    }

    const handleNextLevel = () => {
        const findNextLevel = LEVELS.find((level: Level) => level.level === currentlevelProps.level + 1)
        if (findNextLevel) setCurrentLevelProps(findNextLevel)
        handleCloseModal()
    }

    const handleBtnPress = () => {
        if (secondsLeft > 0) {
            setCounter(counter + 1)
        }
        if (timerIsRunning === false && secondsLeft > 0) {
            timerStart()
        }
    }

    const timerStart = () => {
        setTimerIsRunning(true);
        if (secondsLeft === 30) {
            setSecondsLeft(secondsLeft => secondsLeft - 1)
            setMilisecondsLeft(10)
        }
    }

    const timerStop = () => setTimerIsRunning(false);

    const timerReset = () => {
        setSecondsLeft(currentlevelProps.time);
        setMilisecondsLeft(0);
        setTimerIsRunning(false);
        setCounter(0)
    };

    useEffect(() => {
        getStoredCurrentLevel()
            .then(storedCurrentLevel => {
                if (storedCurrentLevel > 1) {
                    setCurrentLevel(storedCurrentLevel)
                }
            });
    }, [])

    useEffect(() => {
        if (showModal === true) {
            setTimeout(() => {
                setSecurityDisable(false)
            }, 1000);
        }
    }, [showModal])

    useEffect(() => {
        let interval: any;
        if (timerIsRunning) {
            interval = setInterval(() => {
                setMilisecondsLeft(miliseconds => miliseconds - 1)
            }, 100);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timerIsRunning]);

    useEffect(() => {
        if (timerIsRunning) {
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
            if (counter >= currentlevelProps?.goal) {
                if (currentlevelProps?.level === currentLevel) {
                    storeCurrentLevel(currentLevel + 1)
                }
            }
        }
    }, [secondsLeft])

    return (
        <SafeAreaView>
            <CustomModal showModal={showModal}>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    {counter >= currentlevelProps?.goal &&
                        <View >
                            <Text style={styles.modalScoreText}>Congratulations!</Text>
                        </View>
                    }

                    <View >
                        <Text style={styles.modalScoreText}>Your score: {counter}</Text>
                    </View>

                    <View>
                        <Text style={styles.modalScoreText}>Goal: {currentlevelProps.goal}</Text>
                    </View>
                </View>

                <View>
                    {counter >= currentlevelProps?.goal &&
                        <View>
                            <CustomButton
                                text='Next Level!'
                                securityDisable={securityDisable}
                                handleCloseModal={handleNextLevel}
                            />
                        </View>
                    }
                    <CustomButton
                        text='Again!'
                        securityDisable={securityDisable}
                        handleCloseModal={handleCloseModal}
                    />
                </View>
            </CustomModal>

            <View style={styles.container}>
                {!timerIsRunning &&
                    <View>
                        <Text style={styles.levelText}>Level: {currentlevelProps.level}</Text>
                    </View>
                }
                <View>
                    <Text
                        style={{
                            ...styles.clock,
                            opacity: Number(`${timerIsRunning ? .1 : .8}`)
                        }}
                    >
                        {`${secondsLeft < 10 ? '0' : ''}${secondsLeft}:${milisecondsLeft}${milisecondsLeft < 10 ? '0' : ''}`}
                    </Text>
                </View>
                {!timerIsRunning &&
                    <View>
                        <Text style={styles.goalText}>Goal: {currentlevelProps.goal}</Text>
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
    levelText: {
        color: globalStyles.color,
        fontSize: 20,
        marginTop: 5,
        marginBottom: -27,
        ...globalStyles.textShadow
    },
    clock: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontSize: 100,
        color: 'white',
        width: '100%',
        height: 'auto',
        ...globalStyles.textShadow
    },
    goalText: {
        color: globalStyles.color,
        fontSize: 20,
        marginTop: -20,
        ...globalStyles.textShadow
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
});

export default MainGame