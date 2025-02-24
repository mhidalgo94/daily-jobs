import { Slot } from "expo-router";
import {View} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";



function JobLayout(){
    return(
        <View className="bg-darkgray h-full">
            <SafeAreaView className="bg-darkgray">
                <Slot />
            </SafeAreaView>
        </View>
    )
}

export default JobLayout;