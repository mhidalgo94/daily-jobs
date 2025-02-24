import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";
export const HeaderJob = ({bgColorClass="bg-gray-300"})=>{
    const router = useRouter();

    return (
        <View className="px-2 flex flex-row items-center bg-darkgray">
            <TouchableOpacity className={`${bgColorClass} p-1 rounded-lg`} onPress={()=>router.back()}>
                <Icon name="arrow-back" color="#f3f4f6" size={32} />
            </TouchableOpacity>
            <Text className="text-white font-rubik-medium text-3xl text-center w-full">Create Job</Text>
        </View>
    )
}