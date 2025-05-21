import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadHome, CardHome, ItemJob } from "../../../components/tabs/home";
import {View,Text,FlatList, ActivityIndicator} from 'react-native';
import { Ionicons } from "../../../components/tabs/tabs-icons";
import { useFetchApi } from "../../../hooks/fetch_api";
import { PickerDate } from '../../../components/picker/date-picker';


export default function HomeDashboart() {
    const [ date, setDate ] = useState(new Date());
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [week_earned, setWeekEarned] = useState(0)

    useEffect(() =>{
      const ListJobsFetch = async () => { 
        setLoading(true);
        const params = new URLSearchParams({ date_filter: date.toLocaleDateString() });
        const url = `/jobs/by-date?${params.toString()}`
        try{
          const response = await useFetchApi(url , method="GET");
          if (!response.ok) {
            Alert.alert("Message", "Error Server, Try later.")
          }
          const data = await response.json();
          setJobs(data)
        }catch{

        }finally{
          setLoading(false);
        }
        
        
      }
      ListJobsFetch()

    }, [date])

    // Get week earned
    useEffect(()=> {
        const getIncome = async ()=>{
        const params = new URLSearchParams({ date_filter: date.toLocaleDateString() });
        const url = `/income-week/by-date?${params.toString()}`
        const response = await useFetchApi(url , method="GET");
        const data = await response.json();
        setWeekEarned(data.week_earned)
        }
        getIncome()
    }, [date])

    return (
          <View className="bg-darkgray">
            <SafeAreaView >
              <View className="pt-6 px-5 h-full">
                <HeadHome  />
                <CardHome  jobs={jobs} date={date} week_earned={week_earned} loading={loading}/>

                  <View className="mt-5 p-2 flex flex-row items-center justify-between">
                      <Text className="text-3xl text-white font-rubik-medium">List Jobs</Text>
                      <View className="flex flex-row gap-3">
                          <PickerDate  date={date} setDate={setDate}/>
                      </View>
                  </View>
                  <View className="h-1/2">

                    {loading ? 
                      <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="#d4d4d4" />
                      </View>
                    :
                    jobs.length ?
                    <FlatList className="p-1" data={jobs}  
                      renderItem={({item}) => <ItemJob job={item} />} 
                      keyExtractor={item => item.id}
                      // removeClippedSubviews={false}
                      // onMomentumScrollEnd={() => console.log("Scroll completado")}
                    // scrollEnabled={false}
                    // contentContainerStyle={{ flexGrow: 1 }}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    />
                      :
                    <View className="flex-1 items-center gap-2 justify-center h-full">
                      <Ionicons name="alert-circle" size={50} color="#3b82f6"/>
                      <Text className="text-2xl text-blue-500">No jobs found</Text>
                      <Text className="text-normal text-gray-500">Change date for more jobs</Text>
                    </View>
                  }
                  </View>

                </View>
            </SafeAreaView>
          </View>
    )
}