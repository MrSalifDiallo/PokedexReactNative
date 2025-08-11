import { Colors } from "@/constants/Colors"
import { Row } from "../Row";
import { StyleSheet, View, ViewProps } from "react-native";
import { ThemeText } from "../ThemeText";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
type Props=ViewProps &{
    color:string;
    value:number;
    name:string;
};

function statShortName(name:string):string{
    return name
    .replaceAll("special","S")
    .replaceAll("-","")
    .replaceAll("attack","ATK")
    .replaceAll("defense","DEF")
    .replaceAll("speed","SPD")
    .toUpperCase();
}

export function PokemonStat({style,color,value,name,...rest}:Props){
    const colors=UseThemeColor()
        return (
                <Row gap={8} style={[style,styles.root]} {...rest}>
                    <View style={[styles.name,{borderColor:colors.grayLight}]} >
                        <ThemeText variant="subtitle3" style={{color:color}} >
                            {statShortName(name)}
                        </ThemeText>
                    </View>
                    <View style={[styles.number]} >
                        <ThemeText>
                            {value.toString().padStart(3,"0")}
                        </ThemeText>
                    </View>
                    <Row style={[styles.bar]} >
                        <View style={[styles.barInner,{flex:value,backgroundColor:color}]} />   
                        <View style={[styles.barBackground,{flex:255-value,backgroundColor:color}]} />     
                    </Row>
                </Row>
        )
}
//
const styles=StyleSheet.create({
    root:{
    }
    ,
    name:{
        width:40,
        paddingRight:8,
        borderRightWidth:1,
        borderStyle:"solid",
    },
    number:{
        width:23,
    },
    bar:{
        flex:1,
        borderRadius:20,
        height:4,
        overflow:"hidden",
    },
    barInner:{
        height:4
    },
    barBackground:{
        height:4,
        opacity:0.24
    }
})