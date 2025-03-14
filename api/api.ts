import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseUrl = "https://hotelplustech.com/hotelplusv9/";
const reportResource = {
  monthly: "monthly_reports.php",
  latestReports: "get_latest_reports.php",
};

export const fetchLatestReports = async (date?: string, isMonthly = false) => {
  const resource = isMonthly
    ? reportResource.monthly
    : reportResource.latestReports;
  try {
    const userInfo = await AsyncStorage.getItem("userInfo"); // Get token from storage
    const { token, clientId } = JSON.parse(userInfo || "{}");

    if (!token) {
      console.error("No token found");
      return [];
    }

    let url = `${baseUrl}${resource}?client_id=${clientId}`;
    if (date) {
      url += `&selected_date=${date}`;
    }

    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include token in request
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let files = await response.json();
    console.log("Fetched reports:", files);
    return files;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
};
