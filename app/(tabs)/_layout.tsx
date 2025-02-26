import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
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
      <Tabs.Screen
        name="monthly-reports"
        options={{
          title: "Monthly",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
