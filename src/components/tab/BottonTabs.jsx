import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Principal from "../principal/Principal.jsx";
import Actualization from "../actualization/Actualization.jsx";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Post from "../posteo/Post.jsx";
import PostPropios from "../postPropios/PostPropios.jsx";

const Tab = createBottomTabNavigator();

export default function BottonTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Principal}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Posteo"
        component={Post}
        options={{
          title: "Posteo",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="post-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PosteoPropios"
        component={PostPropios}
        options={{
          title: "Mirar mis posteos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="post-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
