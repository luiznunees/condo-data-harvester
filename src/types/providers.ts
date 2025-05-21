
export interface Provider {
  id: string;
  name: string;
  patterns: {
    name: RegExp;
    phone: RegExp;
  };
}

export const providers: Provider[] = [
  {
    id: "guarida",
    name: "Guarida",
    patterns: {
      name: /Proprietário:\s*(.*?)(?=\s*CPF|\s*Telefone|\s*E-mail|\s*$)/i,
      phone: /(?:Telefone|Celular):\s*((?:\+\d{2})?\s*\(?\d{2,3}\)?[\s.-]?\d{4,5}[\s.-]?\d{4})/i
    }
  },
  {
    id: "auxiliadora",
    name: "Auxiliadora Predial",
    patterns: {
      name: /Proprietário:\s*(.*?)(?=\s*CPF|\s*Telefone|\s*E-mail|\s*$)/i,
      phone: /(?:Telefone|Celular):\s*((?:\+\d{2})?\s*\(?\d{2,3}\)?[\s.-]?\d{4,5}[\s.-]?\d{4})/i
    }
  },
  {
    id: "cyrela",
    name: "Cyrela",
    patterns: {
      name: /Proprietário:\s*(.*?)(?=\s*CPF|\s*Telefone|\s*E-mail|\s*$)/i,
      phone: /(?:Telefone|Celular):\s*((?:\+\d{2})?\s*\(?\d{2,3}\)?[\s.-]?\d{4,5}[\s.-]?\d{4})/i
    }
  }
];
