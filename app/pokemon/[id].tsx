import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemeText } from "@/components/ThemeText";
import { UseFetchQuery } from "@/Hooks/UseFetchQuery";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import { View,Text,StyleSheet,Image, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { basePokemonStat, formatSize, formatWeight, getPokemonArtWork } from "@/functions/pokemon";
import { Card } from "@/components/Card";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { useSharedValue} from "react-native-reanimated";
import {Audio} from 'expo-av'
export default function PokemonPage() {
    // This is a placeholder for the Pokemon page
  const colors=UseThemeColor()
  const params=useLocalSearchParams() as {id:string};
  const {data:pokemon}=UseFetchQuery("/pokemon/[id]",{id:params.id})
  const {data:species}=UseFetchQuery("/pokemon-species/[id]",{id:params.id})
  const {data:countPokemon}=UseFetchQuery("/pokemon")

  const mainType=pokemon?.types?.[0].type.name;
  const colorType=mainType ? Colors.type[mainType] : colors.tint;
  const types=pokemon?.types ?? [];
  const numberPokemon=countPokemon?.count;
  const bio=species?.flavor_text_entries
  ?.find(({language})=> language.name==="en")
  ?.flavor_text.replaceAll("\n",",")
  const defaultStat= pokemon?.stats ?? basePokemonStat
  const top=useSharedValue(0)
  const onImagePress=async ()=>{
    const cry=pokemon?.cries.latest
    if (!cry) {
      return;
    }
    const {sound}= await Audio.Sound.createAsync({
      uri:cry
    },{shouldPlay:true })//Precharger le son
    sound.playAsync()
  }


  const onPrevious=(()=>{
      router.replace(
        {pathname:'/pokemon/[id]',params:{ id:Math.max(
          parseInt(params.id)-1,1)}}
      )
  })

  const onNext=(()=>{
    router.replace(
        {pathname:'/pokemon/[id]',params:{ id:Math.min(
          numberPokemon??150,parseInt(params.id)+1)}}
      )
  })
  return (
    <RootView backgroundColor={colorType} >
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
          {/* <Pressable onPress={()=>{top.value=-144}}>
              <ThemeText variant="subtitle2" color="grayWhite" >#{params.id.padStart(3,'0')}</ThemeText >
            </Pressable>      */}
            {/* <Pressable onPress={()=>{top.value=withSpring(-144)}}>
              <ThemeText variant="subtitle2" color="grayWhite" >#{params.id.padStart(3,'0')}</ThemeText >
            </Pressable>   */}
            <ThemeText variant="subtitle2" color="grayWhite" >#{params.id.padStart(3,'0')}</ThemeText >
        </Row>  
      </View>
         {/* <Animated.Image style={{
                ...styles.artwork,
                top:top  }    
              }
              source={{uri:getPokemonArtWork(params.id)}}
              height={200}
              width={200}
          /> */}

          
          <Card style={styles.card}>
            <Row style={[styles.imageRow]}>
            {parseInt(params.id)==1 ?<View></View>:
            < Pressable onPress={onPrevious}>
                <Image
                source={require('@/assets/images/chevron_left_white.png')}
                width={24} height={24}
                />
            </Pressable>}
            <Pressable onPress={onImagePress}>
              <Image style={styles.artwork}
                source={{uri:getPokemonArtWork(params.id)}}
                height={200}
                width={200}
              />
            </Pressable>

             {parseInt(params.id)==numberPokemon ? <View></View>:
             <Pressable onPress={onNext}>
              <Image
                source={require('@/assets/images/chevron_right_white.png')}
                width={24} height={24}
                />
            </Pressable>}

          </Row>
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
                {defaultStat.map(stat=>
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
    imageRow:{
      position:'absolute',
      top:-144,
      zIndex:2,
      justifyContent:"space-between",
      left:0,
      right:0,
      paddingHorizontal:20
    },
    artwork:{
      alignSelf:"center" as const,
    },
    card:{
      paddingHorizontal:20,
      paddingTop:60,
      gap:16,
      alignItems:"center",
      paddingBottom:20,
      marginTop:144
    },
});