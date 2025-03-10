import {View, Text, ScrollView } from "react-native";
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




function CreateJob(){
    // Form react-hook
    const { control , handleSubmit, formState:{errors}} = useForm();
    const [ loading, setLoading] = useState(false);
    const [statusJob, setStatusJob] = useState(undefined);
    const [incomeValue, setIncomeValue ] = useState(0);

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


    const onSubmit = (data) => { 
        setLoading(true);

        if(validateSelect()){
            const formData = new FormData();
            const jsonData = {
                job_number : data?.job_number,
                address : data?.address,
                comment: data?.comment,
                job_status : statusJob,
                category_job : typeJob,
                income : incomeValue,
                coastRate: coastRate
            }


            // 🔹 Convertir imágenes a archivo binario
            // for (const image of images) {
            images.forEach(async (image, index)=>{
                const file = await RNFS.readFile(image.uri, 'base64'); // Leer imagen como base64
                formData.append("images", {
                uri: image.uri,
                name: image.fileName || `image_${index}.jpg`,
                type: image.mimeType || "image/jpeg",
                data: file, // Enviar la imagen en binario
                });
            });
            Object.keys(jsonData).forEach((key) => {
                formData.append(key, jsonData[key]);
            })
        }
        setLoading(false)

        

    }


    useEffect(()=>{
        let incomeCategory = 0;
        let sumCoastRate = 0;
        if(typeJob){
            setValidTypeJob(false);
            incomeCategory = categoryJob.find(i => i.label == typeJob).defaultPrice;
            setIncomeValue(incomeCategory.defaultPrice);
        }
        if(coastRate.length){
            sumCoastRate = coastRate.map(items => items.cost * items.amount).reduce((acc, num) => acc + num, 0);

            setIncomeValue(incomeCategory + sumCoastRate);
        } else{
            setIncomeValue(incomeCategory + sumCoastRate);
        }

        if(statusJob){
            setValidStatusJob(false);
        }

    },[typeJob,coastRate, statusJob])

    return (
        <View className="h-full">

            <HeaderJob bgColorClass="pb-4" />
            <ScrollView className="px-2 mb-1 h-full">

            <View className="px-2 py-1 h-full">
                <View className="">
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
                <Text className="text-gray-300 text-lg mt-2">Status Job</Text>
                    <AccordionSelect title={"Select Status"} value={statusJob}  setValue={setStatusJob} selectList={["Complete", "Canceled", "On Hold"]}/>
                    {validStatusJob && <Text className="text-red-500 text-left mt-2 text-lg">This field is required</Text>}

                </View>
                {/* Select Category Job */}
                <View className="">
                    <Text className="text-gray-300 text-lg mt-2">Category Job</Text>
                    <AccordionSelect title={"Select Category"} value={typeJob}  setValue={setTypeJob} selectList={listTypeJob} height={160}/>
                    {validTypeJob && <Text className="text-red-500 text-left mt-2 text-lg">This field is required</Text>}

                </View>
                
                {/* Checked Coast Rates  Job */}
                <View className="mt-4">
                    <Text className="text-gray-300 text-lg" >Coast Rates</Text>
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
            <View className="px-4 border-t border-gray-500">
                <Text className="text-gray-300 text-lg font-rubik-medium">Income:</Text>
                <Text className="text-gray-300 text-lg font-rubik-medium">$ {incomeValue.toFixed(2)}</Text>
            </View>
            <View className="px-4">
                <CustomButton onPress={handleSubmit(onSubmit)} loading={loading} text="Submit" title="Submit"/>
            </View>
    </View>
                

    )
}

export default CreateJob;