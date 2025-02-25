import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchLatestReports } from "@/api/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useReportsData } from "@/hooks/useReportsData";
import { cleanFileName, extractAndFormatDate } from "@/utils/utils";
import FileCard from "@/components/FileCard";
const client_id = 284;

const HomeScreen = () => {
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const {
    data: latestReports,
    loading,
    error,
  } = useReportsData({ clientId: client_id });
  const [isGridView, setIsGridView] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between  border-b border-gray-200">
        {/* <View className="flex-row items-center gap-4">
          <Ionicons name="reader" size={28} color="black" />
          <Text className="text-xl font-semibold">
            Latest HotelPlus <Text className="text-red-[#007AFF]">Reports</Text>
          </Text>
        </View> */}
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
      />
      {datePickerIsVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              console.log("Selected date:", selectedDate);
              setDatePickerIsVisible(false);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
