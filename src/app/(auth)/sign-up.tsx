import { useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const { signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    try {
      const { error } = await signUp.password({ emailAddress, password });
      if (error) {
        Alert.alert("Error", (error as any).longMessage ?? error.message);
        return;
      }

      await signUp.verifications.sendEmailCode();
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err?.longMessage ?? err?.message ?? "Algo salió mal",
      );
    }
  };

  const onVerifyPress = async () => {
    try {
      await signUp.verifications.verifyEmailCode({ code });

      if (signUp.status === "complete") {
        await signUp.finalize({ navigate: () => router.replace("/") });
      } else {
        console.error(JSON.stringify(signUp, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
          Verify your email
        </Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
        <TouchableOpacity
          onPress={onVerifyPress}
          style={{
            backgroundColor: "#000",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Sign up
      </Text>

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />

      <TouchableOpacity
        onPress={onSignUpPress}
        style={{
          backgroundColor: "#000",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Continue</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          gap: 4,
          marginTop: 16,
          justifyContent: "center",
        }}
      >
        <Text>Already have an account?</Text>
        <Link href="/sign-in">
          <Text style={{ fontWeight: "bold" }}>Sign in</Text>
        </Link>
      </View>
    </View>
  );
}
