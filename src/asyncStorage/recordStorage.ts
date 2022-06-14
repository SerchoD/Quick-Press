import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeNewRecord = async (value: number) => {
	try {
		await AsyncStorage.setItem('record', JSON.stringify(value));
	} catch (error) {
		console.log('Error in storeNewRecord: ', error);
	}
};

export const resetRecord = async () => {
	try {
		await AsyncStorage.setItem('record', JSON.stringify(0));
	} catch (error) {
		console.log('Error in resetRecord: ', error);
	}
};

export const getStoredRecord = async () => {
	try {
		const response = await AsyncStorage.getItem('record');
		return response != null ? JSON.parse(response) : null;
	} catch (error) {
		console.log('Error in getStoredRecord: ', error);
	}
};
