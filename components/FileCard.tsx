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
          <Text className="font-semibold text-sm text-center" numberOfLines={2}>
            {fileName}
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
              {fileName}
            </Text>
            {fileDate ? (
              <Text className="text-xs text-gray-400">{fileDate}</Text>
            ) : null}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FileCard;
