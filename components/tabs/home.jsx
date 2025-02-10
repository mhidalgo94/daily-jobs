import { Ionicons } from "./tabs-icons";
import { View, Text, Image } from "react-native"
import { useGlobalContextPrivate } from "../global-provider"


export const HeadHome = ()=> {
    const {user} = useGlobalContextPrivate();
    // Capital plan string 
    const plan =  user.plan.charAt(0).toUpperCase() + user.plan.slice(1);
    return (
        <View className="flex flex-row items-center justify-between pt-2">
            <View>
                <Text className="text-base font-rubik text-black-300">Welcome</Text>
                <Text className="text-2xl font-rubik-medium text-primary">{user.name}</Text>
                <View className="my-1 flex flex-row items-center gap-2 w-[100px]" >
                    <Ionicons name="sparkles" size={18} color = '#191D31'/>
                    <Text className="text-base">Plan - {plan} </Text>
                </View>
            </View>
            <View>
                <Image  src={user.picture} className="h-[60] w-[60] rounded-full"/>
            </View>
        </View>
    )

}

export const CardHome = ()=>{
    const utc = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    
    return (
        <View className="mt-7 bg-white px-4 py-6 rounded-2xl border-gray-300 shadow-md">
            <View className="flex flex-row items-center justify-between">
                <View className="">
                    <Text className="text-5xl text-primary font-rubik-bold">$ {"210.12"}</Text>
                    <Text className="text-black-200 font-rubik-medium">Balance Today</Text>
                    <View className="mt-5">
                        <Text className="text-4xl text-regular font-rubik-bold">$ {"1204.12"}</Text>
                        <Text className="text-black-200 font-rubik-medium">Balance this week</Text>
                    </View>
                </View>
                <View>
                    <Text className="text-primary text-7xl pr-8 font-rubik-medium m-auto">0</Text>
                    <Text className="text-black-200 pr-8 font-rubik-medium">Jobs today</Text>
                    <Text className="text-black-200 mt-2 pr-8 font-rubik-medium">{utc}</Text>
                </View>
            </View>  
        </View>
    )
}
