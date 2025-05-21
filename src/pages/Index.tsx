
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploader from "@/components/FileUploader";
import ProviderSelector from "@/components/ProviderSelector";
import ProcessingIndicator from "@/components/ProcessingIndicator";
import ResultsTable from "@/components/ResultsTable";
import { ExtractedOwner, extractOwnersData, readPdfText } from "@/utils/fileUtils";
import { useToast } from "@/hooks/use-toast";

enum ProcessingStatus {
  IDLE,
  PROCESSING,
  COMPLETED,
  ERROR
}

const Index = () => {
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("guarida");
  const [extractedData, setExtractedData] = useState<ExtractedOwner[]>([]);
  const { toast } = useToast();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setStatus(ProcessingStatus.IDLE);
    setExtractedData([]);
  };

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleProcessFile = async () => {
    if (!selectedFile) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo PDF para processar.",
        variant: "destructive",
      });
      return;
    }

    try {
      setStatus(ProcessingStatus.PROCESSING);
      
      // Read PDF text
      const pdfText = await readPdfText(selectedFile);
      
      // Extract data based on selected provider
      const owners = extractOwnersData(pdfText, selectedProvider);
      
      if (owners.length === 0) {
        toast({
          title: "Nenhum dado encontrado",
          description: "Não foi possível extrair informações de proprietários. Verifique se o arquivo está no formato correto.",
          variant: "destructive",
        });
        setStatus(ProcessingStatus.ERROR);
      } else {
        setExtractedData(owners);
        setStatus(ProcessingStatus.COMPLETED);
        toast({
          title: "Processamento concluído",
          description: `Foram encontrados ${owners.length} proprietários.`,
        });
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao processar o arquivo. Por favor, tente novamente.",
        variant: "destructive",
      });
      setStatus(ProcessingStatus.ERROR);
    }
  };

  const renderContent = () => {
    switch (status) {
      case ProcessingStatus.PROCESSING:
        return <ProcessingIndicator />;
      case ProcessingStatus.COMPLETED:
        return selectedFile ? (
          <ResultsTable 
            data={extractedData} 
            fileName={selectedFile.name} 
          />
        ) : null;
      case ProcessingStatus.ERROR:
        return (
          <div className="w-full py-8 text-center">
            <div className="text-destructive mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3 className="text-lg font-semibold">Erro no processamento</h3>
              <p className="text-muted-foreground">
                Não foi possível processar o arquivo. Verifique se o formato está correto.
              </p>
            </div>
            <button
              className="text-primary font-medium hover:underline"
              onClick={() => setStatus(ProcessingStatus.IDLE)}
            >
              Tentar novamente
            </button>
          </div>
        );
      default:
        return (
          <div className="w-full space-y-6">
            <FileUploader onFileSelected={handleFileSelected} />
            
            <div className="pt-4">
              <ProviderSelector 
                onProviderChange={handleProviderChange}
                disabled={!selectedFile}
              />
            </div>
            
            {selectedFile && (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleProcessFile}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Processar Arquivo
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center text-primary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
              <path d="M12 11h4"></path>
              <path d="M12 16h4"></path>
              <path d="M8 8h.01"></path>
              <path d="M8 13h.01"></path>
            </svg>
            <h1 className="text-xl font-bold">Extrator de Dados Imobiliários</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle>Extrator de Dados de Proprietários</CardTitle>
            <CardDescription>
              Faça upload de um arquivo PDF de listagem imobiliária para extrair informações de proprietários
            </CardDescription>
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>
        
        <div className="max-w-3xl mx-auto mt-8 text-center text-sm text-muted-foreground">
          <h3 className="font-medium mb-2">Como utilizar:</h3>
          <ol className="text-left list-decimal pl-5 space-y-2">
            <li>Faça upload de um arquivo PDF contendo a listagem de imóveis</li>
            <li>Selecione o provedor da listagem (ex: Guarida, Auxiliadora Predial)</li>
            <li>Clique em "Processar Arquivo" para iniciar a extração</li>
            <li>Visualize os dados extraídos e faça o download em formato CSV</li>
          </ol>
          <p className="mt-4">
            Versão 1.0 - Sistema otimizado para listagens da Guarida
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
