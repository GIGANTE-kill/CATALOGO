import { useLocation } from "@tanstack/react-router";
import { fornecedores, defaultFornecedor, type FornecedorData } from "@/constants/fornecedores";

export function useFornecedor() {
  // Pega a URL de forma reativa e segura para SSR
  const location = useLocation();
  
  // Extrai o parâmetro diretamente da string de busca gerada pelo router
  const urlParams = new URLSearchParams(location.searchStr);
  const paramSlug = urlParams.get("fornecedor")?.toLowerCase();

  // Pega o subdomínio (seguro para SSR)
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const parts = hostname.split(".");
  const hostSlug = parts[0].toLowerCase();

  // Define qual slug usar
  const slug = paramSlug || hostSlug;

  // Valida o slug
  const isValid = slug && slug !== "localhost" && fornecedores[slug];

  // Retorna os dados sincronicamente
  const data = isValid ? fornecedores[slug] : defaultFornecedor;
  const isDefault = !isValid;

  return { data, isDefault };
}

