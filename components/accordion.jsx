import { useState } from "react";
import {TouchableOpacity, View, Text} from 'react-native'
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/Ionicons';

function Accordion({title, height ,children}){
    const [isOpen, setIsOpen] = useState(false);
    const heightValue = useSharedValue(0); // Estado animado para la altura

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
        heightValue.value = isOpen ? withTiming(0) : withTiming(height); // Animación de apertura/cierre
      };

    const animatedStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
        overflow: "hidden",
      }));
    return (
        <View className="bg-darkgray rounded-lg border border-gray-700">
        {/* Botón para expandir */}
            <TouchableOpacity onPress={toggleAccordion} className="pl-2 pr-3 py-3 flex flex-row items-center justify-between" >
                <Text className="text-gray-300 text-lg font-rubik-medium">{title}</Text>
                {isOpen ? (<Icon size={20} color="#f8fafc" name="chevron-up" />): (<Icon size={20} color="#f8fafc" name="chevron-down" />)}
            </TouchableOpacity>
  
        {/* Contenido animado */}
        <Animated.View style={[animatedStyle, { paddingHorizontal: 2 }]}>
         {children}
        </Animated.View>
      </View> 
    )
}   


export default Accordion