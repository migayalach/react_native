import { Show, useClerk, useUser } from "@clerk/expo";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      <Show when="signed-in">
        <Text style={styles.title}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </Show>
      <Show when="signed-out">
        <Link href="/(auth)/sign-in" style={styles.link}>
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up" style={styles.link}>
          <Text style={styles.linkText}>Sign up</Text>
        </Link>
      </Show>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  link: {
    paddingVertical: 8,
  },
  linkText: {
    color: "#0a7ea4",
    fontSize: 16,
    fontWeight: "600",
  },
});
