import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { useEffect } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import Animated, { Easing, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps &{
    backgroundColor?:string
}
export function RootView({style,backgroundColor, ...res}: Props) {
    const colors = UseThemeColor();
    const progress=useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            [colors.tint, backgroundColor ?? colors.tint]
        ),
        };
    },[backgroundColor]);

    useEffect(()=>{
        if (backgroundColor) {
            progress.value=0;
            progress.value=withTiming(1, {
            duration: 700,
            easing: Easing.out(Easing.quad),
            reduceMotion: ReduceMotion.System,
        })   
        }
    },[backgroundColor])

    if (!backgroundColor) {
        return (
            <SafeAreaView style={[rootStyle, {backgroundColor:colors.tint},style]} {...res}/>
        );
    }
    return (
            <Animated.View style={[{flex:1},animatedStyle,style]}>
                <SafeAreaView style={[rootStyle]} {...res}>

                </SafeAreaView>
            </Animated.View>
        );
}

const rootStyle = {
    flex: 1,
    padding: 4,
} satisfies ViewStyle;