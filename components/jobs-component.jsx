import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";


export const HeaderJob = ({bgColorClass="bg-gray-300", titleHead})=>{
    const router = useRouter();

    return (
        <View className="flex flex-row items-center bg-red px-2">
            <TouchableOpacity className={`${bgColorClass} rounded-lg`} onPress={()=>router.back()}>
                    <Icon name="arrow-back" color="#f3f4f6" size={32}  />
            </TouchableOpacity>
            <View className="flex items-center h-full w-full">
                <Text className="text-white font-rubik-medium text-3xl text-center w-full">{titleHead}</Text>
            </View>
        </View>
    )
}