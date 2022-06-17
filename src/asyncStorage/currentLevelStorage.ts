import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeCurrentLevel = async (value: number) => {
	try {
		await AsyncStorage.setItem('currentLevel', JSON.stringify(value));
	} catch (error) {
		console.log('Error in storeCurrentLevel: ', error);
	}
};

export const getStoredCurrentLevel = async () => {
	try {
		const response = await AsyncStorage.getItem('currentLevel');
		return response != null ? JSON.parse(response) : null;
	} catch (error) {
		console.log('Error in getStoredCurrentLevel: ', error);
	}
};
