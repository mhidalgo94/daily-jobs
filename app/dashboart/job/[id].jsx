import {View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { HeaderJob } from "../../../components/jobs-component";
import { useFetchApi } from '../../../hooks/fetch_api';
function Job(){
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(false)
    const [job, setJob] = useState(null)

    useEffect(()=>{
        const GetJob = async () => { 
                setLoading(true);
                const url = `/jobs/${id}`
                try{
                  const response = await useFetchApi(url , method="GET");
                  if (!response.ok) {
                    Alert.alert("Message", "Error Server, Try later.")
                  }
                  const data = await response.json();
                  setJob(data)

                }catch{
        
                }finally{
                  setLoading(false);
                }
                
                
              }
        GetJob()
    },[])

    const CoastRateItem = ({item})=>{
      return (
        <View className="flex flex-row items-center ml-1 gap-2">
          <Text className="text-white text-lg font-rubik-medium">{item.amount}</Text>
          <View className="flex-1 flex-row items-center justify-between w-full">
            <Text className="text-white text-lg font-rubik-medium">- {item.description}</Text>
            <Text className="text-white text-lg font-rubik-medium">{item.cost}</Text>
          </View>
        </View>
      )
    }
    return (
        <View className="h-full">
            <HeaderJob bgColorClass="pb-4" titleHead={id}/>
            <View className="px-4 py-1 mt-2">
              {!loading ?
              <View className="flex gap-2">
                <View className="flex  flex-row gap-2 justify-between">
                  <Text className="text-primary-200 text-2xl font-rubik-medium">Date:</Text>
                  <Text className="text-white text-2xl font-rubik-medium">{job?.date_job}</Text>
                </View>
                <View className="flex flex-row justify-between gap-2 ">
                  <Text className="text-primary-200 text-2xl font-rubik-medium">Address:</Text>
                  <Text className="text-white text-2xl text-right font-rubik-medium">{job?.address}</Text>
                </View>
                <View className="h-px bg-gray-300 my-4" />
                <View className="flex flex-row justify-between gap-2 ">
                  <Text className="text-primary-200 text-2xl font-rubik-medium">Category:</Text>
                  <Text className="text-white text-2xl text-right font-rubik-medium">{job?.category}</Text>
                </View>
                <View className="flex flex-row justify-between gap-2">
                  <Text className="text-primary-200 text-2xl font-rubik-medium">Status:</Text>
                  <Text className="text-white text-2xl text-right font-rubik-medium">{job?.status}</Text>
                </View>
                 <View className="flex flex-row justify-between gap-2">
                  <Text className="text-primary-200 text-2xl font-rubik-medium">Income:</Text>
                  <Text className="text-white text-2xl text-right font-rubik-medium">$ {job?.income}</Text>
                </View>
                <View>
                  <Text className="text-primary-200 text-2xl font-rubik-medium">Coast Rates:</Text>
                  <View className="p-2 mt-2 bg-darkgray-300 rounded-lg">
                    {job?.coastRate.length ?
                      <FlatList
                        data={job?.coastRate}
                        scrollEnabled={false}
                        renderItem={({item}) => <CoastRateItem item={item}/>}
                      />
                    :
                    <Text className="text-center text-white">No added codes</Text>
                    }
                  </View>
                </View>
                <View>
                  <View className="flex flex-row justify-between gap-2 mt-2">
                    <Text className="text-primary-200 text-2xl font-rubik-medium">Images:</Text>
                    <Text className="text-white text-2xl text-right font-rubik-medium">{job?.images.length}</Text>
                  </View>
                  <View>
                    {job?.images.length ?
                      <View className="">
                        <Text className="text-center text-white">Aqui van las images</Text>
                        </View>
                        :
                        <View className="flex items-center justify-center h-40">
                          <Text className="text-center text-white">No images saved</Text>
                        </View>
                    }
                  </View>
                </View>
                <View className=" mt-2">
                  <Text className="text-primary-200 text-2xl font-rubik-medium">Comment:</Text>
                  <View className="p-2 mt-2 h-40 bg-darkgray-300 rounded-lg">
                    <ScrollView>
                      <Text className="text-white text-lg mt-2 pl-2 font-rubik-medium">{job?.comment || "No comments"}</Text>
                    </ScrollView>
                  </View>
                </View>

                <TouchableOpacity className=" bg-darkgray border-red-500 rounded-lg border border-dashed  p-2 mt-5">
                  <Text className="text-red-500 text-center text-lg font-rubik-bold">Delete Job</Text>
                </TouchableOpacity>
              </View>
              :
              <Text>{loading ? "Loading" : "ready"} -----{">>>>>"} {id}</Text>
              }
            </View>
        </View>
    )
}

export default Job;