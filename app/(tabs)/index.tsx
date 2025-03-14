import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { baseUrl } from "@/api/api";
import { useReportsData } from "@/hooks/useReportsData";
import { cleanFileName, extractAndFormatDate } from "@/utils/utils";
import FileCard from "@/components/FileCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [clientId, setClientId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if (userInfo) {
          const { token, clientId } = JSON.parse(userInfo);
          setToken(token);
          setClientId(clientId);
        }
      } catch (error) {
        console.error("Failed to load user info:", error);
      }
    };
    loadUserData();
  }, []);

  // Fetch latest reports only when clientId is available
  const {
    data: latestReports,
    loading,
    error,
    loadReports,
  } = useReportsData({});

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReports();
    setRefreshing(false);
  };

  if (clientId === null) {
    return <ActivityIndicator size="large" color="#93c5fd" />;
  }

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
    </View>
  );
};

export default HomeScreen;
