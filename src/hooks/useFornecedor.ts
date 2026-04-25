import { useState, useEffect } from "react";
import { fornecedores, defaultFornecedor, type FornecedorData } from "@/constants/fornecedores";

export function useFornecedor() {
  // Inicializa o estado lendo DIRETAMENTE a URL do navegador, ignorando o sistema de rotas
  const [slug, setSlug] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const paramSlug = urlParams.get("fornecedor")?.toLowerCase();
      
      const hostname = window.location.hostname;
      const parts = hostname.split(".");
      const hostSlug = parts[0].toLowerCase();
      
      return paramSlug || hostSlug || "dsr";
    }
    return "dsr";
  });

  // Garante que se houver navegação no lado do cliente, ele atualiza
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const paramSlug = urlParams.get("fornecedor")?.toLowerCase();
      const hostSlug = window.location.hostname.split(".")[0].toLowerCase();
      
      const currentSlug = paramSlug || hostSlug || "dsr";
      if (currentSlug !== slug) {
        setSlug(currentSlug);
      }
    }
  }, [slug]);

  const isValid = slug && slug !== "localhost" && fornecedores[slug];
  const data = isValid ? fornecedores[slug] : defaultFornecedor;
  const isDefault = !isValid;

  return { data, isDefault };
}

