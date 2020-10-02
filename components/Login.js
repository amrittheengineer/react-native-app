import React, { useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { authPageStyle } from "../styles/Styles";

const Login = ({ navigation }) => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    //   Checking the username
    if (!usernameRef.current) {
      ToastAndroid.show("Username is empty", ToastAndroid.SHORT);
      return;
    }
    // Checking the password
    if (!passwordRef.current) {
      ToastAndroid.show("Password is empty", ToastAndroid.SHORT);
      return;
    }
    // Retrieving the stored password from AsyncStorage
    const password = await AsyncStorage.getItem(usernameRef.current.trim());

    // If the password doesn't exists, then there is no user.
    if (!password) {
      ToastAndroid.show(
        "User doesn't exist! Please sign up.",
        ToastAndroid.LONG
      );
      return;
    } else {
      // Checking the stored password with Input
      if (password === passwordRef.current) {
        AsyncStorage.setItem("loggedIn", "true").then(() => {
          navigation.replace("Dashboard");
        });
      } else {
        ToastAndroid.show("Incorrect password!", ToastAndroid.LONG);
      }
    }
  };

  return (
    <View style={authPageStyle.container}>
      <View style={authPageStyle.inputHolder}>
        <TextInput
          style={authPageStyle.input}
          placeholder="Username"
          textContentType="username"
          onChangeText={(value) => {
            usernameRef.current = value;
          }}
        />
        <TextInput
          style={authPageStyle.input}
          secureTextEntry
          placeholder="Password"
          textContentType="password"
          onChangeText={(value) => {
            passwordRef.current = value;
          }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={authPageStyle.button}
        onPress={handleLogin}
      >
        <Text style={authPageStyle.text}>LOG IN</Text>
      </TouchableOpacity>
      <Text
        style={{ ...authPageStyle.text, padding: 24 }}
        onPress={() => {
          if (navigation) {
            navigation.navigate("SignUp");
          }
        }}
      >
        New User? Sign up.
      </Text>
    </View>
  );
};

export default Login;
