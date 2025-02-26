const baseUrl = "https://licensing.hotelplus.ke/hotelplusv9/";
const reportResource = {
  monthly: "monthly_reports.php",
  latestReports: "get_latest_reports.php",
};

export const fetchLatestReports = async (
  clientId: number,
  date?: string,
  isMonthly = false
) => {
  const resource = isMonthly
    ? reportResource.monthly
    : reportResource.latestReports;
  try {
    let url = `https://licensing.hotelplus.ke/hotelplusv9/${resource}?client_id=${clientId}`;
    if (date) {
      url += `&selected_date=${date}`;
    }

    let response = await fetch(url);
    let files = await response.json();

    console.log("Fetched reports:", files);
    return files;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
};
