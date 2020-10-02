import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ProgressBarAndroid,
  ToastAndroid,
} from "react-native";
import Dashboard from "./components/Dashboard";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Stack = createStackNavigator();

export default function App() {
  const [loggedInState, setLoggedInState] = useState(null);
  useEffect(() => {
    // Check whether the User has already logged in.
    AsyncStorage.getItem("loggedIn").then((value) => {
      setLoggedInState(value !== null);
    });
  }, []);

  return (
    <NavigationContainer>
      <View style={{ ...styles.container, marginTop: StatusBar.currentHeight }}>
        {loggedInState === null ? (
          <ProgressBarAndroid />
        ) : (
          <Stack.Navigator
            initialRouteName={loggedInState ? "Dashboard" : "Login"}
          >
            {/* If loggedInState changes from null, based on condition initial route is decided */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Text
                    onPress={() => {
                      // Log out operation in Dashboard screen.
                      AsyncStorage.removeItem("loggedIn").then(() => {
                        ToastAndroid.show(
                          "Logged out successfully.",
                          ToastAndroid.LONG
                        );
                        navigation.replace("Login");
                      });
                    }}
                  >
                    Log Out
                  </Text>
                ),
                headerRightContainerStyle: {
                  marginRight: 8,
                },
              })}
            />
          </Stack.Navigator>
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
