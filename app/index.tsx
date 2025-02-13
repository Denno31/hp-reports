import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchLatestReports } from "@/api/api";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Link, router } from "expo-router";

const HomeScreen = () => {
  const [latestReports, setLatestReports] = useState([]);
  const [isGridView, setIsGridView] = useState(false);

  const loadReports = async () => {
    try {
      const results = await fetchLatestReports(240);
      setLatestReports(results);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const formatFileName = (fileName) => {
    return fileName.length > 30 ? fileName.substring(0, 27) + "..." : fileName;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
        <View className="flex-row items-center gap-4">
          <Ionicons name="reader" size={28} color="black" />
          <Text className="text-xl font-semibold">
            Latest HotelPlus <Text className="text-red-500">Reports</Text>
          </Text>
          <Link href="/pdfviewer">dddd</Link>
        </View>
        {/* Toggle Button */}
        <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
          <MaterialIcons
            name={isGridView ? "grid-view" : "list"}
            size={28}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Report List/Grid View */}
      <FlatList
        key={isGridView ? "grid" : "list"}
        data={latestReports}
        keyExtractor={(item) => item}
        numColumns={isGridView ? 2 : 1}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        columnWrapperStyle={
          isGridView ? { justifyContent: "space-between" } : null
        }
        renderItem={({ item }) => {
          const fileName = item.split("/").pop();
          const fileDate = fileName.split("_")[0];
          const fileUrl = `https://licensing.hotelplus.ke/hotelplusv9/uploads/managementreports/284/${fileName}`;
          const shortFileName = formatFileName(fileName);

          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/pdfviewer",
                  params: { fileUrl },
                })
              }
              className={`p-4 border border-gray-200 rounded-lg m-2 ${
                isGridView
                  ? "w-[48%] items-center"
                  : "flex-row items-center justify-between"
              }`}
            >
              {isGridView ? (
                <View className="items-center">
                  <Image
                    className="w-12 h-12 mb-2"
                    source={require("../assets/images/pdf-svgrepo-com.png")}
                  />
                  <Text
                    className="font-semibold text-sm text-center"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {shortFileName}
                  </Text>
                  <Text className="text-xs text-gray-400">{fileDate}</Text>
                </View>
              ) : (
                <View className="flex-row items-center gap-4">
                  <Image
                    className="w-10 h-10"
                    source={require("../assets/images/pdf-svgrepo-com.png")}
                  />
                  <View className="flex-1">
                    <Text
                      className="font-semibold text-sm"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {shortFileName}
                    </Text>
                    <Text className="text-xs text-gray-400">{fileDate}</Text>
                  </View>
                </View>
              )}
              {!isGridView && (
                <Entypo name="dots-three-vertical" size={18} color="gray" />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
