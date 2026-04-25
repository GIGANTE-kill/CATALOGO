import { useSearch } from "@tanstack/react-router";
import { fornecedores, defaultFornecedor, type FornecedorData } from "@/constants/fornecedores";

export function useFornecedor() {
  // Pega o parâmetro da URL (ex: ?fornecedor=bombril)
  const search = useSearch({ strict: false }) as { fornecedor?: string };
  const paramSlug = search?.fornecedor?.toLowerCase();

  // Pega o subdomínio (seguro para SSR)
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const parts = hostname.split(".");
  const hostSlug = parts[0].toLowerCase();

  // Define qual slug usar (parâmetro de URL tem prioridade)
  const slug = paramSlug || hostSlug;

  // Verifica se o slug é válido e existe nos fornecedores
  const isValid = slug && slug !== "localhost" && fornecedores[slug];

  // Retorna os dados sincronicamente
  const data = isValid ? fornecedores[slug] : defaultFornecedor;
  const isDefault = !isValid;

  return { data, isDefault };
}

