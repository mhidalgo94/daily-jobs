import { SafeAreaView } from "react-native-safe-area-context";
import { HeadHome, CardHome, ListJobs } from "../../../components/tabs/home";
import {ScrollView, View, TextInput,Text, TouchableOpacity,FlatList} from 'react-native'

import { useState } from "react";
import { Ionicons } from "../../../components/tabs/tabs-icons";


const JOBS = [
    {
        "id": 445667,
        "income": 41.33,
        "category": "Trouble Call",
        "status": "Complete",
        "address": "Calle 123, Ciudad A"
      },
      {
        "id": 445678,
        "income": 51.22,
        "category": "New Install",
        "status": "Complete",
        "address": "Avenida Principal 456, Ciudad B"
      },
      {
        "id": 446477,
        "income":22.31,
        "category": "Special Request",
        "status": "Completado",
        "address": "Carrera 789, Ciudad C"
      },
      {
        "id": 446385,
        "income": 51.22,
        "category": "Service Change",
        "status": "On Hold",
        "address": "Zona Industrial, Ciudad D"
      },
      {
        "id": 446341,
        "income": 31.22,
        "category": "New Install (Self)",
        "status": "On Hold",
        "address": "Barrio Norte, Ciudad E"
      },
      {
        "id": 446335,
        "income": 51.22,
        "category": "Trouble Call",
        "status": "Not Home",
        "address": "Avenida Principal 456, Ciudad B"
      },
      {
        "id": 446322,
        "income": 51.22,
        "category": "Trouble Call",
        "status": "Not Home",
        "address": "Avenida Principal 456, Ciudad B"
      },
      {
        "id": 446321,
        "income": 51.22,
        "category": "Trouble Call",
        "status": "Not Home",
        "address": "Avenida Principal 456, Ciudad B"
      }
]

export default function HomeDashboart() {
    const [search, setSearch] = useState("")


    return (
        <SafeAreaView >
            <View className="pt-6 px-5 h-full bg-white">
            {/* <ScrollView nestedScrollEnabled={true} className="pt-6 px-5 h-full bg-white"> */}
                <HeadHome />
                <CardHome />
                <View className="flex flex-row items-center gap-3 w-full mt-12 border border-gray-400 p-3 rounded-xl">
                    <Ionicons name="search"/>
                    <TextInput
                        className="text-xl" 
                        onChangeText={setSearch}
                        value={search}
                        placeholder="Search: Job Number, Address"
                        onFocus={false}
                        keyboardType="default"
                        autoComplete="off"
                        autoCorrect={false}
                    />
                </View>

                <View className="mt-5 p-2 flex flex-row items-center justify-between">
                    <Text className="text-2xl font-rubik-medium">List Jobs</Text>
                    <View className="flex flex-row gap-3">
                        <TouchableOpacity>
                            <Ionicons name="calendar" size={28}/>
                        </TouchableOpacity>

                    </View>
                </View>
                <FlatList className="mb-4" data={JOBS}  
                    renderItem={({item}) => <ListJobs job={item} />} 
                    keyExtractor={item => item.id}
                    // removeClippedSubviews={false}
                    // onMomentumScrollEnd={() => console.log("Scroll completado")}
                // scrollEnabled={false}
                // contentContainerStyle={{ flexGrow: 1 }}
                contentContainerStyle={{ paddingBottom: 40 }}
                />
                
            </View>
            
            {/* </ScrollView> */}

        </SafeAreaView>
    )
}