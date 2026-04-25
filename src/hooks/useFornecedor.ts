import { useState, useEffect } from "react";
import { fornecedores, defaultFornecedor, type FornecedorData } from "@/constants/fornecedores";

export function useFornecedor() {
  const [data, setData] = useState<FornecedorData>(defaultFornecedor);
  const [isDefault, setIsDefault] = useState<boolean>(true);

  useEffect(() => {
    // Tenta pegar da URL primeiro (ex: ?fornecedor=bombril)
    const urlParams = new URLSearchParams(window.location.search);
    const paramSlug = urlParams.get("fornecedor")?.toLowerCase();

    // Depois tenta pelo subdomínio (ex: "baly.saoroque.com" -> "baly")
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    const hostSlug = parts[0].toLowerCase();

    // O slug final é o parâmetro da URL ou o subdomínio
    const slug = paramSlug || hostSlug;

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

