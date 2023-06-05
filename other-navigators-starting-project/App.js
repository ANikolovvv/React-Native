//import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import { Ionicons } from "@expo/vector-icons";

//const Drawer = createDrawerNavigator();
const BottomTap = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTap.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "3c0a6b",
          },
          headerTintColor: "white",
          tabBarActiveTintColor:"3c0a6b",
          //drawerStyle: { backgroundColor: "#ccc" },
        }}
      >
        <BottomTap.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <BottomTap.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </BottomTap.Navigator>
    </NavigationContainer>
  );
}
