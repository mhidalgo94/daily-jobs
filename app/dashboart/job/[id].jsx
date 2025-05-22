import {View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import { HeaderJob } from "../../../components/jobs-component";

function Job(){
    const { id } = useLocalSearchParams();
    return (
        <View className="h-full">
            <HeaderJob bgColorClass="pb-4" titleHead={id}/>
            <Text>Pagina del trabajo   {id}</Text>
        </View>
    )
}

export default Job;