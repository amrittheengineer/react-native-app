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

const Login = (props) => {
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
        alert("Success");
      } else {
        ToastAndroid.show("Incorrect password!", ToastAndroid.LONG);
      }
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
      <Button title="Log in" onPress={handleLogin} />
      <Text style={{ width: "100%", textAlign: "center" }}>
        New User? Sign up.
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

export default Login;
