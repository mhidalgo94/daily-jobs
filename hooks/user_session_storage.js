import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (name  , value) =>{
    try{
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(name, jsonValue);

    }catch(err){
        throw new Error("Error for save values session storage")
    }
}

export const getStoreData = async (name) => {
    try{
        const jsonValue = await AsyncStorage.getItem(name);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err){
        throw new Error("Error for get values session storage");
    }
}

const removeStoreData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`${key} removed successfully`);
    } catch (error) {
        console.error("Error removing item:", error);
    }
};

export const clearStoreData = async () => {
    try {
        await AsyncStorage.clear();
        console.log("Storage cleared successfully");
    } catch (error) {
        console.error("Error clearing storage:", error);
    }
};

