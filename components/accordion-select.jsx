import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/Ionicons';


function AccordionSelect({title , value = undefined, setValue ,selectList=[], height=100}){
    const [isOpen, setIsOpen] = useState(false);
    const heightValue = useSharedValue(0);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
        heightValue.value = isOpen ? withTiming(0) : withTiming(height); // Animación de apertura/cierre
    };

    const animatedStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
        overflow: "hidden",
    }));


    const selectItem = (item) => {
        setValue(item); // Update to value selected
        setIsOpen(false);
        heightValue.value = withTiming(0); // Close Accordion animated
    };
    return (
        <View className="bg-darkgray rounded-lg border border-gray-700 mt-2">
            {/* Botón para expandir */}
            <TouchableOpacity onPress={toggleAccordion} className="pl-2 pr-3 py-3 flex flex-row items-center justify-between">
                <Text className="text-gray-300 text-lg font-rubik-medium">{ value || title}</Text>
                <Icon size={20} color="#f8fafc" name={isOpen ? "chevron-up" : "chevron-down"} />
            </TouchableOpacity>

            {/* Contenido animado */}
            <Animated.View style={[animatedStyle, { paddingHorizontal: 10 }]}>
                <ScrollView>
                {selectList.map((item) => (
                    <TouchableOpacity key={item} className="py-2 flex flex-row items-center justify-between" onPress={() => selectItem(item)}>
                        <Text className={`${item === value ? "text-green-500" :"text-white"} text-md`}>{item}</Text>
                        {(item === value) ? <Icon name="checkmark" color="#22c55e" size={20}/> : <></>}
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </Animated.View>
        </View>
    )
}

export default AccordionSelect;