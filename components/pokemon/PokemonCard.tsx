import { ViewProps, ViewStyle, Image,StyleSheet, View } from "react-native"
import { Card } from "../Card"
import { ThemeText } from "../ThemeText"
import { UseThemeColor } from "@/Hooks/UseThemeColor"
import { Link } from "expo-router"


type Props = {
    style?: ViewStyle,
    id: number,
    name: string,
}

export function PokemonCard({style,id,name,...rest}:Props){
    const colors=UseThemeColor()
    return <Card style={[style,styles.card]}>
        <View style={[styles.shadow,{backgroundColor:colors.grayBackground}]} />
        <ThemeText style={styles.id} variant="caption" color="grayMedium">
        #{String(id).padStart(3,'0')}
        </ThemeText>    
        <Image 
            source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}}
            height={120}
            width={120}
        />
        <ThemeText>{name}</ThemeText>   
    </Card>
}

const styles=StyleSheet.create({
    card:{
        position: "relative",
        alignItems: "center" as const,
        padding: 4,
    },
    id:{
        alignSelf:"flex-end"
    },
    shadow:{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        borderRadius: 8,
        zIndex: -1,
    },

})