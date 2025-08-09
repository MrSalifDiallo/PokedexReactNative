import { Shadow } from "@/constants/Shadow";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { ViewStyle, type ViewProps,View } from "react-native";

type Props =ViewProps


export function Card({style,...rest}:Props){
    const colors=UseThemeColor()
        return <View style={[style,styles,{backgroundColor:colors.grayWhite}]} {...rest}/>
}

const styles={
    borderRadius:8,
    overflow: "hidden" as const,
    ...Shadow.dp2
} satisfies ViewStyle