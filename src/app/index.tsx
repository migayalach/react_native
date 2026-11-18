import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Siuuuuuuuuuuuuu!</Text>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dqgcyonb9/image/upload/v1734030807/Ballet/teeocp9ebhaioce3cgre.jpg",
        }}
        style={{ width: 200, height: 200, borderRadius: 20 }}
      />
      <Link href={"/about"}>About</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
