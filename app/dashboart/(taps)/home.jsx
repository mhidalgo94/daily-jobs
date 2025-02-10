import { SafeAreaView } from "react-native-safe-area-context";
import { HeadHome, CardHome } from "../../../components/tabs/home";
import {ScrollView} from 'react-native'

export default function HomeDashboart() {

    return (
        <SafeAreaView >
            <ScrollView className="pt-6 px-5 h-full bg-white">
                <HeadHome />
                <CardHome />

            </ScrollView>
        </SafeAreaView>
    )
}