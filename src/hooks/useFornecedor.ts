import { useParams } from "@tanstack/react-router";
import { getFornecedorData, defaultFornecedor } from "@/constants/fornecedores";

export function useFornecedor() {
  const params = useParams({ strict: false });
  // O parâmetro 'fornecedor' vem da rota dinâmica /$fornecedor
  const slug = (params as any).fornecedor?.toLowerCase() || "dsr";

  const data = getFornecedorData(slug);
  const isDefault = slug === "dsr" || !slug;

  return { data, isDefault };
}


