
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExtractedOwner, downloadCsv, generateCsv } from "@/utils/fileUtils";
import { useToast } from "@/hooks/use-toast";

interface ResultsTableProps {
  data: ExtractedOwner[];
  fileName: string;
}

const ResultsTable = ({ data, fileName }: ResultsTableProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    try {
      const csvContent = generateCsv(data);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const cleanFileName = fileName.replace(/\.[^/.]+$/, ""); // Remove extension
      const downloadFileName = `${cleanFileName}_extraido_${timestamp}.csv`;
      
      downloadCsv(csvContent, downloadFileName);
      
      toast({
        title: "Download iniciado",
        description: "Seu arquivo CSV foi gerado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar CSV",
        description: "Ocorreu um erro ao gerar o arquivo para download.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Dados Extraídos</h3>
        <Button onClick={handleDownload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Baixar CSV
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Proprietário</TableHead>
              <TableHead>Celular</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((owner, index) => (
                <TableRow key={index}>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.phone}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                  Nenhum dado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <p className="mt-2 text-xs text-muted-foreground">
        Total de proprietários encontrados: {data.length}
      </p>
    </div>
  );
};

export default ResultsTable;
