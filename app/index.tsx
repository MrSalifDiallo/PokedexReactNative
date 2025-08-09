import { Card } from "@/components/Card";
import { ThemeText } from "@/components/ThemeText";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors=UseThemeColor()
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.tint} ]}>
      <Card>
          <ThemeText variant="headline" color={"grayDark"}>Pokédex</ThemeText>
      </Card>
        <ThemeText variant="headline" color={"grayWhite"}>Pokédex</ThemeText>
    </SafeAreaView>
  );
}


const styles = {
  container: {
    flex: 1,
    //justifyContent: "center" as const,
    //alignItems: "center" as const,
  }
}


/*style={{
        backgroundColor: "gray",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}*/
// Uncomment the following line if you want to use StyleSheetList
// import { StyleSheetList } from "react-native";

// Uncomment the following line if you want to use StyleSheetList
// import { StyleSheetList } from "react-native";

// Uncomment the following line if you want to use StyleSheetList
// import { StyleSheetList } from "react-native";

// Uncomment the following line if you want to use StyleSheetList
// import { StyleSheetList } from "react-native";

// Uncomment the following line if you want to use StyleSheetList
// import { StyleSheetList } from "react-native";

// Uncomment the following line if you want to use StyleSheetList
// import { StyleSheetList } from "react-native";

// Uncomment the following line if you want to use StyleSheetList
// import { StyleSheetList } from "react-native";

// Uncomment the following line if you want to use StyleSheetList
// import { StyleSheetList } from "react-native"; 