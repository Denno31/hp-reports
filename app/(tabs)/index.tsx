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
import { fetchLatestReports } from "@/api/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useReportsData } from "@/hooks/useReportsData";
import { cleanFileName, extractAndFormatDate } from "@/utils/utils";
import FileCard from "@/components/FileCard";
export const client_id = 284;

const HomeScreen = () => {
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const {
    data: latestReports,
    loading,
    error,
    loadReports,
  } = useReportsData({ clientId: client_id });
  const [isGridView, setIsGridView] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReports();
    setRefreshing(false);
  };

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center p-4 bg-white shadow-md">
        <Text className="text-lg font-bold text-gray-800">Reports</Text>
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
          data={latestReports}
          keyExtractor={(item) => item}
          numColumns={isGridView ? 2 : 1}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          columnWrapperStyle={
            isGridView ? { justifyContent: "space-between" } : undefined
          }
          renderItem={({ item }) => {
            const fileName = (item as string).split("/").pop() || "";
            const fileDate = extractAndFormatDate(fileName);
            const cleanedFileName = cleanFileName(fileName);
            const fileUrl = `https://licensing.hotelplus.ke/hotelplusv9/uploads/managementreports/${client_id}/${fileName}`;

            return (
              <FileCard
                fileDate={fileDate}
                fileName={cleanedFileName}
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

export default HomeScreen;
