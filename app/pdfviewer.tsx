import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import WebView from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useLocalSearchParams } from "expo-router";

const PDFViewer = () => {
  const webViewRef = React.useRef<WebView>(null);
  const generateRandomKey = () =>
    parseInt((Math.random() * 100000).toString(), 10);

  const [key, setKey] = useState(generateRandomKey());
  const { fileUrl } = useLocalSearchParams();
  console.log("pdf url here:", fileUrl);
  // const url =
  //   "https://licensing.hotelplus.ke/hotelplusv9/uploads/managementreports/284/20-02-2025_284_Daily%20Revenue%20Report.pdf";
  const googleDocsViewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    fileUrl as string
  )}`;

  // 📌 Function to Download PDF
  const downloadPDF = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "report.pdf";
      const { uri } = await FileSystem.downloadAsync(
        fileUrl as string,
        fileUri
      );
      console.log("PDF downloaded to:", uri);

      // Open share dialog
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* WebView for PDF */}

      <WebView
        ref={webViewRef}
        source={{ uri: googleDocsViewer }}
        style={styles.webview}
        onError={() => console.log("an error occurred")}
        onLoadEnd={(data) => {
          const { nativeEvent } = data;
          const { title } = nativeEvent;
          if (!title.trim()) {
            webViewRef.current?.stopLoading();
            webViewRef.current?.reload();
            setKey(generateRandomKey());
          }
        }}
      />

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton} onPress={downloadPDF}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  downloadButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PDFViewer;
