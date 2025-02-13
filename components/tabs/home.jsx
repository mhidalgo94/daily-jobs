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
                <Text className="text-2xl font-rubik-medium text-black-250">{user.name}</Text>
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


export const ListJobs = ({job})=>{
    const IconJobs = ({category}) => {
        if( category == "New Install"){
            return (
                // <View className="bg-black-100 p-2 rounded rounded-xl4">
                    <Ionicons name="bag-add" size={34} color="#4b5563"/>
                // </View>
            )
        } else if (category == "Service Change"){
            return <Ionicons name="bag-check" size={38} color="#4b5563"/>
        } else if (category == "Trouble Call"){
            return <Ionicons name="construct" size={38} color="#4b5563"/>
        }else if (category == "Special Request"){
            return <Ionicons name="warning" size={38} color="#4b5563"/>
        } else{
            return <Ionicons name="bag-add" size={38} color="#4b5563"/>
        }
    }

    const StatusText = ({status})=>{
        if(status== "Complete"){

        }
    }
    return (
        <View className="mt-2 px-2 pt-2 pb-3 border-b-[1px] border-gray-100">
            <View className="flex flex-row gap-3 items-center justify-between">
                <View className="flex flex-row gap-3">
                    <IconJobs category={job.category} />
                    <View>
                        <Text className="text-2xl font-rubik-medium text-black-300">{job.id}</Text>
                        <Text className="text-black-300">{job.address}</Text>
                    </View>
                </View>
                <View>
                    <Text className="text-regular font-rubik-medium" >{job.status}</Text>
                </View>
            </View>
        </View>
    )
}