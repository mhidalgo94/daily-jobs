import { SafeAreaView } from "react-native-safe-area-context";
import { HeadHome, CardHome, ItemJob } from "../../../components/tabs/home";
import {View,Text, TouchableOpacity,FlatList} from 'react-native';
import { Ionicons } from "../../../components/tabs/tabs-icons";


const JOBS = []
export default function HomeDashboart() {


    return (
          <View className="bg-darkgray">
            <SafeAreaView >
              <View className="pt-6 px-5 h-full">
                <HeadHome  />
                <CardHome  jobs={JOBS}/>

                <View className="mt-5 p-2 flex flex-row items-center justify-between">
                    <Text className="text-3xl text-white font-rubik-medium">List Jobs</Text>
                    <View className="flex flex-row gap-3">
                        <TouchableOpacity>
                            <Ionicons name="calendar" color="#f3f4f6" size={28}/>
                        </TouchableOpacity>

                    </View>
                </View>
                {JOBS.length ?
                  <FlatList className="mb-4 p-1" data={JOBS}  
                    renderItem={({item}) => <ItemJob job={item} />} 
                    keyExtractor={item => item.id}
                    // removeClippedSubviews={false}
                    // onMomentumScrollEnd={() => console.log("Scroll completado")}
                  // scrollEnabled={false}
                  // contentContainerStyle={{ flexGrow: 1 }}
                  contentContainerStyle={{ paddingBottom: 40 }}
                />:
                  <View className="flex-1 items-center gap-2 justify-center h-full">
                    <Ionicons name="alert-circle" size={50} color="#3b82f6"/>
                    <Text className="text-2xl text-blue-500">No jobs found</Text>
                  </View>
                }
              </View>
            </SafeAreaView>
          </View>
    )
}