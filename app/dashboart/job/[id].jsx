import {View,Platform, Text, FlatList, TouchableOpacity,Modal,Pressable, ScrollView, ActivityIndicator, Alert, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { HeaderJob } from "../../../components/jobs-component";
import { useFetchApi } from '../../../hooks/fetch_api';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

function Job(){
    const route = useRouter()
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [job, setJob] = useState(null)
    
    // Modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [uriImagenModal, setUriImagenModal] = useState("")

    const handleImagePress = (uri) => {
      setModalVisible(true);
      setUriImagenModal(uri)
    };

    const handleCloseModal = () => {
      setModalVisible(false);
    };
    // Función para descargar la imagen
    const onSaveImageAsync = async (uriImagen) => {
      if (Platform.OS !== 'web') {
        try {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission denied to access the gallery.');
            return;
          }

          const filename = uriImagen.split('/').pop();
          const path = FileSystem.documentDirectory + filename;

          const downloadResumable = await FileSystem.downloadAsync(uriImagen, path);
          await MediaLibrary.saveToLibraryAsync(downloadResumable.uri);

          Alert.alert('Saved image');
        } catch (error) {
          // console.log('Error saving image:', error);
          Alert.alert('Error saving image');
        }
      }  
    }   

    // Finish modal

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
                  console.log(err)
                }finally{
                  setLoading(false);
                }
              }
        GetJob()
    },[])

    const deleteJob = async()=>{
      setLoadingBtn(true)
      try{
          
          
            Alert.alert('Delete Job', `Are you sure you want to delete this job: ${id}?`, [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: async () => {
                  const url = `/jobs/${id}`;
                  const response = await useFetchApi(url , method="DELETE");
                  if (!response.ok) {
                    const r = await response.json();
                    Alert.alert("Message",r.detail ||"Error Server, Try later.")
                  } else{
                    const res = await response.json()
                    Alert.alert('Complete', 'Job was deleted successfully')
                    console.log(res)
                    route.push("/dashboart/home")
                  }
                } 
              }]);
        }catch(err){
          console.log(err)
        }finally{
          setLoadingBtn(false);
        }
    }

    // Remove image
    function removeImageList(id){
        Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: async () => {
            const url = `/jobs/${job.job_number}/${id}`;
            const response = await useFetchApi(url , method="DELETE");
            const res = await response.json()
            Alert.alert('Complete', 'Image was deleted successfully')
            setJob(prevJob => ({
                    ...prevJob,
                    ["images"]: prevJob["images"].filter(item => item.id !== id)
                  }));
            }
          }
        ]);
    }

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
            <ScrollView>
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
                <View className="h-px bg-gray-300 my-3" />
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
                    {job?.coastRate?.length > 0 ?
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
                  <View className="h-40">
                    {job?.images.length ?
                      <View className="flex-row flex-wrap justify-around px-2 mt-4">
                        {/* <Text className="text-center text-white">Aqui van las images</Text> */}
                        <FlatList
                          horizontal
                          data={job.images}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                              <Pressable onPress={()=>{handleImagePress(item.path)}}>
                                <Image source={{ uri: item.path }}className="w-32 h-32 mx-2 rounded-xl" resizeMode="cover" />
                                  <TouchableOpacity onPress={()=>removeImageList(item.id)} className="absolute top-0 right-1 p-1">
                                    <Icon name="close-circle-outline" size={28}></Icon>
                                  </TouchableOpacity>
                            </Pressable>
                          )}
                        />
                      </View>
                      :
                      <View className="flex-1 items-center justify-center ">
                        <Text className="text-center text-white">No images saved</Text>
                      </View>
                    }
                  </View>
                </View>
                <View className=" mt-1">
                  <Text className="text-primary-200 text-2xl font-rubik-medium">Comment:</Text>
                  <View className="p-2 mt-2 h-40 bg-darkgray-300 rounded-lg">
                    <ScrollView>
                      <Text className="text-white text-lg mt-2 pl-2 font-rubik-medium">{job?.comment || "No comments"}</Text>
                    </ScrollView>
                  </View>
                </View>
                <TouchableOpacity onPress={deleteJob} disabled={loadingBtn} className={`${loadingBtn ? "bg-gray-500 border-gray-500":"bg-darkgray border-red-500"}   rounded-lg border border-dashed  p-2 mt-1`}>
                  {loadingBtn ? 
                  <ActivityIndicator size="small" color="#020617" /> 
                    : 
                  <Text className="text-red-500 text-center text-lg font-rubik-bold">Delete Job</Text>
                  }
                </TouchableOpacity>
              </View>
              :
              <Text>{loading ? "Loading" : "ready"} -----{">>>>>"} {id}</Text>
              }
            </View>
            </ScrollView>
            <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                <Pressable onPress={handleCloseModal} className="flex-1 justify-center items-center bg-black bg-opacity-80">
                    <Image
                        source={{ uri: uriImagenModal }}
                        className="w-4/5 h-4/5 rounded-lg"
                        resizeMode="contain"
                        />
                </Pressable>
                <TouchableOpacity
                    onPress={()=>onSaveImageAsync(uriImagenModal)}
                    className="absolute bottom-8 mb-6 mr-6 right-3 bg-blue-600 rounded-lg"
                    >
                    <Icon name="download-outline" size={32} />
                </TouchableOpacity>
            </Modal>
        </View>
        </View>
    )
}

export default Job;