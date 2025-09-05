import {View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import {PickerDate} from '../picker/date-picker'
import {useState, useEffect} from 'react';
import { useFetchApi } from '../../hooks/fetch_api';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Ionicons } from '../tabs/tabs-icons';

export default function SummaryChart(){
    const [ date, setDate ] = useState(new Date());
    const [allData, setAllData] = useState();
    const [weekData, setWeekData] = useState([]);
    const [loadingChart, setLoadingChart] = useState(false);

    // Segment Values
    const SegmentValues = ['Income', 'Jobs']
    const [selectedValue, setSelectedValue] = useState(SegmentValues[0]); 

    const mappingDataIncome = (data) =>{
        console.log("mapping data")
        const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const values =  allDays.map((day,income_total) => {
            const jobForDay = data.jobs.find(item => item.day_of_week === day);
            // Condition when is income bar or jobs bar
            const value =  selectedValue === "Income" ? jobForDay ? Math.round(jobForDay.income_total) : null : jobForDay?.jobs_count ?? null;
            return {
                label: day,
                frontColor: income_total < 100 ? "#3b82f6":  "#8b5cf6",
                gradientColor: income_total < 100 ? "#10b981":  "#06b6d4",
                // value: jobForDay ? Math.round(jobForDay.income_total) : 0,
                value ,
                valueTextColor: 'gray'
            };
        })
        setWeekData(values)
        // return values
    }

    // Get week earned
    useEffect(()=> {
        const getIncome = async ()=>{
            setLoadingChart(true)
            try{
                const params = new URLSearchParams({ date_filter: date.toLocaleDateString() });
                const url = `/analitics/range-date-week?${params.toString()}`;
                const response = await useFetchApi(url , method="GET", );
                if (!response.ok) {
                    Alert.alert("Message", "Error Server, Try later.")
                }
                const dataResponse = await response.json();
                setAllData(dataResponse);
                const chartData =  mappingDataIncome(dataResponse);
                // setWeekData(chartData)
            }catch(err){
                console.log(err)
            }finally{
                setLoadingChart(false)
            }
        }
        getIncome()
    }, [date])

    useEffect(()=>{
        if(!allData) return;
        mappingDataIncome(allData);

    },[selectedValue])

    return (
        <View className="mx-4 mt-4 p-3 bg-darkgray-200 rounded-lg">
            <View className="flex flex-row justify-between align-center">
                <Text className="text-lg text-primary-200">Week: 08/09/2025</Text>
                <PickerDate  date={date} setDate={setDate}/>

            </View>
            <View className="mt-3 pt-2">
            {loadingChart ? (
                // 👇 Loading State
                <View className="items-center justify-center h-64 w-full">
                    <ActivityIndicator size="large" color="#3b82f6" />
                    <Text className="text-white mt-2">Loading chart...</Text>
                </View>
            ) : (
            //Chart
            <BarChart data={weekData} 
                // maxValue={maxValue}
                key={selectedValue}
                height={250} width={300}
                barWidth={25}
                minHeight={3}
                topSpacing={20}
                labelsExtraHeight={10}
                barBorderRadius={5}
                spacing={18}
                noOfSections={2}
                xAxisThickness={0}
                yAxisThickness={0}
                rulesColor="#6b7280"
                xAxisLabelTextStyle={{color:'gray'}}
                yAxisWidth={0}  
                yAxisTextStyle={{ color: 'gray' }}
                isAnimated
                animationDuration={500}
                disableScroll
                showGradient
                valueTe
                renderTooltip={(item, index) => {
                    return <Text className="text-gray-300 text-center font-rubik-bold">{selectedValue === "Income" ? `$${item.value}` : `${item.value}`}</Text>
                }}
                />
            )}
            </View>
            <View className="flex-row items-center">
                <TouchableOpacity>
                    <Ionicons name="caret-back-circle-outline" size={38}></Ionicons>
                </TouchableOpacity>
                    <SegmentedControl
                        appearance='dark'
                        style={{ flex: 1, marginHorizontal: 8 }}
                        values={SegmentValues}
                        selectedIndex={SegmentValues.indexOf(selectedValue)}
                        onChange={(event) => {
                        const index = event.nativeEvent.selectedSegmentIndex;
                        setSelectedValue(SegmentValues[index]);
                        }}
                    />
                <TouchableOpacity>
                    <Ionicons name="caret-forward-circle-outline" size={38}></Ionicons>
                </TouchableOpacity>
            </View>
        </View>
    )
}