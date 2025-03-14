export const fetchLatestReports = async (clientId: number, date?: string) => {
  try {
    let url = `hotelplustech.com/hotelplusv9/get_latest_reports.php?client_id=${clientId}`;
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
