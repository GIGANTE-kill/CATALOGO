import { createFileRoute } from "@tanstack/react-router";
import { FornecedorPage } from "@/components/landing/FornecedorPage";

export const Route = createFileRoute("/$fornecedor")({
  component: FornecedorPage,
});
