import { Shadow } from "@/constants/Shadow";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { StyleSheet, View, type ViewProps } from "react-native";

type Props = ViewProps

export function Card({style,...rest}:Props){
    const colors=UseThemeColor()
    return <View 
    style={[styles.card, {backgroundColor:colors.grayWhite}, style]} {...rest}/>
}

const styles = StyleSheet.create({
    card: {
        borderRadius:8,
        ...Shadow.dp2
    }
})