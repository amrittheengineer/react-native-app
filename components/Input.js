import React from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { authPageStyle, PRIMARY_COLOR } from "../styles/Styles";

const Input = ({ icon, ...props }) => {
  return (
    <View style={authPageStyle.searchSection}>
      <Feather
        name={icon}
        style={authPageStyle.icon}
        size={20}
        color={PRIMARY_COLOR}
      />
      <TextInput style={authPageStyle.input} {...props} />
    </View>
  );
};
export default Input;
