import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image } from "react-native";
import { useGlobalContextPrivate } from "../../../components/global-provider";
import { ItemsBtn } from "../../../components/tabs/account";

export default function Accont(){
    const {user,logout} = useGlobalContextPrivate();

    
    const handleLogout = ()=>{
        logout()

    }
    return (
        <SafeAreaView className="bg-darkgray">
                <View className="p-2 pt-4 mt-1">
                    <View>
                        <Image src={user.picture} className="h-[100] w-[100] m-auto rounded-full mt-2"/>
                        <Text className="mt-5 text-3xl text-center text-white" >{user.name}</Text>
                        <Text className="mt-2 text-md text-center font-rubik-medium text-gray-200" >{user.email}</Text>
                    </View>
                    <ScrollView className="p-2 h-full">
                        <View className="mt-2">
                            <View>
                                <ItemsBtn text="Method Payment"  iconName={"card"} iconBgColorClass="bg-green-600"/>
                                <ItemsBtn text="Privacy"  iconName={"shield-checkmark"} iconBgColorClass="bg-primary"/>
                            </View>
                            <ItemsBtn text="Logout"  iconName={"power"} onClick={handleLogout}/>
                        </View>
                    </ScrollView>
                </View>
                
            
        </SafeAreaView>
    );
}