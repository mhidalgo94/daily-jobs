import { Text, View, TouchableOpacity } from "react-native"
import {Ionicons} from '../../components/tabs/tabs-icons';

export const ItemsBtn = ({text, iconName,iconBgColorClass="bg-red-500", iconColor="#d4d4d8", onClick}) => {
    return(
        <View className="mt-3">
            <TouchableOpacity onPress={onClick} className="px-2 py-1 flex flex-row items-center bg-darkgray-200 justify-between  rounded-2xl">
                <View className="flex flex-row items-center">
                    <View className={`p-2 ml-2 ${iconBgColorClass} rounded-lg`}>
                        <Ionicons name={iconName} color={iconColor} />   
                    </View>
                    <Text className="text-white p-4 text-lg font-rubik-medium">{text}</Text>
                </View>
                    <Ionicons name="chevron-forward" color="#d4d4d8" />
            </TouchableOpacity>
        </View>
    )
}