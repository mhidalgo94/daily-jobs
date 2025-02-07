import { useGlobalContextPrivate } from "../../components/global-provider"
import { Redirect, Slot } from "expo-router";


export default  function PrivateLayout(){
    const {isLogged} = useGlobalContextPrivate();


    if (!isLogged){
        return <Redirect href="/sign-in" />
    }
    return <Slot />
}