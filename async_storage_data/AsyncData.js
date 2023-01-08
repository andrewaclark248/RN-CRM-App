import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log("Data stored" +  key + " =====" , value)
    } catch (e) {
        console.log("async storage error")
    }
}

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
};