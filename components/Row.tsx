import { View, ViewProps, ViewStyle } from "react-native";


type Props = ViewProps & {
    gap?: number,
} 

export function Row({style,gap,...res}:Props){
    return <View style={[rowStyle,style,gap ?{gap : gap} :undefined]} {...res}/>
}

const rowStyle={
    flex: 0,
    flexDirection: "row" as const,
    alignItems: "center" as const,
} satisfies ViewStyle;