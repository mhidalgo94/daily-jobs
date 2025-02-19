import { SafeAreaView } from "react-native-safe-area-context";
import { HeadHome, CardHome, ItemJob } from "../../../components/tabs/home";
import {View,Text, TouchableOpacity,FlatList} from 'react-native'

import { Ionicons } from "../../../components/tabs/tabs-icons";


// const JOBS = [
//     {
//         "id": 445667,
//         "income": 41.33,
//         "category": "Trouble Call",
//         "status": "Complete",
//         "address": "Calle 123, Ciudad A"
//       },
//       {
//         "id": 445678,
//         "income": 51.22,
//         "category": "New Install",
//         "status": "Complete",
//         "address": "Avenida Principal 456, Ciudad B jacksonville florida"
//       },
//       {
//         "id": 446477,
//         "income":22.31,
//         "category": "Special Request",
//         "status": "Complete",
//         "address": "Carrera 789, Ciudad C"
//       },
//       {
//         "id": 446385,
//         "income": 51.22,
//         "category": "Service Change",
//         "status": "On Hold",
//         "address": "Zona Industrial, Ciudad D"
//       },
//       {
//         "id": 446341,
//         "income": 31.22,
//         "category": "New Install (Self)",
//         "status": "On Hold",
//         "address": "Barrio Norte, Ciudad E"
//       },
//       {
//         "id": 446335,
//         "income": 51.22,
//         "category": "Trouble Call",
//         "status": "Canceled",
//         "address": "Avenida Principal 456, Ciudad B"
//       },
//       {
//         "id": 446322,
//         "income": 51.22,
//         "category": "Trouble Call",
//         "status": "Canceled",
//         "address": "Avenida Principal 456, Ciudad B"
//       },
//       {
//         "id": 446321,
//         "income": 51.22,
//         "category": "Trouble Call",
//         "status": "Canceled",
//         "address": "Avenida Principal 456, Ciudad B"
//       }
// ]
const JOBS = []
export default function HomeDashboart() {


    return (
          <View className="bg-darkgray">
            <SafeAreaView >
              <View className="pt-6 px-5 h-full">
                <HeadHome jobs={JOBS.length} />
                <CardHome />

                <View className="mt-5 p-2 flex flex-row items-center justify-between">
                    <Text className="text-3xl text-white font-rubik-medium">List Jobs</Text>
                    <View className="flex flex-row gap-3">
                        <TouchableOpacity>
                            <Ionicons name="calendar" color="#f3f4f6" size={28}/>
                        </TouchableOpacity>

                    </View>
                </View>
                <View className="flex-1 items-center gap-2 justify-center h-full">
                  <Ionicons name="alert-circle" size={50} color="#3b82f6"/>
                  <Text className="text-2xl text-blue-500">No jobs found</Text>
                </View>
                
              </View>

            </SafeAreaView>
          </View>
    )
}