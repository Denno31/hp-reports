import { View, Text, TouchableOpacity, Linking, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchLatestReports } from "@/api/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const [latestReports, setLatestReports] = React.useState([]);

  const loadReports = async () => {
    try {
      const results = await fetchLatestReports(240);
      console.log(results); // Array of latest files
      setLatestReports(results);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);
  return (
    <SafeAreaView>
      <View className="shadow shadow-black p-4">
        <Text className="text-blue-400">Home Screen</Text>
      </View>

      <FlatList
        data={latestReports}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Text>sdfdf</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
