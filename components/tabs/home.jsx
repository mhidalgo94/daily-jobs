import { Ionicons } from "./tabs-icons";
import { View, Text, Image, StyleSheet } from "react-native";
import { useGlobalContextPrivate } from "../global-provider";


export const HeadHome = ()=> {
    const {user} = useGlobalContextPrivate();
    // Capital plan string 
    const plan =  user.plan.charAt(0).toUpperCase() + user.plan.slice(1);
    return (
        <View className="flex flex-row items-center justify-between pt-2">
            <View>
                <Text className="text-base font-rubik text-gray-300">Welcome</Text>
                <Text className="text-2xl font-rubik-medium text-white">{user.name}</Text>
                <View className="my-1 flex flex-row items-center gap-2 w-[100px]" >
                    <Ionicons name="sparkles" size={18} color = '#d1d5db'/>
                    <Text className="text-base text-gray-300">Plan - {plan} </Text>
                </View>
            </View>
            <View>
                <Image  src={user.picture} className="h-[60] w-[60] rounded-full"/>
            </View>
        </View>
    )

}

export const CardHome = ({jobs=0})=>{
    const utc = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    jobs = 11
    const colorTextJobs = jobs === 0 ? "text-red-500" : jobs <= 5 ? "text-orange-400" : jobs <= 8 ?  "text-gold-100" : jobs > 8 ? "text-purple-600" : "text-black-300"
    return (
        <View className="mt-7 bg-gray-200  rounded-2xl">
                <View style={stylesCard.card}>
                    {/* Parte gris oscuro */}
                    <View style={stylesCard.darkBackground} />
                    
                        {/* Parte blanca */}
                    <View style={stylesCard.lightBackground} />

                    {/* Contenido */}
                    <View style={stylesCard.content}>
                        <View className="flex flex-row items-center justify-between bg-transparent">
                            <View className="p-8">
                                <Text className="text-5xl text-green-500 font-rubik-bold">$ {"210.12"}</Text>
                                <Text className="text-black-200 font-rubik-medium">Balance Today</Text>
                                <View className="mt-5">
                                    <Text className="text-4xl text-orange-500  font-rubik-bold">$ {"1204.12"}</Text>
                                    <Text className="text-black-200  font-rubik-medium">Balance this week</Text>
                                </View>
                            </View>
                            <View className="flex flex-col items-center gap-1">
                                <Text className="text-black-200 pr-8 font-rubik-medium">Jobs</Text>
                                <Text className={`${colorTextJobs} text-7xl pr-8 font-rubik-medium`}>{jobs}</Text>
                                <Text className="text-black-200 pr-8 font-rubik-medium">{utc}</Text>
                            </View>
                        </View>  
                    </View>
                </View>
             
        </View>
    )
}


export const ItemJob = ({job})=>{
    const IconJobs = ({category, color = "#4b5563"}) => {
        if( category == "New Install"){
            return (
                // <View className="bg-black-100 p-2 rounded rounded-xl4">
                    <Ionicons name="bag-add" size={34} color={color}/>
                // </View>
            )
        } else if (category == "Service Change"){
            return <Ionicons name="bag-check" size={38} color={color}/>
        } else if (category == "Trouble Call"){
            return <Ionicons name="construct" size={38} color={color}/>
        }else if (category == "Special Request"){
            return <Ionicons name="warning" size={38} color={color}/>
        } else{
            return <Ionicons name="bag-add" size={38} color={color}/>
        }
    }
    // States job for list jobs
    const StatusText = ({status})=>{
        if(status== "Complete"){

        }
    }
    return (
        <View className="mt-3 p-3 rounded-2xl bg-darkgray-300">
            <View className="flex flex-row gap-3 items-center justify-between">
                <View className="flex flex-row gap-3">
                    <IconJobs category={job.category} color="#3b82f6" />
                    <View>
                        <View className="flex flex-row items-center">
                            <Text className="text-2xl font-rubik-medium text-gray-100">{job.id} - </Text>
                            <Text className="text-gray-200 text-sm">{job.category}</Text>

                        </View>
                        <Text className="text-gray-200">{job.address}</Text>
                    </View>
                </View>
                <View>
                    <Text className="text-regular font-rubik-medium" >{job.status}</Text>
                </View>
            </View>
        </View>
    )
}



// styles for CardHome
const stylesCard = StyleSheet.create({
    card: {
      width: "100%",
      height: 180,
      borderRadius: 15,
      overflow: "hidden",
      position: "relative",
    },
    darkBackground: {
      position: "absolute",
      width: "110%",
      height: "110%",
      backgroundColor: "#e4e4e7", // Gris oscuro
    },
    lightBackground: {
      position: "absolute",
      width: "150%",
      height: "120%", // Cubrirá parte del card
      backgroundColor: "#f8fafc", // Blanco
      borderBottomLeftRadius: 70, // Arco suave en la división
      borderBottomRightRadius: 200, // Arco suave en la división
      transform: [{ rotate: "20deg" }], // Ligeramente inclinado
      top: -75, // Ajuste de posición para que cruce el card
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#000",
    },
});