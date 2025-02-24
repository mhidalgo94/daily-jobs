import {View, Text} from "react-native"
import { HeaderJob } from "../../../components/jobs-component";

function CreateJob(){
    return (
            <View className="mt-4 p-4 bg-darkgray">
                <HeaderJob bgColorClass="bg-gray-500" />
                <View className="p-2 mt-5">
                <Text className="text-xl5 text-white">New job</Text>
                </View>
            </View>
    )
}

export default CreateJob;