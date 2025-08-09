import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { Image, StyleSheet, TextInput } from "react-native";
import { Row } from "./Row";


type Props = {
    valeur: string;
    onChange: (text: string) => void;
};
export function SearchBar({valeur,onChange}:Props) {
    const colors = UseThemeColor();
    // On utilise le hook UseThemeColor pour obtenir les couleurs du thème actuel
    // et on applique la couleur de fond à la barre de recherche.
  return (
    <Row 
    gap={8}
    style={[styles.wrapper,{backgroundColor:colors.grayWhite}]} >
        <Image source={require('@/assets/images/search.png')} width={16} height={16}></Image>
        <TextInput 
            style={[styles.input, {color: colors.grayDark}]} 
            onChangeText={onChange} 
            value={valeur}
            placeholder="Rechercher..."
            placeholderTextColor={colors.grayMedium}
        />
    </Row>
  );
}

const styles=StyleSheet.create({
    wrapper:{
        flex:1,
        borderRadius: 16,
        height: 40,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    input:{
        flex:1,
        height: '100%',
        fontSize: 14,   
        lineHeight: 20,
        paddingVertical: 0,
        color: '#333333', // Couleur de secours pour garantir la visibilité
    }
})
