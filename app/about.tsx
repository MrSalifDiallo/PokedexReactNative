import { Link } from "expo-router";
import { View,Text } from "react-native";

export default function About() {
  return (
    <View>
      <Text>About Page</Text>
      <Link href="/">Go to Home</Link>
    </View>
  );
}