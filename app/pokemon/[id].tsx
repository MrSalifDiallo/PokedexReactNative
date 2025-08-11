import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemeText } from "@/components/ThemeText";
import { UseFetchQuery } from "@/Hooks/UseFetchQuery";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import { View,Text,StyleSheet,Image, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { formatSize, formatWeight, getPokemonArtWork } from "@/functions/pokemon";
import { Card } from "@/components/Card";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
export default function PokemonPage() {
    // This is a placeholder for the Pokemon page
  const colors=UseThemeColor()
  const params=useLocalSearchParams() as {id:string};
  const {data:pokemon}=UseFetchQuery("/pokemon/[id]",{id:params.id})
  const {data:species}=UseFetchQuery("/pokemon-species/[id]",{id:params.id})

  const mainType=pokemon?.types?.[0].type.name;
  const colorType=mainType ? Colors.type[mainType] : colors.tint;
  const types=pokemon?.types ?? [];
  const bio=species?.flavor_text_entries
  ?.find(({language})=> language.name==="en")
  ?.flavor_text.replaceAll("\n",",")
  return (
    <RootView style={{backgroundColor:colorType}} >
      <View>
      <Image style={styles.pokeball}
      source={require('@/assets/images/arcpokeball.png')}
      />
      <Row style={styles.header} >
        <Pressable onPress={router.back} >
          <Row>
              <Image
              source={require("@/assets/images/arrow_back_white.png")}
              width={32} height={32}
              />
              <ThemeText style={{textTransform:"capitalize"}} variant="headline" color="grayWhite" >{pokemon?.name}</ThemeText >
          </Row>
        </Pressable>       
        <ThemeText variant="subtitle2" color="grayWhite" >#{params.id.padStart(3,'0')}</ThemeText >
      </Row>  
      </View>
      <View style={styles.body} >
         <Image style={styles.artwork}
              source={{uri:getPokemonArtWork(params.id)}}
              height={200}
              width={200}
          />
          <Card style={styles.card}>
              <Row gap={16}>
                {types.map(
                  (t)=><PokemonType
                  name={t.type.name} key={t.type.name} 
                  />)
                }
              </Row>
              <ThemeText variant="subtitle1" style={{color:colorType}}>
                About
              </ThemeText>
              <Row>
                <PokemonSpec 
                style={{borderStyle:"solid",borderWidth:1,borderColor:colors.grayLight}}
                title={formatWeight(pokemon?.weight)}
                description="Weight"
                img={require("@/assets/images/weight.png")}
                />
                <PokemonSpec 
                style={{borderStyle:"solid",borderWidth:1,borderColor:colors.grayLight}}
                title={formatSize(pokemon?.height)}
                description="Height"
                img={require("@/assets/images/straighten.png")}
                />

                <PokemonSpec
                title={pokemon?.moves.
                  slice(0,2)
                  .map(m=>m.move.name)
                  .join("\n")
                }
                description="Moves"
                />
              </Row>
                <ThemeText>
                {bio}
              </ThemeText>


              {/* Stats */}
               <ThemeText variant="subtitle1" style={{color:colorType}}>
                Base Stats
              </ThemeText>

              <View style={{alignSelf:"stretch"}} >
                {pokemon?.stats.map(stat=>
                   <PokemonStat name={stat.stat.name} key={stat.stat.name} value={stat.base_stat}color={colorType}
                   />
                )}
                  {/* <PokemonStat name={"Lif"} value={90}color={colorType}
                    />
                    <PokemonStat name={"Lif"} value={180}color={colorType}
                    />
                    <PokemonStat name={"Lif"} value={25}color={colorType}
                    />
                    <PokemonStat name={"Lif"} value={75}color={colorType}
                    />
                    <PokemonStat name={"Lif"} value={100}color={colorType}
                    /> */}
              </View>     
          </Card>
      </View>
    </RootView>
  );
}   

const styles=StyleSheet.create({
    header: {
        margin:20,
        justifyContent: "space-between",
    },
    pokeball:{
      position:"absolute",
      right:8,
      top:8,
    },
    artwork:{
      alignSelf:"center" as const,
      top:-144,
      position:'absolute',
      zIndex:2
    },
    card:{
      paddingHorizontal:20,
      paddingTop:60,
      gap:16,
      alignItems:"center",
      paddingBottom:20
    },
    body:{
      marginTop:144,
    }
});