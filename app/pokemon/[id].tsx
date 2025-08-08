import { useLocalSearchParams } from "expo-router";
import { View,Text } from "react-native";

export default function PokemonPage() {
    // This is a placeholder for the Pokemon page

    const params=useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pokemon {params.id}</Text>
    </View>
  );
}   