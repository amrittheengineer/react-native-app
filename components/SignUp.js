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

const SignUp = ({ navigation }) => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const handleSignup = async () => {
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
    // Retrieving the existing user's password from AsyncStorage
    const existingPassword = await AsyncStorage.getItem(
      usernameRef.current.trim()
    );

    // If the password exists, then there is a user present.
    if (existingPassword) {
      ToastAndroid.show(
        "User already exists! Please log in.",
        ToastAndroid.LONG
      );
      return;
    } else {
      // Creating a user
      await AsyncStorage.setItem(usernameRef.current, passwordRef.current)
        .then(() => {
          alert("Success");
        })
        .catch((err) => {
          console.error(err);
          ToastAndroid.show("Something went wrong.", ToastAndroid.LONG);
        });
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
        onPress={handleSignup}
      >
        <Text style={authPageStyle.text}>SIGN UP</Text>
      </TouchableOpacity>
      <Text
        style={{ ...authPageStyle.text, padding: 24 }}
        onPress={() => {
          if (navigation) {
            navigation.replace("Login");
          }
        }}
      >
        Already have an account? Log in.
      </Text>
    </View>
  );
};

export default SignUp;
