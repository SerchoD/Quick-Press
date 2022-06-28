import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { globalStyles } from '../../globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { LEVELS } from '../../constants/Levels';
import LevelButton from '../LevelButton/LevelButton';
import CustomModal from '../CustomModal/CustomModal';
import CustomButton from '../CustomButton/CustomButton';
import { getStoredCurrentLevel } from '../../asyncStorage/currentLevelStorage';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../redux';
import { defaultThemeAction, newRandomThemeAction } from '../../redux/actions/themeStyles/themeStyles';

interface Props {
    setIsPlaying: any;
    setLevelProps: any;
    isPlaying: boolean;
}

const MainScreen = ({ setIsPlaying, setLevelProps, isPlaying }: Props) => {
    const dispatch = useDispatch();
    const themeStyles: any = useSelector<RootStore>(store => store.themeStyle)

    const [showMenuModal, setShowMenuModal] = useState<boolean>(false);
    const [currentLevel, setCurrentLevel] = useState<number>(1);
    const [s, setS] = useState<any>(styles(themeStyles))
    const [reloadTheme, setReloadTheme] = useState<boolean>(false);

    const handleLevelPress = (level: any) => {
        setLevelProps(level);
        setIsPlaying(true);
    };

    const handleNewRandomTheme = () => {
        dispatch(newRandomThemeAction())
        setReloadTheme(!reloadTheme)
    }
    const handleDefaultTheme = () => {
        dispatch(defaultThemeAction())
        setReloadTheme(!reloadTheme)

    }
    useEffect(() => {
        setS(styles(themeStyles))
    }, [reloadTheme])

    useEffect(() => {
        getStoredCurrentLevel()
            .then(storedCurrentLevel => {
                if (storedCurrentLevel > 1) {
                    setCurrentLevel(storedCurrentLevel)
                }
            });
    }, [isPlaying])

    return (
        <View style={s.container}>
            <View style={s.menuIcon}>
                <TouchableOpacity onPress={() => setShowMenuModal(true)}>
                    <Ionicons name='menu' size={35} color={themeStyles.textColor} />
                </TouchableOpacity>
            </View>

            <View style={s.titleContainer}>
                <Text style={s.serchoText}>Sercho's</Text>
                <Text style={s.quickPressText}>Quick Press</Text>
            </View>

            <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.8)']}
                start={{ x: 0, y: 0.1 }}
            >
                <ScrollView fadingEdgeLength={50} showsVerticalScrollIndicator={false}>
                    <View style={s.levelsContainer}>
                        {LEVELS.map((level: any) => {
                            return (
                                <View key={level?.level} style={s.lvlBtnContainer}>
                                    <LevelButton
                                        number={level?.level}
                                        onPress={() => handleLevelPress(level)}
                                        disabled={currentLevel < level?.level}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </LinearGradient>

            <CustomModal showModal={showMenuModal} height={340}>
                <View style={{ marginTop: '20%' }}>
                    <CustomButton text='Magic! :)' onPress={handleNewRandomTheme} reloadTheme={reloadTheme} />
                    <CustomButton text='No magic! :(' onPress={handleDefaultTheme} reloadTheme={reloadTheme} />
                </View>
                <View>
                    <CustomButton text='X' onPress={() => setShowMenuModal(false)} reloadTheme={reloadTheme} />
                </View>
            </CustomModal>
        </View>
    );
};

const styles = (themeStyles: any) => StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: themeStyles.backgroundColor1,
    },
    menuIcon: {
        zIndex: 2,
        position: 'absolute',
        top: 10,
        right: 10,
        opacity: 0.5,
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: 10,
        height: 35
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        backgroundColor: themeStyles.backgroundColor1,
    },
    backgroundStyle: {
        flex: 1,
    },
    serchoText: {
        color: themeStyles.textColor,
        ...globalStyles.textShadow,
    },
    quickPressText: {
        color: themeStyles.textColor,
        fontSize: 40,
        ...globalStyles.textShadow,
    },
    levelsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 0,
        marginBottom: '30%',
    },
    lvlBtnContainer: {
        margin: '2%',
    },
});

export default MainScreen;
