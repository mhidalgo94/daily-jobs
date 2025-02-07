import { SafeAreaView } from "react-native-safe-area-context";
import {Text, ScrollView, Image, View, TouchableOpacity, Alert} from 'react-native';
import images from "./contants/images";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import {Link} from 'expo-router';

import { useFetchApi, useFetchLogin } from "../hooks/fetch_api";
import { storeUserSession, retrieveUserSession } from "../hooks/user_sessions";

import { useRouter } from "expo-router";
import { useGlobalContextPrivate } from "../components/global-provider";

export default function SignIn(){
    const router = useRouter();
    const {login} = useGlobalContextPrivate();
    const backendValidation = async (idToken)=> {
        const response = await useFetchLogin('/auth/google',"POST",{token:idToken});

        if (!response.ok){
            Alert.alert("Warning", "Error response server");
        }
        const data = await response.json();

        if(data.access_token && data.token_type){
            storeUserSession({"access_token": data.access_token, token_type: data.token_type});
        }

        if (data.name && data.email){
            // storeData("user",{"email": data.email, "name":data.name})
            login({"email": data.email, "name":data.name})
        }
        console.log("Login success")
        router.push("/dashboart/home")
    }

    const handleLoginGoogle = async ()=>{
        GoogleSignin.configure({
            webClientId: process.env.EXPO_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
            iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
        // 
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (response) {
                const userInfo = response.data;

                const tokenGoogle = userInfo.idToken;
                backendValidation(tokenGoogle);
            } 
          } catch (error) {
            if (error) {
                console.log(error);
              
            }
        }
    }

    const handLoginApple = async ()=>{
        const session = await retrieveUserSession("user_session")
        if(session.access_token == undefined || session.access_token == null){
            Alert.alert("Warning", "Error server");
        }
        const {request, loading, error} = await useFetchApi(session.access_token, session.token_type);
        
        const response = await request("/jobs/", "GET");
        console.log(loading, error);

        console.log(response)
        // try {
        //     const credential = await AppleAuthentication.signInAsync({
        //     requestedScopes: [
        //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
        //     ],
        //     });
        //     console.log(credential);
        //     // signed in
        // } catch (e) {
        //     if (e.code === 'ERR_REQUEST_CANCELED') {
        //     // handle that the user canceled the sign-in flow
        //     } else {
        //     // handle other errors
        //     }
        // }
        // const result = false;
        
        // if (result){
        //     console.log('Login successfully')

        // }else{
        //     Alert.alert("Error", "Failed  to login",[
        //         {text:"Do it again",
        //         onPress:()=> console.log('it did again')
        //         },
        //         {text:"Cancel",
        //         onPress:()=> console.log('Canceled')
        //         },
        //         {text:"Ok",
        //             onPress:()=> console.log('OK')
        //         }
        //     ])
        // }
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassname="h-full mb-4">
                <Image
                    source={images.signinimg}
                    // className="w-full h-80"
                    resizeMode="contain"
                    style={{ width: "auto", height: 360 }}
                    />
                <View className="px-10 mt-10">
                    <Text className="text-base text-center uppercase font-rubik text-black-100 ">Welcome to Daily Jobs</Text>
                    <Text className="text-3xl text-center uppercase font-rubik-bold text-primary ">Record today, remember tomorrow.</Text>
                </View>
                <View className="px-8">
                    
                    <Text className="text-lg font-rubik text-black-200 text-center mt-12">Login to Daily Jobs </Text>
                    
                    
                    <TouchableOpacity onPress={handleLoginGoogle}  className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5" >
                        <View className="flex flex-row item-center justify-center">
                            <Image 
                                source={images.googleimg}
                                className="w-6 h-6"
                                resizeMethod="contain"
                                />
                            <Text className="text-[20px] font-rubik-medium text-black-300 ml-3">Sign in with Google</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handLoginApple}  className="bg-white shadow-md shadow-zinc-300 rounded-full w-full  mt-5" >
                        <View className="flex flex-row item-center justify-center py-0 px-0">
                            <AppleAuthentication.AppleAuthenticationButton
                                className="w-5 h-5"
                                onPress={handLoginApple}
                                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                cornerRadius={25}
                                style={{ width: "100%", height: 58 }} // You must choose default size
                                />
                        </View>
                    </TouchableOpacity>
                    <Text className="text-center mt-2" >By continuing, you agree to our 
                        <Link href="/404"> <Text className="text-info-100 text-lg">Terms and Conditions.</Text></Link>
                    </Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

