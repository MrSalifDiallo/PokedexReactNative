import { Card } from "@/components/Card";
import { ThemeText } from "@/components/ThemeText";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { Link } from "expo-router";
import { StyleSheet, Text, View,Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors=UseThemeColor()
  const pokemon=Array.from({length: 35}, (_, i) => ({
    id: i + 1,
    name: `Pokemon ${i + 1}`,
    //image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
  }));
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.tint} ]}>
      <View style={styles.header}>
        {/* <Image source={require("@/assets/images/pokeball.pn")}></Image> */}
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}></Image>
        <ThemeText variant="headline" color={"grayLight"} >Pokédexe</ThemeText>
      </View>
      <Card style={styles.body} >
        <FlatList data={pokemon}
        numColumns={3}
        renderItem={({item}) => (
          <Card style={{flex:1/3,height:250}}>
            <Link href={`/pokemon/${item.id}`}>
            <ThemeText variant="subtitle1" color="grayDark">{item.name}</ThemeText>
            {/* <Image source={{uri: item.image}} style={{width: 50, height: 50}} /> */}
          </Link>
  
          </Card>
          )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.list,styles.gridGap]}
        columnWrapperStyle={[styles.gridGap]}
        //showsVerticalScrollIndicator={false}
        />  
      </Card>
    </SafeAreaView>
  );
}


const styles = {
  container: {
    flex: 1,
    padding:4
    //justifyContent: "center" as const,
    //alignItems: "center" as const,
  },
  header:{
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap:16,
    padding:12,
  },
  body:{
    flex: 1,
  },
  list:{
    padding:12,
  },
  gridGap:{
    gap: 8,
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