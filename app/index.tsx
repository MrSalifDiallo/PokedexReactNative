import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { ThemeText } from "@/components/ThemeText";
import { getPokemonId } from "@/functions/pokemon";
import { UseFetchQuery, UseInfiniteFetchQuery } from "@/Hooks/UseFetchQuery";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import React, { use, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SortButton } from "@/components/SortButton";
import { RootView } from "@/components/RootView";

export default function Index() {
  const colors=UseThemeColor()
  const yScreen=Dimensions.get("window").height;
  const xScreen=Dimensions.get("window").width;

  const heightCard=120
  const widthCard=120
  const numColumn=Math.floor(xScreen/widthCard)
  const [headerHeight, setHeaderHeight] = useState(0); // <-- pour stocker hauteur des 2 rows
  const numLigne=Math.ceil((yScreen-headerHeight)/(heightCard))
  const firstPokemonLoad=numLigne*(numColumn+1)
  const paddingWidth=(xScreen-(numColumn*widthCard))/(numColumn+1)
  //Api pas les id
  //const {data,isFetching}=UseFetchQuery("/pokemon?limit=45")
  //const pokemons=data?.results ?? [];

  //Utilisation de UseInfiniteFetchQuery pour charger les pokémons
  //On utilise une page de 21 pokémons
  //On utilise la fonction getNextPageParam pour charger la page suivante
  const {data,isFetching,fetchNextPage}=UseInfiniteFetchQuery("/pokemon",firstPokemonLoad);
  const pokemons=data?.pages.flatMap(page=>page.results.map(
    r=>({name:r.name,id:getPokemonId(r.url),url:r.url})
  )) ?? [];
  const [search,setSearch]=useState('');
//

const [sortKey,setSortKey]=useState<"id"|"name">("id");
const cleanSearch = search.trim().toLowerCase();

  // Filtrer les pokémons en fonction de la recherche
   const filteredPokemons = [
    ...(cleanSearch ? 
    pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(cleanSearch) 
    || 
    pokemon.id.toString().includes(cleanSearch)
      ): pokemons
   )].sort((a,b)=>(a[sortKey]<b[sortKey] ? -1 :1 ))

   //Si la zone de recherche n'a pas l'id ou le nom du pokemon on recherche directement 

   
  return (
    <RootView style={{backgroundColor:colors.tint}}>
      <View
       onLayout={(e) => {
          setHeaderHeight(e.nativeEvent.layout.height);
        }}
      >
        <Row 
          gap={16}
          style={styles.header}
        >
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}></Image>
        <ThemeText variant="headline" color={"grayLight"} >Pokédex</ThemeText>
      </Row>
      <Row gap={16} style={styles.form}>
        <SearchBar valeur={search} onChange={setSearch}></SearchBar>
        <SortButton value={sortKey} onChange={setSortKey}></SortButton>
      </Row>
      </View>
      
      <Card style={[styles.body,{paddingHorizontal:0}]} >
        <FlatList 
        data={filteredPokemons}
        numColumns={numColumn}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[{padding:paddingWidth},{gap:paddingWidth}]}
        columnWrapperStyle={[{justifyContent: 'space-between'}]}
        //Component en fin liste pour afficher un indicateur de chargement
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="large" color={colors.tint} /> : null
        }
        //Lorsque l'on arrive en bas de la liste, on charge la page suivante
        onEndReached={search ? undefined :() => {fetchNextPage()}}
        renderItem={({item}) => (
          <PokemonCard 
          id={item.id} 
          name={item.name} 
          style={{flex:1/numColumn}}
          >
            {/* Element qui n'attends pas d'enfant */}
            {/* <Image source={{uri: item.image}} style={{width: 50, height: 50}} /> */}
          </PokemonCard>
          )}
        //showsVerticalScrollIndicator={false}
        />  
      </Card>
    </RootView>
  );
}


const styles = {
  //Implementer dans RootView.tsx
  /*container: {
    flex: 1,
    padding:4
    //justifyContent: "center" as const,
    //alignItems: "center" as const,
  },*/
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
    gap: 12,
  },
  form:{
    paddingHorizontal: 12,
  }
}