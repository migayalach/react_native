// import { useSignIn } from "@clerk/expo";
// import { Link, useRouter } from "expo-router";
// import { useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";

// export default function SignInScreen() {
//   const { signIn } = useSignIn();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");

//   const onSignInPress = async () => {
//     try {
//       await signIn.create({ identifier: emailAddress });
//       await signIn.password({ password });

//       if (signIn.status === "complete") {
//         await signIn.finalize({ navigate: () => router.replace("/") });
//       } else {
//         console.error(JSON.stringify(signIn, null, 2));
//       }
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
//         Sign in
//       </Text>

//       <TextInput
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         onChangeText={setEmailAddress}
//         style={{
//           borderWidth: 1,
//           borderColor: "#ccc",
//           padding: 12,
//           borderRadius: 8,
//           marginBottom: 12,
//         }}
//       />

//       <TextInput
//         value={password}
//         placeholder="Enter password"
//         secureTextEntry={true}
//         onChangeText={setPassword}
//         style={{
//           borderWidth: 1,
//           borderColor: "#ccc",
//           padding: 12,
//           borderRadius: 8,
//           marginBottom: 16,
//         }}
//       />

//       <TouchableOpacity
//         onPress={onSignInPress}
//         style={{
//           backgroundColor: "#000",
//           padding: 14,
//           borderRadius: 8,
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ color: "#fff", fontWeight: "600" }}>Continue</Text>
//       </TouchableOpacity>

//       <View
//         style={{
//           flexDirection: "row",
//           gap: 4,
//           marginTop: 16,
//           justifyContent: "center",
//         }}
//       >
//         <Text>Don't have an account?</Text>
//         <Link href="/sign-up">
//           <Text style={{ fontWeight: "bold" }}>Sign up</Text>
//         </Link>
//       </View>
//     </View>
//   );
// }

import { useAuth } from "@clerk/expo";
import { AuthView } from "@clerk/expo/native-components";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function SignInScreen() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(home)");
    }
  }, [isSignedIn]);

  return <AuthView mode="signInOrUp" />;
}
