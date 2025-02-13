export const fetchLatestReports = async (clientId: number) => {
  try {
    let response = await fetch(
      `https://licensing.hotelplus.ke/hotelplusv9/get_latest_reports.php?client_id=${clientId}`
    );
    let files = await response.json();

    console.log(files); // Array of latest files
    return files;
  } catch (error) {
    console.error("Error fetching reports:", error);
  }
};
