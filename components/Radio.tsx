import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { View,StyleSheet } from "react-native";


type Props = {
    checked:boolean;
}

export function Radio({checked}:Props) {
    const colors=UseThemeColor();
    return( 
        <View style={[styles.radio,{borderColor:colors.tint}]}>
            {checked && <View style={[styles.radioInner,{backgroundColor:colors.tint}]} />}
        </View>
    )
}


const styles = StyleSheet.create({
    radio: {
        width: 16,
        height: 16,
        borderRadius: 14,
        borderStyle: "solid",
        borderWidth: 1,
        alignItems: "center" as const,
        justifyContent: "center" as const,
    },
    radioInner:{
        borderRadius: 10,
        width: 10,
        height: 10,
        
    }
});
