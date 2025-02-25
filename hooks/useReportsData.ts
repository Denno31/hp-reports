import { fetchLatestReports } from "@/api/api";
import { useEffect, useState } from "react";

export const useReportsData = ({
  clientId,
  reportDate,
}: {
  clientId: number;
  reportDate?: string;
}) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const loadReports = async () => {
    try {
      setLoading(true);
      const results = await fetchLatestReports(clientId, reportDate);
      setReportData(results);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [reportDate]);

  return { data: reportData, loading, error };
};
