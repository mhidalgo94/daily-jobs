import {BACKEND_HOST, BACKEND_PORT} from '../app/contants/global';
import { retrieveUserSession } from './user_sessions';
// Default values server for fetch
const URL_BASE = `${BACKEND_HOST || 'http://localhost'}:${BACKEND_PORT || 9001}`

export const useFetchLogin = async ( endpoint, method, body )=>{
    const urlFetch = `${URL_BASE}${endpoint}`;
    const request = await fetch(urlFetch, {
        method,
        headers:{
            'Content-Type': 'application/json',
        },
        body : body ? JSON.stringify(body) : '',
    })
    return  request;
}


export const useFetchApi = async (endpoint, method = "GET", body = null, headers = {}) => {
    const {access_token: token, token_type} = await retrieveUserSession();
    body = body ? JSON.stringify(body) : '';
    const urlFetch = `${URL_BASE}${endpoint}`;
    const tokenType = token_type || "Bearer"
    const response =  await fetch(urlFetch, {
        method,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token ? `${tokenType} ${token}` : '',
            ...headers
        },
        body ,
    }).then(response => response).catch(error=>{
        console.error("Error en la petición:", error.message);
        throw new Error(error.message || "Error request"); 
    });

    return response;


}




// export const useFetchApi = (token, type_token) => {

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     console.log(`este es el token:${token}`);
//     const request = useCallback( async (endpoint, method = "GET", body = null, headers = {}) =>{
//         setLoading(true);
//         setError(null);
//         try{
//             const urlFetch = `${URL_BASE}${endpoint}`;
//             const tokenType = type_token || "Bearer"
//             const response =  await fetch(urlFetch, {
//                 method,
//                 headers:{
//                     'Content-Type': 'application/json',
//                     'Authorization': token ? `${tokenType} ${token}` : '',
//                     ...headers
//                 },
//                 body : body ? JSON.stringify(body) : '',
//             });
            
//             const data = await response.json();
//             if(response.status == 401){
//                 console.log("clear storage")
//                 clearStorage()
//             }
            
//             if (!response.ok){
//                 throw new Error(data.message || "Error request");
//             }
            
//             return data;
//         }catch(err){
//             setError(err.message);

//         } finally{
//             setLoading(false);
//         }
//     }, [token, type_token]);

//     return {request, loading, error}
// }



