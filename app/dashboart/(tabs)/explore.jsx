import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, View, Text, TouchableOpacity, ActivityIndicator, Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { useFetchApi } from "../../../hooks/fetch_api";
import { ItemJob } from "../../../components/tabs/home";
import { Ionicons } from "../../../components/tabs/tabs-icons";


export default function Explore(){
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    
    const searchJob = async ()=>{
        setLoading(true);
        try {
            const uri = `/jobs/search/${search}`;
            const response = await useFetchApi(uri, method="GET");
            const data = await response.json();
            if (!response.ok) {
                Alert.alert("Message", `${data.detail}`)
            }

            setJobs(data)
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if (search.length < 1){
        setIsDisabled(true)

        }else{
            setIsDisabled(false)
        }
    }, [search])

    return (
        <View className="flex-1 bg-darkgray">
            <SafeAreaView  className="flex-1 bg-darkgray">
                <View className="mt-2 pl-4">
                    <Text className="mt-5 text-3xl text-white">Seach Job</Text>
                </View>
                <View className="mx-2 mt-2 p-2 flex flex-row justify-between items-center">
                    <TextInput
                        onChangeText={setSearch}
                        value={search}
                        placeholder="Job number or address"
                        placeholderTextColor="#A0A0A0"
                        className="p-3 w-[320] bg-gray-700 text-white rounded-lg border border-gray-700 focus:border-gray-500"
                        autoComplete="off"
                        keyboardType="default"
                        />
                        <TouchableOpacity disabled={isDisabled} onPress={searchJob} className={`p-2  rounded-lg ${
                        isDisabled ? "bg-gray-400" : "bg-primary"}`}>
                            {!loading ? 
                                <Icon name="search" size={27} color="#d4d4d8"/>
                                :
                                <View className="p-1">
                                    <ActivityIndicator size="small" color="#020617" />
                                </View>
                            }
                        </TouchableOpacity>
                </View>
                <View className="h-[1px] bg-gray-300 mx-4 mt-2" />
                <View className="flex-1 mt-1 p-3">
                        {loading ? 
                            <View className="flex items-center h-1/2 justify-center">
                                <ActivityIndicator size="large" color="#d4d4d4" />
                            </View>
                            :
                            jobs.length ?
                            <FlatList className="p-1" data={jobs}  
                            renderItem={({item}) => <ItemJob job={item} />} 
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ paddingBottom: 50 }}
                            />
                            :
                            <View className="flex items-center gap-2 justify-center h-1/2">
                                <Ionicons name="alert-circle" size={50} color="#3b82f6"/>
                                <Text className="text-2xl text-blue-500">No jobs found</Text>
                                <Text className="text-normal text-gray-500">Input Job Number or Addres</Text>
                            </View>
                        }
                    </View>
            </SafeAreaView>
            
        </View>
    );
}