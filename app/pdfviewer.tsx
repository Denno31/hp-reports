import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import WebView from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const PDFViewer = () => {
  const url =
    "https://licensing.hotelplus.ke/hotelplusv9/uploads/managementreports/284/20-02-2025_284_Daily%20Revenue%20Report.pdf";
  const googleDocsViewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    url
  )}`;

  // 📌 Function to Download PDF
  const downloadPDF = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "report.pdf";
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
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
      <WebView source={{ uri: googleDocsViewer }} style={styles.webview} />

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
