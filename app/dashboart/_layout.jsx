import { useGlobalContextPrivate } from "../../components/global-provider"
import { useRouter, Stack } from "expo-router";
import { useEffect } from "react";


export default  function PrivateLayout(){
    const {isLogged} = useGlobalContextPrivate();
    const router = useRouter();

    useEffect(()=>{
        if(!isLogged){
            router.replace("/")
        }

    },[isLogged]);
    
    return (
        <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='job' 
                options={{ 
                    headerShown: false,
                    animation: "slide_from_bottom"
                 }}
            />
        </Stack>
    )
}