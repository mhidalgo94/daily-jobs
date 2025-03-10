import { TouchableOpacity, Text, Image, View, ScrollView, Modal, Pressable, Platform } from "react-native"
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import Animated from "react-native-reanimated";


// Download Image
import * as MediaLibrary from "expo-media-library";
import { captureRef } from 'react-native-view-shot';

function UploadFilesButton({images=[], setImages}){
    const [isModalVisible, setModalVisible] = useState(false);
    const [uriImagenModal, setUriImagenModal] = useState("")

    const handleImagePress = (uri) => {
        setModalVisible(true);
        setUriImagenModal(uri)
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };  


    // Pick images for job
    const pickImageAsync = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsMultipleSelection:true,
          mediaTypes: ['images'],
          allowsEditing: false,
          quality: 1,
        });
    
        if (!result.canceled) {
            const selectedImages = result.assets.slice(0, 5); // Max 5 images
            if (result.assets.length > 5) {
                Alert.alert('Limit exceeded', 'You can only select up to 5 images.');
            }else{
                setImages(selectedImages)
                console.log(images)
            }

        } 
    };
    // Remove images list 
    const removeImageList = (fileName)=>{
        console.log(fileName)
        const newList = images.filter(img => img.fileName !== fileName)
        setImages(newList)
    }

    // Función para descargar la imagen
    const onSaveImageAsync = async (uriImagen) => {
        console.log(uriImagen)
        if (Platform.OS !== 'web') {
          try {
        //     const localUri = await captureRef(uriImagen,{
        //       height: 440,
        //       quality: 1,
        //     });
    
            await MediaLibrary.saveToLibraryAsync(uriImagen);
            if (uriImagen) {
              Alert.alert('Image saved!');
            }
          } catch (e) {
            console.log(e);
          }
        }
    }
    

    
    
    return (
        <>
            <TouchableOpacity onPress={pickImageAsync} className="bg-darkgray rounded-lg border border-dashed border-green-500 p-2 mt-5">
                <Text className="text-green-500 text-center text-lg font-rubik-bold">Upload Images</Text>
            </TouchableOpacity>
            <ScrollView className="">
                <View className="flex-row flex-wrap justify-around px-2 mt-4">
                    {images.length > 0 ?
                            images.map((img, index)=> (
                                <Animated.View
                                    entering={Animated.FadeIn} // Aparece con animación de entrada
                                    exiting={Animated.FadeOut}
                                    key={index}
                                    className="w-[30%] h-32 rounded-t-lg rounded-b-none mb-2"
                                    
                                    >

                                <Pressable onPress={()=>{handleImagePress(img.uri)}}  className="">
                                    <Image
                                        source={{ uri: img.uri }}
                                        className="w-full h-32 rounded-t-lg rounded-b-none"
                                        resizeMode="cover"
                                        />
                                    <TouchableOpacity onPress={()=>removeImageList(img.fileName)} className="absolute top-0 right-1 p-1">
                                        <Icon name="close-circle-outline" size={28} color="#030712"/>
                                    </TouchableOpacity>
                                </Pressable>
                                        </Animated.View>
                            ))
                        : null
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
        </>
    )
}


export default UploadFilesButton