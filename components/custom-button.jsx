import { Text, TouchableOpacity, ActivityIndicator } from "react-native";


export function CustomButton({onPress, text, bgBtn="bg-primary-300", loading=false }){
    return(
        <TouchableOpacity
            onPress={onPress}
            className={`${loading ? "bg-gray-400" : bgBtn} p-4 rounded-lg mt-4`}
            disabled={loading}
            >
            {!loading && <Text className="text-lg text-gray-50 font-rubik-medium text-center">{text}</Text>} 
            {loading && <ActivityIndicator size="small" color="#020617" />}
            
        </TouchableOpacity>
    )
}

