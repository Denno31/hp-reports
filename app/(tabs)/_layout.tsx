import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Latest Reports" }} />
      <Tabs.Screen
        name="reports-by-dates"
        options={{ title: "Reports by Dates" }}
      />
    </Tabs>
  );
}
