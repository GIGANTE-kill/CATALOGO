import { useState, useEffect } from "react";
import { fornecedores, defaultFornecedor, type FornecedorData } from "@/constants/fornecedores";

export function useFornecedor() {
  const [data, setData] = useState<FornecedorData>(defaultFornecedor);
  const [isDefault, setIsDefault] = useState<boolean>(true);

  useEffect(() => {
    // Ex: "baly.saoroque.com" -> slug "baly"
    // "localhost" -> slug "localhost"
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    const slug = parts[0].toLowerCase();

    if (slug && slug !== "localhost" && fornecedores[slug]) {
      setData(fornecedores[slug]);
      setIsDefault(false);
    } else {
      setData(defaultFornecedor);
      setIsDefault(true);
    }
  }, []);

  return { data, isDefault };
}

