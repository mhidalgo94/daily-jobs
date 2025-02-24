import { ScrollView,Image, View, Text,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {Ionicons} from "../components/tabs/tabs-icons";
import images from './contants/images';
import { BlurView } from 'expo-blur';


export default function Index() {
  const router = useRouter();
  
  return (
    <View className="bg-darkgray">

      <BlurView intensity={100}>
        <SafeAreaView >
          <Image source={images.bgGradiant} className="absolute left-0 top-0"/>
            <ScrollView className="pt-[100px] h-full bg-dark/40">
              <View className="pt-6 pb-[100px] mt-10">
                <Image
                      source={images.iconOnlyWhite}
                      // className="w-full h-80"
                      resizeMode="contain"
                      style={{ width: "auto", height: 180 }}
                      />
              </View>
              <View className="h-full w-full bg-transparent rounded-[40]">

                <View className="h-full bg-transparent " >
                    <Text className="mt-5 text-3xl text-center text-gray-200"> Welcome to</Text>
                    <Text className="text-4xl text-center uppercase font-rubik-bold text-white mt-5">Daily Report</Text>
                    <Text className="text-center text-lg text-gray-200 px-6 mt-4 font-rubik-semibold">
                    Sign in to manage your daily tasks easily.</Text>

                    <TouchableOpacity className="bg-primary-300 rounded-[10px] mt-9 mx-auto w-[300px] h-[50px] flex flex-row items-center justify-center gap-3" onPress={()=>router.push('./sign-in')}>
                          <Text className="text-2xl text-center text-gray-200 font-rubik">Get Started</Text>
                          <Ionicons name="arrow-forward" color="#F7F7F7"/>
                    </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
        
        </SafeAreaView>
      </BlurView>
    </View>

  );
}
