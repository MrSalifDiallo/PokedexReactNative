import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { View, ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps
export function RootView({style, ...res}: Props) {
    const colors = UseThemeColor();
    return (
    <SafeAreaView 
    style={
        [rootStyle, {backgroundColor:colors.tint},style]
    } 
    {...res}/>
    );
}

const rootStyle = {
    flex: 1,
    padding: 4,
} satisfies ViewStyle;