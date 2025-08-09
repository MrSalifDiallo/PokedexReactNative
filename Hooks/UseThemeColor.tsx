import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function UseThemeColor(){
    const theme = useColorScheme() ?? "light";
    return Colors[theme] ?? Colors.light;
}