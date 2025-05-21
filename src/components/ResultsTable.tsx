
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExtractedOwner, downloadCsv, generateCsv } from "@/utils/fileUtils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Dados Extraídos</h3>
        <Button 
          onClick={handleDownload}
          className="shadow-sm hover:shadow-md transition-shadow"
        >
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
      
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold">Nome do Proprietário</TableHead>
              <TableHead className="font-semibold">Celular</TableHead>
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={tableVariants}
            initial="hidden"
            animate="show"
            className="divide-y"
          >
            {data.length > 0 ? (
              data.map((owner, index) => (
                <motion.tr 
                  key={index}
                  variants={rowVariants}
                  className="bg-card hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="py-3">{owner.name}</TableCell>
                  <TableCell className="py-3">{owner.phone}</TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                  Nenhum dado encontrado
                </TableCell>
              </TableRow>
            )}
          </motion.tbody>
        </Table>
      </div>
      
      <div className="mt-4 bg-primary/5 p-3 rounded-md flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Total de proprietários encontrados: <span className="font-semibold text-foreground">{data.length}</span>
        </p>
        {data.length > 0 && (
          <span className="text-sm text-primary font-medium">
            Pronto para download
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ResultsTable;
