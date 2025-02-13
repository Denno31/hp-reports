import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
// import { View, ActivityIndicator, Text } from "react-native";
// import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";

const PDFViewer = () => {
  const { url } = useLocalSearchParams();
  console.log(url);
  // const { fileUrl } = route.params;

  return (
    <SafeAreaView className="flex-1">
      {/* <Pdf
        source={{ uri: fileUrl, cache: true }}
        style={{ flex: 1 }}
        onLoad={() => console.log("PDF Loaded")}
        onError={(error) => console.log("Error loading PDF", error)}
        renderActivityIndicator={() => <ActivityIndicator size="large" />}
      /> */}
      <Text>PDF Viewer</Text>
    </SafeAreaView>
  );
};

export default PDFViewer;
