import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {View, Text, ScrollView, Alert, TextInput } from "react-native";
import RNFS from 'react-native-fs';
import { HeaderJob } from "../../../components/jobs-component";
import { CustomInput } from "../../../components/custom-input";
import { CustomButton } from "../../../components/custom-button";
import { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form"
import ListCodeJob from "../../../components/list-code-job";
import AccordionSelect from "../../../components/accordion-select";
import UploadFilesButton from "../../../components/upload-images";
import categoryJob from "../../contants/category-job";

import { useFetchApi } from "../../../hooks/fetch_api";
import {useGlobalContextPrivate} from "../../../components/global-provider";
import { PickerDate } from '../../../components/picker/date-picker';

import { useRouter } from 'expo-router';


function CreateJob(){
    const route = useRouter()
    const {logout} = useGlobalContextPrivate()
    const [ loadingBtn, setLoadingBtn] = useState(false);
    
    // Form react-hook
    const [date, setDate] = useState(new Date());
    const { control , handleSubmit, formState:{errors}} = useForm();
    const [statusJob, setStatusJob] = useState(undefined);
    const [incomeValue, setIncomeValue ] = useState(0.00);
    const [inputIncome, setInputIncome] = useState(incomeValue)

    // Images variables
    const [images, setImages] = useState([]);
    // list type Jon
    const [typeJob, setTypeJob] = useState(undefined);
    // const listTypeJob = ["New install","New Install (Self)","Service Change","Trouble Call","Special Request"]
    const listTypeJob = categoryJob.map(item => item.label);
    // Coast Rate
    const [ coastRate,setCoastRate] = useState([]);


    // Status Requiered Select
    const [validStatusJob, setValidStatusJob] = useState(false);
    const [validTypeJob, setValidTypeJob] = useState(false);
    const validateSelect = () => {
        if(!statusJob){
            setValidStatusJob(true);
            return false;
        }
        if(!typeJob){
            setValidTypeJob(true)
            return false;
        }
        return true;

    }


    const onSubmit = async (data) => { 
        setLoadingBtn(true);

        if (validateSelect()){
            const base64images = await Promise.all(
                images.map(async (image, index) => {
                    const file = await RNFS.readFile(image.uri, 'base64');
                    return {
                        name: image.fileName || `image_${index}.jpg`,
                        type: image.mimeType || "image/jpeg",
                        data: file, // Image to  binary
                    };
                })
            );

            const jsonData = {
                job_number : data?.job_number,
                address : data.address,
                comment: data.comment,
                status : statusJob,
                category : typeJob,
                income : parseFloat(incomeValue),
                coastRate: coastRate,
                images : base64images,
                date_job: date.toLocaleDateString()
            }
            try{
                const response = await useFetchApi("/jobs/", method= "POST",body= jsonData)
                // Logout if Required Authentication
                if(response.status === 401){
                    Alert.alert("Message","User session expired")
                    logout()
                }
                if(response.status === 400){
                    const response_json = await response.json();
                    if(response_json.detail){
                            Alert.alert("Message", response_json.detail.error)
                    } else {
                        Alert.alert("Message", "Error Server, Try later.")
                    }
                }
                if(response.status >= 500){
                    const response_json = await response.json();
                    if(response_json.detail){
                        Alert.alert("Message", response_json.detail.error)
                    } else {
                        Alert.alert("Message", "Error Server, Try later.")
                    }
                }
                if(response.ok){
                    Alert.alert("Completed",`Number ${data.job_number} saved successfully`);
                    route.back()
                }
            }catch(err){
                
                Alert.alert("Error Conexion", "Try later")
            }finally{
                setLoadingBtn(false);
            }
            
        }
        setLoadingBtn(false)
    }

    useEffect(()=>{
        
        // validate field before submit
        if(statusJob){
            setValidStatusJob(false);
        }
        if(inputIncome.length > 0){
            setIncomeValue(inputIncome)
        }else{
            let incomeCategory = 0;
            let sumCoastRate = 0;
            if(coastRate.length){
                sumCoastRate = coastRate.map(items => items.cost * items.amount).reduce((acc, num) => acc + num, 0);

                setIncomeValue((parseFloat(incomeCategory) + parseFloat(sumCoastRate)).toFixed(2));
            } else{
                setIncomeValue((parseFloat(incomeCategory) + parseFloat(sumCoastRate)).toFixed(2));
            }
            // If Status is diferent Complete dont get Income job
            if (statusJob !== "Complete"){
                incomeCategory = 0.00;
                setIncomeValue(incomeCategory)
            }
        }
    },[coastRate, statusJob, inputIncome, date])

    return (
        <View className="h-full">
            <HeaderJob bgColorClass="pb-4" />
            <KeyboardAwareScrollView  contentContainerStyle={{ flexGrow: 1 }} extraScrollHeight={50}>
                <ScrollView className="px-2 mb-1 h-full">

                <View className="px-2 py-1 h-full">
                    <View className="">
                        <View className="flex flex-row items-center justify-between py-2">
                            <View className="flex flex-row gap-1 items-center">
                            <Text className="text-primary-200 text-lg font-rubik-medium">Date: </Text>
                            <Text className="text-lg text-gray-300 font-rubik-medium">{date.toLocaleDateString()}</Text>

                            </View>
                            <PickerDate  date={date} setDate={setDate}/>
                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required:"The field is required", 
                                minLength:{value:6, message:"Must be at least 6 characters long"}, 
                                maxLength:{value:6,message:"It cannot have more than 6 characters"}, 
                                pattern:{value:/^[0-9]+$/, message:"Only numbers are allowed"

                                }
                            }}
                            render={({ field : { onChange, onBlur, value }})=>(
                                <>
                                    <CustomInput
                                        className="text-white text-base p-2 bg-darkgray-200"
                                        placeholder="Job Number"
                                        label="Job Number"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        keyboardType="default"
                                        />
                                        {errors?.job_number && (
                                        <Text className="text-red-500 text-left mt-2 text-lg">{errors?.job_number.message || 'Error'}</Text>
                                        )}
                                </>
                            )}
                            name="job_number"
                        />
                        <Controller
                            control={control}
                            rules={{required:"The field is required"}}
                            render={({ field : { onChange, onBlur, value }})=>(
                                <>
                                <CustomInput 
                                    className="text-white text-base p-2 bg-darkgray-200"
                                    placeholder="Address"
                                    label="Address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="default"
                                />
                                {errors?.address && (
                                    <Text className="text-red-500 text-left mt-2 text-lg">{errors?.address.message || 'Error'}</Text>
                                )}
                                </>
                            )}
                            name="address"

                        />
                        {/* Select Status Job */}
                        <View className="mt-2">
                        <Text className="text-primary-200 text-lg font-rubik-medium mt-2">Status Job</Text>
                            <AccordionSelect title={"Select Status"} value={statusJob}  setValue={setStatusJob} selectList={["Complete", "Canceled", "On Hold"]}/>
                            {validStatusJob && <Text className="text-red-500 text-left mt-2 text-lg">This field is required</Text>}

                        </View>
                        {/* Select Category Job */}
                        <View className="">
                            <Text className="text-primary-200 text-lg font-rubik-medium mt-2">Category Job</Text>
                            <AccordionSelect title={"Select Category"} value={typeJob}  setValue={setTypeJob} selectList={listTypeJob} height={160}/>
                            {validTypeJob && <Text className="text-red-500 text-left mt-2 text-lg">This field is required</Text>}

                        </View>
                        
                        {/* Checked Coast Rates  Job */}
                        <View className="mt-4">
                            <Text className="text-primary-200 font-rubik-medium text-lg" >Coast Rates</Text>
                            <ListCodeJob height={250} setCoastRate={setCoastRate}/>                        
                        </View>

                        {/* Upload Images */}
                        <UploadFilesButton images={images} setImages={setImages}/>
                        

                        <Controller
                            control={control}
                            rules={{}}
                            render={({ field : { onChange, onBlur, value }})=>(
                                <>
                                <CustomInput 
                                    className="text-white text-base p-2 bg-darkgray-200"
                                    placeholder="Write comment"
                                    label="Comment"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="default"
                                    multiline
                                    numberOfLines={4}
                                    style={{ minHeight: 100, maxHeight: 200 }}
                                />
                                {errors?.comment && (
                                    <Text className="text-red-500 text-left mt-2 text-lg">{errors?.comment.message || 'Error'}</Text>
                                )}
                                </>
                            )}
                            name="comment"
                        />
                    </View>

                </View>
                </ScrollView>
            {/* Income Input*/}
            <View className="px-4">
                <View className="flex flex-row justify-between gap-2">
                    <Text className="text-primary-200 font-rubik-medium text-lg">Income</Text>
                </View>
                <View className="bg-darkgray-200 p-1 mt-1 rounded-lg border border-gray-700">
                    <TextInput 
                        placeholder={incomeValue}
                        className="text-white text-base p-2 bg-darkgray-200"
                        // label="Income"
                        onChangeText={setInputIncome}
                        value={inputIncome}
                        placeholderTextColor="#f5f5f5"
                        keyboardType="decimal-pad"
                    />
                </View>
            </View>
            <View className="px-4">
                <CustomButton onPress={handleSubmit(onSubmit)} loading={loadingBtn} text="Submit" title="Submit"/>
            </View>
            </KeyboardAwareScrollView>
        </View>

    )
}

export default CreateJob;