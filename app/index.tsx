import { ScrollView,Image, View, Text,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import images from './contants/images';



export default function Index() {
  const router = useRouter();
  
  return (
    <SafeAreaView >
      <ScrollView className=" pt-[100px] h-full bg-white">
        <View className="pt-6 pb-[100px] mt-10">
          <Image
                source={images.logowithouttext}
                // className="w-full h-80"
                resizeMode="contain"
                style={{ width: "auto", height: 180 }}
                />
        </View>
        <Text className="mt-5 text-4xl text-center text-dark"> Welcome to</Text>
        <Text className="text-5xl text-center uppercase font-rubik-bold text-primary mt-5">Daily Report</Text>
        <Text className="text-center text-lg text-gray-600 px-6 mt-4 font-rubik-semibold">
        Sign in to manage your daily tasks easily.</Text>

        <TouchableOpacity className="bg-primary-300 shadow-md shadow-zinc-300 rounded-[10px] mt-6 mx-auto w-[300px] h-[50px] flex flex-row items-center justify-center" onPress={()=>router.push('./sign-in')}>
              <Text className="text-lg text-center text-white font-rubik-medium">Get Started</Text>
        </TouchableOpacity>
      
      </ScrollView>
    </SafeAreaView>
  );
}
