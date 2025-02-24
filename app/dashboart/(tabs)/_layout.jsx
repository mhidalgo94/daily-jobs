import { Tabs, useRouter} from "expo-router";
import {Pressable} from 'react-native';
import { IconsNavigations } from "../../../components/tabs/tabs-icons";



function TabsLayout(){
    return (
            <Tabs
                screenOptions={{
                    tabBarShowLabel:false,
                    tabBarStyle: {
						position: 'absolute',
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
                        borderTopColor:"#0061FF1A",
                        backgroundColor:"#2C2C2C",
						borderTopWidth: 0,
						paddingTop: 8,
					},
                }}
                >
                    <Tabs.Screen
                        name="home"
                        options={{
                            animation: "fade",
                            
                            title:"Home",
                            headerShown:false,
                            tabBarIcon:({focused})=><IconsNavigations name="home" focused={focused}/>,

                        }}
                    />
                    <Tabs.Screen
                        name="explore"
                        options={{
                            title:"Explore",
                            animation: "fade",

                            headerShown:false,
                            tabBarIcon:({focused})=><IconsNavigations name="search" focused={focused}/>,
                        }}
                    />
                    <Tabs.Screen
                        name="create"
                        options={{
                            title:"Job",
                            headerShown:false,
                            tabBarIcon:({focused})=>{
                                const router = useRouter();
                                return (
                                <Pressable onPress={()=> router.push("/dashboart/job")}><IconsNavigations name="add" size={32} focused={focused}/></Pressable>
                            )},
                        }}
                    />
                    <Tabs.Screen
                        name="analysis"
                        options={{
                            title:"Analysis",
                            animation: "fade",

                            headerShown:false,
                            tabBarIcon:({focused})=><IconsNavigations name="bar-chart" focused={focused}/>
                        }}
                    />
                    <Tabs.Screen
                        name="account"
                        options={{
                            title:"Account",
                    animation: "fade",

                            headerShown:false,
                            tabBarIcon:({focused})=><IconsNavigations name="person-circle" focused={focused}/>
                        }}
                    />
            </Tabs>

    )
}


export default TabsLayout;