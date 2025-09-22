import { Card } from "@/components/Card";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemeText } from "@/components/ThemeText";
import { Colors } from "@/constants/Colors";
import { basePokemonStat, formatSize, formatWeight, getPokemonArtWork } from "@/functions/pokemon";
import { UseFetchQuery } from "@/Hooks/UseFetchQuery";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { Audio } from 'expo-av';
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSharedValue } from "react-native-reanimated";

type Props={
  onPrevious:()=>void,
  onNext:()=>void,
}

function PokemonPage({ id, onPrevious, onNext }: { id: number } & Props) {
  const colors=UseThemeColor()
  const {data:pokemon}=UseFetchQuery("/pokemon/[id]",{id:id})
  const {data:species}=UseFetchQuery("/pokemon-species/[id]",{id:id})
  const {data:countPokemon}=UseFetchQuery("/pokemon")
  const numberPokemon=countPokemon?.count;
  const mainType=pokemon?.types?.[0].type.name;
  const colorType=mainType ? Colors.type[mainType] : colors.tint;
  const types=pokemon?.types ?? [];
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
    },{shouldPlay:true })
    sound.playAsync()
  }

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
            <ThemeText variant="subtitle2" color="grayWhite" >#{id.toString().padStart( 3,'0')}</ThemeText >
        </Row>  
      </View>
          <Card style={styles.card}>
            <Row style={[styles.imageRow]}>
            {(id)==1 ?<View></View>:
            < Pressable onPress={onPrevious}>
                <Image
                source={require('@/assets/images/chevron_left_white.png')}
                width={24} height={24}
                />
            </Pressable>}
            <Pressable onPress={onImagePress}>
              <Image style={styles.artwork}
                source={{uri:getPokemonArtWork(id)}}
                height={200}
                width={200}
              />
            </Pressable>

             {(id)==numberPokemon ? <View></View>:
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
              </View>     
          </Card>
    </RootView>
  );
}

export default function Pokemon(){
  const params=useLocalSearchParams() as {id:string};
  const [id,setId]=useState(parseInt(params.id,10))
  const offset=useRef(1);
  const pager=useRef<PagerView>(null)
  
  // Détection plateforme
  const isIOS = Platform.OS === "ios";
  const onPreviousIOS=(()=>{
        router.replace(
          {pathname:'/pokemon/[id]',params:{ id:Math.max(
            (id)-1,1)}}
        )
    }
  )

  const onNextIOS=(()=>{
    router.replace(
        {pathname:'/pokemon/[id]',params:{ id:Math.min(
          1302,(id)+1)}}
      )
  })

  if (isIOS) {
    // Version alternative pour iOS, par exemple désactiver certaines fonctions, ou afficher un fallback
    return (
        <PokemonPage
          key={id}
          id={id}
          onNext={onNextIOS}
          onPrevious={onPreviousIOS}
        />
    );
  }

  const onPageScrollStateChanged=(e: { nativeEvent: { pageScrollState: "idle" | "dragging" | "settling"; }; })=>{
    if (e.nativeEvent.pageScrollState==="idle" && offset.current!==0) {
      setId(id+offset.current);
      offset.current=0;
      pager.current?.setPageWithoutAnimation(1)
    }
  }

  const onPrevious=(()=>{
  if (id <= 1) return; // bloque navigation à gauche si on est à 1
    pager.current?.setPage(0);
  }
  )

    const onNext=(()=>{
    if (id >= 1302) return; // bloque navigation à droite si on est au max
    pager.current?.setPage(2);  

  })

  const onPageSelected=(e: { nativeEvent: { position: number; }; })=>{
      const pos = e.nativeEvent.position;
      if (pos === 0 && id === 1) {
        pager.current?.setPageWithoutAnimation(1);
        offset.current = 0;
        return;
      }

      if (pos === 2  && id === 1302) {
        pager.current?.setPageWithoutAnimation(1);
        offset.current = 0;
        return;
      }

      offset.current = pos - 1;
  }
  
  return (
  <PagerView
    ref={pager}
    initialPage={1}
    style={{ flex: 1 }}
    onPageSelected={onPageSelected}
    onPageScrollStateChanged={onPageScrollStateChanged}
  >
    {id === 1 ? (
      <View key="empty-left" />
    ) : (
      <PokemonPage
        key={id - 1}
        id={id - 1}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    )}

    <PokemonPage
      key={id}
      id={id}
      onNext={onNext}
      onPrevious={onPrevious}
    />

    {id === 1302 ? (
      <View key="empty-right" />
    ) : (
      <PokemonPage
        key={id + 1}
        id={id + 1}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    )}
  </PagerView>
)
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