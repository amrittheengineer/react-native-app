import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { authPageStyle, PRIMARY_COLOR } from "../styles/Styles";
import { Feather } from "@expo/vector-icons";

const AuthenticationStatus = () => {
  return (
    <View style={authPageStyle.container}>
      <Feather
        name="unlock"
        style={authPageStyle.icon}
        size={56}
        color={PRIMARY_COLOR}
      />
      <Text style={styles.text}>Authenticating...</Text>
    </View>
  );
};
export default AuthenticationStatus;

const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    fontSize: 16,
    marginTop: 8,
  },
});
