import {Text, View,TouchableOpacity, ScrollView, TextInput} from 'react-native';
import Accordion from './accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import listCoastRate from '../app/contants/list-coast-rate';
import { useState, useEffect } from 'react';


function TextAmountCode({amount}){
    return (
        <View className="bg-green-500 ml-[2] mt-[2.5] mr-[1] mb-[1] w-[24.5] h-[24.5] rounded-full flex flex-row justify-center items-center">
            <Text className="text-center">{amount}</Text>
        </View>
    )
}



function ListCodeJob({setCoastRate,...rest}){

    const { rates } = listCoastRate;
    const [searchCode, setSearchCode] = useState(null);
    const [jsonCodeRate, setJsonCodeRate] = useState(rates);


    const toggleCheckbox = (job_code, amount) => {
        
        setJsonCodeRate(prevState => 
            prevState.map(item =>
                item.job_code === job_code ? { ...item, "amount" : amount + 1 } : item
            )
        );

    };

    const handleLongPress = (job_code, amount)=>{
        if (amount == 0){
            return false
        }else{
            setJsonCodeRate(prevState => 
                prevState.map(item =>
                    item.job_code === job_code ? { ...item, "amount" : 0 } : item
                )
            );
        }
    }
    // Filter list code rates
    const filteredRate = searchCode ? jsonCodeRate.filter(
        (item) =>
          item.job_code.toLowerCase().includes(searchCode.toLowerCase()) ||
          item.description.toLowerCase().includes(searchCode.toLowerCase())
      ) : jsonCodeRate;
    

    useEffect(()=>{
        const listCodeJobChecked = jsonCodeRate.filter((values)=> values.amount > 0)
        setCoastRate(listCodeJobChecked);

    },[jsonCodeRate])
    return(
        <View className="mt-2">
            <Accordion title="Select..." {...rest}>
                <View className="bg-darkgray-200 px-2 mx-2 rounded-lg border border-gray-700">
                    <TextInput 
                        placeholder={"Search"}
                        className="text-white text-base p-2 bg-darkgray-200"
                        // label="Income"
                        // onChangeText={(values)=>filterCode(values)}
                        onChangeText={setSearchCode}
                        value={searchCode}
                        placeholderTextColor="#f5f5f5"
                        keyboardType="decimal-pad"
                    />
                </View>
                <ScrollView>
                {filteredRate.map((item)=>{
                        return (
                            <TouchableOpacity className="flex flex-row items-center justify-between gap-1 p-1 w-full"
                                key={item.job_code}
                                onPress={() => toggleCheckbox(item.job_code, item.amount)}
                                onLongPress={()=>handleLongPress(item.job_code, item.amount)} // Delete amount code rates
                                delayLongPress={500}
                            >
                                <View className="flex flex-row items-center justify-between gap-1 w-full">
                                    <View className="flex flex-row items-center gap-1">
                                        {item.amount == 0 ? <Icon name="close-circle" size={28} color="#b91c1c"/> : <TextAmountCode amount={item.amount}/>}
                                        <Text className={`${item.checked ? "text-green-500" : "text-gray-200"} text-lg`}>{item.job_code}</Text>
                                        <Text className={`${item.checked ? "text-green-500" : "text-gray-200"} text-lg`}>{item.description.slice(0,27)}...</Text>
                                    </View>
                                        <Text className={`${item.checked ? "text-green-500" : "text-blue-400"} text-left pr-2`}>${item.cost}</Text>
                                </View>
                                
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </Accordion>
        </View>
    )
}


export default ListCodeJob;