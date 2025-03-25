
import { Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';

export function PickerDate({date , setDate }){
    const [open, setOpen] = useState(false);

    const openPicker= ()=>{
        setOpen(!open);
    }

    return (
        <Pressable onPress={openPicker}>  
            <Icon name="calendar-number-outline" size={22} color="#4EC8E0"/>
            <DatePicker 
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={()=>{setOpen(false)}}
            />
        </Pressable>
    )
}