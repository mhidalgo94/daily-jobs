import { Tabs } from "expo-router"
import { IconsNavigations } from "../../../components/tabs/tabs-icons";

function TabsLayout(){

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle:{
                    backgroundColor:"white",
                    position:"absolute",
                    borderTopColor:"#0061FF1A",
                    borderTopWidth:1,
                    minHeight:70
                },
            }}
            >
                <Tabs.Screen
                     name="home"
                     options={{
                        title:"Home",
                        headerShown:false,
                        tabBarIcon:({focused})=><IconsNavigations name="home" focused={focused}/>
                     }}
                />
                <Tabs.Screen
                     name="explore"
                     options={{
                        title:"Explore",
                        headerShown:false,
                        tabBarIcon:({focused})=><IconsNavigations name="search" focused={focused}/>
                     }}
                />
                <Tabs.Screen
                     name="analysis"
                     options={{
                        title:"Analysis",
                        headerShown:false,
                        tabBarIcon:({focused})=><IconsNavigations name="bar-chart" focused={focused}/>
                     }}
                />
                <Tabs.Screen
                     name="account"
                     options={{
                        title:"Account",
                        headerShown:false,
                        tabBarIcon:({focused})=><IconsNavigations name="person-circle" focused={focused}/>
                     }}
                />
        </Tabs>
    )
}


export default TabsLayout;