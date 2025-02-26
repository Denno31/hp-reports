import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

interface Props {
  fileUrl: string;
  fileName: string;
  fileDate: string;
  isGridView: boolean;
}

const FileCard = ({ fileUrl, fileName, fileDate, isGridView }: Props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/pdfviewer", params: { fileUrl } })
      }
      className={`bg-white border border-gray-300 rounded-lg p-4 shadow-md m-2 ${
        isGridView ? "w-[48%] items-center" : "flex-row items-center"
      }`}
      style={{ elevation: 3 }} // Shadow for Android
    >
      <Image
        source={require("../assets/images/pdf-svgrepo-com.png")}
        style={{ width: 40, height: 40, marginBottom: isGridView ? 8 : 0 }}
        resizeMode="contain"
      />

      <View
        className={`flex-1 ${isGridView ? "items-center text-center" : "ml-4"}`}
      >
        <Text className="font-semibold text-sm text-gray-800" numberOfLines={2}>
          {fileName}
        </Text>
        {fileDate ? (
          <Text className="text-xs text-gray-500">{fileDate}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default FileCard;
