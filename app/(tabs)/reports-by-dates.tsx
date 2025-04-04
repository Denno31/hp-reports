import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useReportsData } from "@/hooks/useReportsData";
import { cleanFileName, extractAndFormatDate } from "@/utils/utils";
import FileCard from "@/components/FileCard";
import { baseUrl } from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportsByDates = () => {
  const [clientId, setClientId] = useState<number | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(false);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: latestReports,
    loading,
    error,
    loadReports,
  } = useReportsData({
    reportDate: moment(selectedDate).format("YYYY-MM-DD"),
  });
  const handleOpenDatePicker = () => {
    setDatePickerIsVisible(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReports();
    setRefreshing(false);
  };

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
      <View className="p-4">
        <TouchableOpacity
          className="flex-row items-center gap-2 border border-blue-300 p-3 rounded-md bg-white shadow-sm"
          onPress={handleOpenDatePicker}
        >
          <AntDesign name="calendar" size={20} color="#007AFF" />
          <Text className="text-gray-700 font-medium">
            {moment(selectedDate).format("MMMM Do YYYY")}
          </Text>
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
            const fileUrl = `${baseUrl}uploads/managementreports/${clientId}/${fileName}.pdf`;

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
      {datePickerIsVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setSelectedDate(selectedDate);
              setDatePickerIsVisible(false);
            }
          }}
        />
      )}
    </View>
  );
};

export default ReportsByDates;
