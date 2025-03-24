import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl, fetchLatestReports } from "@/api/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useReportsData } from "@/hooks/useReportsData";
import { cleanFileName, extractAndFormatDate } from "@/utils/utils";
import FileCard from "@/components/FileCard";

import moment from "moment"; // Import Moment.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const MonthlyReports = () => {
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [clientId, setClientId] = useState<number | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);
  const {
    data: latestReports,
    loading,
    error,
    loadReports,
  } = useReportsData({ isMonthly: true });
  const [isGridView, setIsGridView] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReports();
    setRefreshing(false);
  };

  // Function to extract date from filename and format as "Month Year"
  const extractFormattedDate = (fileName: string) => {
    const match = fileName.match(/(\d{2})-(\d{2})-(\d{4})/);
    if (match) {
      const [, day, month, year] = match;
      return moment(`${year}-${month}-${day}`).format("MMM YYYY"); // e.g., "Feb 2025"
    }
    return "Unknown Date";
  };

  // Sort reports by year and month (descending order)
  const sortedReports = [...(latestReports || [])].sort((a, b) => {
    const dateA = extractFormattedDate(a);
    const dateB = extractFormattedDate(b);
    return (
      moment(dateB, "MMM YYYY").valueOf() - moment(dateA, "MMM YYYY").valueOf()
    );
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if (userInfo) {
          const { clientId, clientName } = JSON.parse(userInfo);
          setClientId(clientId);
          setClientName(clientName);
        }
      } catch (error) {
        console.error("Failed to load user info:", error);
      }
    };
    loadUserData();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center p-4 bg-white shadow-md">
        <Text className="text-lg font-bold text-gray-800">
          {" "}
          {clientId}-{clientName}
        </Text>
        <TouchableOpacity
          onPress={() => setIsGridView(!isGridView)}
          className="bg-gray-200 p-2 rounded-full"
        >
          <MaterialIcons
            name={isGridView ? "grid-view" : "list"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#93c5fd" />
      ) : (
        <FlatList
          key={isGridView ? "grid" : "list"}
          data={sortedReports}
          keyExtractor={(item) => item}
          numColumns={isGridView ? 2 : 1}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          columnWrapperStyle={
            isGridView ? { justifyContent: "space-between" } : undefined
          }
          renderItem={({ item }) => {
            const fileName = (item as string).split("/").pop() || "";
            const formattedDate = extractFormattedDate(fileName);
            const fileUrl = `${baseUrl}uploads/managementreports/${clientId}/${fileName}`;

            return (
              <FileCard
                fileDate={formattedDate} // Now shows "Feb 2025"
                fileName={formattedDate} // Displays Month Year instead of full filename
                fileUrl={fileUrl}
                isGridView={isGridView}
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

export default MonthlyReports;
