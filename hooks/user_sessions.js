
import EncryptedStorage from "react-native-encrypted-storage";

async function storeUserSession(values){
    try{
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                ...values
            })
        );
    } catch (err){
        console.log("Error with save user sessions")
    }
}


async function retrieveUserSession(item = "user_session"){
    try{
        const values = await EncryptedStorage.getItem(item);
        
        if (!values){
            console.log("No information found in storage.No information found in storage.") 
            return null
        }

        return JSON.parse(values);
    }catch (err) {
        throw new Error(`Error to get sessions data ${err.code}`);
    }
}

async function removeUserSession(item = "user_session") {
    try {
        await EncryptedStorage.removeItem(item);
        // Congrats! You've just removed your first value!
        console.log("User session remove")
    } catch (err) {
        // There was an error on the native side
        throw new Error(`Error for remove session data${err.code}`)
    }
}
async function clearStorageSession() {
    try {
        await EncryptedStorage.clear();
        // Congrats! You've just cleared the device storage!
    } catch (err) {
        // There was an error on the native side
        throw new Error(`Error for clear session storage ${err.code}`)
    }
}

export { 
    storeUserSession,
    retrieveUserSession,
    removeUserSession,
    clearStorageSession

 }