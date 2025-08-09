import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { ThemeText } from "@/components/ThemeText";
import { getPokemonId } from "@/functions/pokemon";
import { UseFetchQuery, UseInfiniteFetchQuery } from "@/Hooks/UseFetchQuery";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { use, useState } from "react";
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Index() {
  const colors=UseThemeColor()
  //Api pas les id
  //const {data,isFetching}=UseFetchQuery("/pokemon?limit=45")
  //const pokemons=data?.results ?? [];

  //Utilisation de UseInfiniteFetchQuery pour charger les pokémons
  //On utilise une page de 20 pokémons
  //On utilise la fonction getNextPageParam pour charger la page suivante
  const {data,isFetching,fetchNextPage}=UseInfiniteFetchQuery("/pokemon?limit=21");
   const pokemons=data?.pages.flatMap(page=>page.results) ?? [];
  const [search,setSearch]=useState('');

  // Filtrer les pokémons en fonction de la recherche
   const filteredPokemons = search ? pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()
  ) || getPokemonId(pokemon.url).toString().includes(search)): pokemons;
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.tint} ]}>
      <Row 
          gap={16}
          style={styles.header}
        >
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}></Image>
        <ThemeText variant="headline" color={"grayLight"} >Pokédex</ThemeText>
      </Row>
      <Row>
        <SearchBar valeur={search} onChange={setSearch}></SearchBar>
      </Row>
      <Card style={styles.body} >
        <FlatList 
        data={filteredPokemons}
        numColumns={3}
        keyExtractor={(item) => item.url}
        contentContainerStyle={[styles.list,styles.gridGap]}
        columnWrapperStyle={[styles.gridGap]}
        //Component en fin liste pour afficher un indicateur de chargement
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="large" color={colors.tint} /> : null
        }
        //Lorsque l'on arrive en bas de la liste, on charge la page suivante
        onEndReached={() => {fetchNextPage()}}
        renderItem={({item}) => (
          <PokemonCard 
          id={getPokemonId(item.url)} 
          name={item.name} 
          style={{flex:1/3}}
          >
            {/* Element qui n'attends pas d'enfant */}
            {/* <Image source={{uri: item.image}} style={{width: 50, height: 50}} /> */}
          </PokemonCard>
          )}
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
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  body:{
    flex: 1,
    marginTop: 16,
  },
  list:{
    padding:12,
  },
  gridGap:{
    gap: 8,
  },
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