import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';


export default function Explore(){
    const [search, setSearch] = useState("");
    return (
        <View className="p2 h-full bg-darkgray">
            <SafeAreaView >
                <View className="mt-2 pl-4">
                    <Text className="mt-5 text-3xl text-white" > Seach Job</Text>
                </View>
                <View className="mx-4 mt-2 p-2 flex flex-row justify-between items-center">
                    <TextInput
                        onChangeText={setSearch}
                        value={search}
                        placeholder="Job number"
                        placeholderTextColor="#A0A0A0"
                        className="p-3 w-[300] bg-gray-700 text-white rounded-lg border border-gray-700 focus:border-gray-500"
                        autoComplete="off"
                        keyboardType="default"
                        />
                        <TouchableOpacity className="p-1 bg-primary rounded-lg">
                                <Icon name="search" size={32} color="#d4d4d8"/>
                        </TouchableOpacity>
                </View>
                <View className="h-[1px] bg-gray-300 mx-4 mt-2" />
                
            
            </SafeAreaView>
        </View>
    );
}