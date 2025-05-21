
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { providers } from "@/types/providers";

interface ProviderSelectorProps {
  onProviderChange: (providerId: string) => void;
  disabled?: boolean;
}

const ProviderSelector = ({ onProviderChange, disabled = false }: ProviderSelectorProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string>(providers[0].id);

  const handleChange = (value: string) => {
    setSelectedProvider(value);
    onProviderChange(value);
  };

  return (
    <div className="w-full">
      <label htmlFor="provider-select" className="block text-sm font-medium mb-2">
        Selecione o Provedor da Listagem
      </label>
      <Select
        disabled={disabled}
        value={selectedProvider}
        onValueChange={handleChange}
      >
        <SelectTrigger id="provider-select" className="w-full bg-white shadow-sm">
          <SelectValue placeholder="Selecione um provedor" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-md">
          {providers.map((provider) => (
            <SelectItem 
              key={provider.id} 
              value={provider.id}
              className="cursor-pointer"
            >
              {provider.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedProvider === "guarida" && (
        <p className="mt-2 text-xs text-muted-foreground">
          Otimizado para extrair dados de listagens da Guarida.
        </p>
      )}
    </div>
  );
};

export default ProviderSelector;
