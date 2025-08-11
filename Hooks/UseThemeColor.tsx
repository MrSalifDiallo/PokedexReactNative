import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function UseThemeColor(forcedTheme?: "light" | "dark") {
    const theme = forcedTheme ?? useColorScheme() ?? "light";
    return Colors[theme] ?? Colors.light;
}
