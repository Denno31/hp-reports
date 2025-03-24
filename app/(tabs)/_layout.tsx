import { Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      const { token } = JSON.parse(userInfo || "{}");
      if (!token) {
        router.replace("/login");
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Logout function
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("userInfo"); // Clear token
          router.replace("/login"); // Redirect to login
        },
      },
    ]);
  };

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
            <Ionicons name="person-circle-outline" size={28} color="black" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Latest",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="update" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports-by-dates"
        options={{
          title: "By Date",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="monthly-reports"
        options={{
          title: "Monthly",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" size={size} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
