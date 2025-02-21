import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchLatestReports } from "@/api/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
const client_id = 284;

const HomeScreen = () => {
  const [latestReports, setLatestReports] = useState([]);
  const [isGridView, setIsGridView] = useState(false);

  const loadReports = async () => {
    try {
      const results = await fetchLatestReports(client_id);
      setLatestReports(results);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  // Function to extract and format date
  const extractAndFormatDate = (fileName: string) => {
    // Match both `DD-MM-YYYY` and `YYYY-MM-DD`
    const match =
      fileName.match(/(\d{2}-\d{2}-\d{4})/) || // DD-MM-YYYY
      fileName.match(/(\d{4}-\d{2}-\d{2})/); // YYYY-MM-DD

    if (!match) return ""; // Return empty if no date found

    const rawDate = match[1];

    // Convert YYYY-MM-DD → DD-MM-YYYY
    if (rawDate.includes("-") && rawDate.split("-")[0].length === 4) {
      const [year, month, day] = rawDate.split("-");
      return `${day}-${month}-${year}`;
    }

    return rawDate; // Return as is if already in DD-MM-YYYY
  };

  // Function to clean filename
  const cleanFileName = (fileName: string) => {
    return fileName
      .replace(/^(\d{2}-\d{2}-\d{4}_284_?)/, "") // Remove leading date & "284"
      .replace(/^(\d{4}-\d{2}-\d{2}_284_?)/, "") // Remove YYYY-MM-DD format
      .replace(/_/g, " ") // Replace underscores with spaces
      .trim();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
        <View className="flex-row items-center gap-4">
          <Ionicons name="reader" size={28} color="black" />
          <Text className="text-xl font-semibold">
            Latest HotelPlus <Text className="text-red-[#007AFF]">Reports</Text>
          </Text>
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
          isGridView ? { justifyContent: "space-between" } : undefined
        }
        renderItem={({ item }) => {
          const fileName = item.split("/").pop() || "";
          const fileDate = extractAndFormatDate(fileName);
          const cleanedFileName = cleanFileName(fileName);
          const fileUrl = `https://licensing.hotelplus.ke/hotelplusv9/uploads/managementreports/${client_id}/${fileName}`;

          return (
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "/pdfviewer", params: { fileUrl } })
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
                  >
                    {cleanedFileName}
                  </Text>
                  {fileDate ? (
                    <Text className="text-xs text-gray-400">{fileDate}</Text>
                  ) : null}
                </View>
              ) : (
                <View className="flex-row items-center gap-4 flex-1">
                  <Image
                    className="w-10 h-10"
                    source={require("../assets/images/pdf-svgrepo-com.png")}
                  />
                  <View className="flex-1">
                    <Text className="font-semibold text-sm" numberOfLines={2}>
                      {cleanedFileName}
                    </Text>
                    {fileDate ? (
                      <Text className="text-xs text-gray-400">{fileDate}</Text>
                    ) : null}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
