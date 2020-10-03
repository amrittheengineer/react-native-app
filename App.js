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
import { PRIMARY_COLOR } from "./styles/Styles";
import AuthenticationStatus from "./components/Authentication";

const Stack = createStackNavigator();

export default function App() {
  const [loggedInState, setLoggedInState] = useState(null);
  useEffect(() => {
    // Check whether the User has already logged in.
    AsyncStorage.getItem("loggedIn").then((value) => {
      // Delay for clear UI transition and API response time.
      setTimeout(() => {
        setLoggedInState(value !== null);
      }, 500);
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={PRIMARY_COLOR} />
      <View style={{ ...styles.container }}>
        {loggedInState === null ? (
          // Page for showing Authntication State
          <AuthenticationStatus />
        ) : (
          <Stack.Navigator
            initialRouteName={loggedInState ? "Dashboard" : "Login"}
            screenOptions={{ headerStyle: { backgroundColor: PRIMARY_COLOR } }}
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
