
import { providers } from "../types/providers";

export interface ExtractedOwner {
  name: string;
  phone: string;
}

export const readPdfText = async (file: File): Promise<string> => {
  // This is a simulation since we can't actually parse PDFs in the browser without a library
  // In a real implementation, you'd use a PDF parsing library or API
  return new Promise((resolve) => {
    // Simulate PDF text extraction with a delay
    setTimeout(() => {
      // Sample mock data that matches our regex patterns
      const mockText = `
        Listagem de Proprietários
        
        Proprietário: João da Silva
        CPF: 123.456.789-00
        Telefone: (51) 98765-4321
        E-mail: joao@example.com
        
        Proprietário: Maria Oliveira
        CPF: 987.654.321-00
        Celular: (51) 91234-5678
        E-mail: maria@example.com
        
        Proprietário: Carlos Santos
        CPF: 456.789.123-00
        Telefone: (51) 3234-5678
        E-mail: carlos@example.com
      `;
      resolve(mockText);
    }, 1500);
  });
};

export const extractOwnersData = (
  pdfText: string,
  providerId: string
): ExtractedOwner[] => {
  const provider = providers.find((p) => p.id === providerId);
  
  if (!provider) {
    throw new Error(`Provider "${providerId}" not found`);
  }

  // In a real implementation, you would need a more sophisticated approach
  // This is a simplified version for demonstration purposes
  
  // Split the text into blocks, each representing a different owner
  const blocks = pdfText.split(/\n\s*\n/).filter(block => block.trim());
  
  const extractedOwners: ExtractedOwner[] = [];
  
  for (const block of blocks) {
    const nameMatch = block.match(provider.patterns.name);
    const phoneMatch = block.match(provider.patterns.phone);
    
    if (nameMatch && nameMatch[1]) {
      const extractedOwner: ExtractedOwner = {
        name: nameMatch[1].trim(),
        phone: phoneMatch && phoneMatch[1] ? phoneMatch[1].trim() : ""
      };
      
      extractedOwners.push(extractedOwner);
    }
  }
  
  return extractedOwners;
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
