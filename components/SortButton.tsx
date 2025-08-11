import { View,StyleSheet,Image, Pressable, Modal, Dimensions } from "react-native";
import { useRef } from "react";
import { Row } from "./Row";
import { UseThemeColor } from "@/Hooks/UseThemeColor";
import { useState } from "react";
import { ThemeText } from "./ThemeText";
import { Card } from "./Card";
import { Radio } from "./Radio";
import { Shadow } from "@/constants/Shadow"; // Assurez-vous que le chemin est correct
type Props = {
    value: "id" | "name";
    onChange: (v: "id" | "name") => void;
}

export function SortButton({value,onChange}: Props) {

    // Utilisation de useRef pour garder une référence au bouton, si nécessaire.
  // Ici, on n'utilise pas cette référence, mais elle peut être utile pour des animations ou des interactions futures.
  const buttonRef = useRef<View>(null);
  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);
  const colors = UseThemeColor();
  const onPress=() => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height, // Positionné en dessous du bouton
        right: Dimensions.get("window").width-x-width, // Positionné à droite du bouton
      });
    });
    // Ouvrir le modal pour choisir le critère de tri
    // Ici, on utilise setIsModalVisible pour afficher le modal
    // setPosition est utilisé pour positionner le modal en dessous du bouton
    // setPosition peut être utilisé pour ajuster la position du modal si nécessaire
    setIsModalVisible(true);
  }
  const onClose=() => {
    setIsModalVisible(false);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const options= [
    {label: "ID", value: "id"},
    {label: "Name", value: "name"},
  ] as const;

  return (
  <>
    <Pressable onPress={onPress}>
        <View 
        ref={buttonRef} 
        style={[styles.button,{backgroundColor:colors.grayWhite}]}>
          <Image
              source={
                value === "id"
                  ? require("@/assets/images/tag.png")
                  : require("@/assets/images/sort.png")
              }
              width={16}
              height={16}
          />
        </View>
    </Pressable>
    <Modal 
      animationType="fade"
      transparent 
      visible={isModalVisible} 
      onRequestClose={() => setIsModalVisible(false)}
    >
      <Pressable style={styles.backdrop} onPress={onClose}></Pressable>
      <View style={[styles.popup,{backgroundColor:colors.tint,...position}]}>
        <ThemeText 
        variant="subtitle2" 
        style={[styles.title]} 
        color="grayWhite" >
          Sort by:
        </ThemeText>
        <Card style={[styles.card]}>
              {options.map((o) => (
                <Pressable onPress={()=>onChange(o.value)} key={o.value}>
                    <Row gap={8} key={o.value}>
                    {/* <View>
                      <ThemeText>{o.label}</ThemeText>
                    </View> */}
                    <Radio checked={o.value === value}></Radio>
                    <ThemeText>{o.label}</ThemeText>
                  </Row>
                </Pressable>
              ))}
        </Card>
      </View>
    </Modal>
  </> 
  );
}


const styles = StyleSheet.create({
  button: {
    width: 32,    
    height: 32,
    borderRadius:32,
    flex:0,
    alignItems: "center",
    justifyContent: "center",
    
  },
  backdrop:{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  popup:{
    position: "absolute",
    width: 113,
    padding: 4,
    paddingTop: 16,
    gap: 16,
    borderRadius: 12,
    ...Shadow.dp2
  },
  title:{
    paddingLeft: 20,

  },
  card:{
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap:16,

  }
})