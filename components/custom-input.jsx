
import {View, Text, TextInput, } from 'react-native';


function CustomInput ({label = "", placeholder,value, onChangeText, ...rest}){

    return (
        <View className="mt-2 gap-2">
          { label && <Text className="text-gray-300 text-lg">{label}</Text> }
            <View className="bg-darkgray-200 p-1 rounded-lg border border-gray-700">
                <TextInput
                    className="text-white text-base p-2 bg-darkgray-200"
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                    value={value}
                    onChangeText={onChangeText}
                    // onBlur={onBlur}
                    {...rest}
                    // keyboardType="default"

                    />
            </View>
        </View>
    )
}

export {
    CustomInput
}