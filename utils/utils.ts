// Function to extract and format date
export const extractAndFormatDate = (fileName: string) => {
  // Match both `DD-MM-YYYY` and `YYYY-MM-DD`
  const match =
    fileName.match(/(\d{2}-\d{2}-\d{4})/) || // DD-MM-YYYY
    fileName.match(/(\d{4}-\d{2}-\d{2})/); // YYYY-MM-DD

  if (!match) return ""; // Return empty if no date found

  const rawDate = match[1];

  // Convert YYYY-MM-DD → DD-MM-YYYY
  if (rawDate.includes("-") && rawDate.split("-")[0].length === 4) {
    const [year, month, day] = rawDate.split("-");
    return `${day}-${month}-${year}`;
  }

  return rawDate; // Return as is if already in DD-MM-YYYY
};

// Function to clean filename
export const cleanFileName = (fileName: string) => {
  return fileName
    .replace(/^(\d{2}-\d{2}-\d{4}_284_?)/, "") // Remove leading date & "284"
    .replace(/^(\d{4}-\d{2}-\d{2}_284_?)/, "") // Remove YYYY-MM-DD format
    .replace(/_/g, " ") // Replace underscores with spaces
    .trim();
};
