import { createContext, useContext, useState } from "react";
import { clearStoreData } from "../hooks/user_session_storage";


const GlobalContext = createContext(undefined);

export const GlobalProvider = ({children}) =>{
    const [user, setUser ] = useState(null)
    const [isLogged,setIsLogged] = useState(false);


    const login = (userData) => {
        setIsLogged(true);
        setUser({...userData});  
    }

    const logout = () => {
        setIsLogged(false);
        clearStoreData();
    }

    return (
        <GlobalContext.Provider
            value={{
            user,
            login,
            logout,
            isLogged,
        }}
        >
            {children}    
        </GlobalContext.Provider>
    )
}

export const useGlobalContextPrivate = ()=>{
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }
    return context
}