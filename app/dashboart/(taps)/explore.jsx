import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";

export default function Explore(){
    
    return (
        <SafeAreaView >
            <ScrollView className=" pt-[100px] h-full bg-white">
                <View className="pt-6 pb-[100px] mt-10">
                    
                    <Text className="mt-5 text-4xl text-center text-dark" > Explore</Text>

                </View>
                
            
            </ScrollView>
        </SafeAreaView>
    );
}