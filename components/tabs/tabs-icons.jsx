import Icon from 'react-native-vector-icons/Ionicons';

export const IconsNavigations = ({name = 'home', size = 24, color = '#00A5CF', focused = false })=>{

    const focusedColor = focused ? color : "#8b8c89"

    return <Icon name={name}  size={size} color={focusedColor} />
    
}

export const Ionicons = ({ name = 'home', size = 24, color = '#00A5CF' }) => <Icon name={name}  size={size} color={color} />


