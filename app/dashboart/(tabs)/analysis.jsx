import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import SummaryChart from "../../../components/charts/SummaryCharts";

export default function Account(){
    
    return (
        <SafeAreaView className="flex-1 bg-darkgray">
            <View className="mt-2 pl-4">
                <Text className="text-3xl text-white">Income Summary</Text>
            </View>
            <SummaryChart />    
        </SafeAreaView>
    );
}