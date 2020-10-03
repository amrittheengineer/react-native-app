import React, { useRef } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { authPageStyle, PRIMARY_COLOR } from "../styles/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "./Input";

const SignUp = ({ navigation }) => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const handleSignup = async () => {
    //   Checking the username
    if (!usernameRef.current) {
      ToastAndroid.show("Username is empty", ToastAndroid.SHORT);
      return;
    }
    // Checking the password
    if (!passwordRef.current || passwordRef.current.length < 8) {
      ToastAndroid.show(
        "Password should be atleast 8 characters!",
        ToastAndroid.SHORT
      );
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
          ToastAndroid.show("User created successfully!", ToastAndroid.LONG);
          navigation.replace("Login");
        })
        .catch((err) => {
          console.error(err);
          ToastAndroid.show("Something went wrong.", ToastAndroid.LONG);
        });
    }
  };

  return (
    <View style={authPageStyle.container}>
      <MaterialCommunityIcons
        name="account-plus"
        style={authPageStyle.avatar}
        size={SCREEN_WIDTH * 0.4}
        color={PRIMARY_COLOR}
      />
      <View style={authPageStyle.inputHolder}>
        <Input
          placeholder="Username"
          textContentType="username"
          onChangeText={(value) => {
            usernameRef.current = value;
          }}
          icon="user"
        />
        <Input
          secureTextEntry
          placeholder="Password"
          textContentType="password"
          onChangeText={(value) => {
            passwordRef.current = value;
          }}
          icon="lock"
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
        style={{
          ...authPageStyle.text,
          padding: 24,
          textDecorationLine: "underline",
        }}
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
