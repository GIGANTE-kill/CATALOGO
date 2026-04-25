import { useState, useEffect } from "react";
import { fornecedores, defaultFornecedor, type FornecedorData } from "@/constants/fornecedores";

export function useFornecedor() {
  const [slug, setSlug] = useState<string>("dsr");

  useEffect(() => {
    // Função que lê a URL e atualiza o estado
    const updateSlug = () => {
      // 1. Tenta pegar o hash da URL (ex: #bombril)
      const hashSlug = window.location.hash.replace("#", "").toLowerCase();

      // 2. Tenta pegar o parâmetro (ex: ?fornecedor=bombril)
      const params = new URLSearchParams(window.location.search);
      const paramSlug = params.get("fornecedor")?.toLowerCase();

      // 3. Tenta pelo subdomínio
      const hostname = window.location.hostname;
      const hostSlug = hostname.split(".")[0].toLowerCase();

      // Prioridade: Hash > Param > Subdomínio
      const currentSlug = hashSlug || paramSlug || hostSlug;

      if (currentSlug && currentSlug !== "localhost" && fornecedores[currentSlug]) {
        setSlug(currentSlug);
      }
    };

    // Roda a verificação assim que a página carrega
    updateSlug();

    // Adiciona um "ouvinte" para atualizar a página instantaneamente se a pessoa digitar uma nova hashtag na URL
    window.addEventListener("hashchange", updateSlug);

    // Remove o ouvinte quando o componente for desmontado para não vazar memória
    return () => {
      window.removeEventListener("hashchange", updateSlug);
    };
  }, []);

  const data = fornecedores[slug] || defaultFornecedor;
  const isDefault = slug === "dsr" || !fornecedores[slug];

  return { data, isDefault };
}

