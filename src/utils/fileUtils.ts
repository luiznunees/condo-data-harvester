
import { providers } from "../types/providers";

export interface ExtractedOwner {
  name: string;
  phone: string;
}

export interface ExtractionResponse {
  extraction_id: string;
  message: string;
  count: number;
}

// API base URL
const API_BASE_URL = "https://api.infra.andersonnunes.net";

export const uploadPdfForProcessing = async (file: File): Promise<ExtractionResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/extract`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error uploading PDF");
  }

  return response.json();
};

export const getExtractionResults = async (extractionId: string): Promise<ExtractedOwner[]> => {
  const response = await fetch(`${API_BASE_URL}/results/${extractionId}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error fetching results");
  }
  
  const results = await response.json();
  
  // Map API response to our ExtractedOwner format
  return results.map((item: any) => ({
    name: item.owner_name || "",
    phone: item.phone || ""
  }));
};

export const readPdfText = async (file: File): Promise<string> => {
  // This function is kept for compatibility but will be deprecated
  console.warn("readPdfText is deprecated - use uploadPdfForProcessing instead");
  
  // Return empty string as we're not actually reading the PDF text client-side anymore
  return "";
};

export const extractOwnersData = (
  pdfText: string,
  providerId: string
): ExtractedOwner[] => {
  // This function is kept for compatibility but will be deprecated
  console.warn("extractOwnersData is deprecated - use API extraction instead");
  return [];
};

export const generateCsv = (data: ExtractedOwner[]): string => {
  // Add CSV headers
  const headers = ["Nome do Proprietário", "Celular"];
  const rows = [headers];
  
  // Add data rows
  data.forEach(owner => {
    rows.push([owner.name, owner.phone]);
  });
  
  // Convert to CSV format
  return rows.map(row => row.map(cell => 
    // Escape quotes and wrap in quotes if needed
    /[",\n\r]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell
  ).join(",")).join("\n");
};

export const downloadCsv = (data: string, filename: string): void => {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.display = "none";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
