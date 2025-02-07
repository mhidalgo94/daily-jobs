const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
const WEB_CLIENT_ID = process.env.EXPO_WEB_CLIENT_ID;
const BACKEND_HOST = process.env.EXPO_BACKEND_HOST || "http://localhost"
const BACKEND_PORT = process.env.EXPO_BACKEND_PORT   || 9001

export default{
    GOOGLE_CLIENT_ID,
    WEB_CLIENT_ID,
    BACKEND_HOST,
    BACKEND_PORT
}

