import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const SignUp = (props) => {
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        textContentType="username"
        onChangeText={(value) => {
          usernameRef.current = value;
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        textContentType="password"
        onChangeText={(value) => {
          passwordRef.current = value;
        }}
      />
      {/* <TouchableOpacity style={styles.button}>
        <Text style={{ width: "100%", textAlign: "center" }}>Sign Up</Text>
      </TouchableOpacity> */}
      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={{ width: "100%", textAlign: "center" }}>
        Already have an account? Log in.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // elevation: 8,
    backgroundColor: "#c1c1c1",
    borderRadius: 8,
    // margin: "3%",
  },
  input: {
    // padding: "4%",
    margin: "2%",
    borderBottomColor: "#262626",
    // borderWidth: 2,
    borderRadius: 8,
    borderBottomWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 16,
    fontSize: 24,
  },
  button: {
    textAlign: "center",
    width: "100%",
  },
});

export default SignUp;
