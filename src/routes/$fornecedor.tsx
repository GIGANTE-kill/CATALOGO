import { createFileRoute, notFound } from "@tanstack/react-router";
import { FornecedorPage } from "@/components/landing/FornecedorPage";
import { fornecedores } from "@/data/fornecedores";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$fornecedor")({
  loader: ({ params }) => {
    const data = fornecedores[params.fornecedor.toLowerCase()];
    if (!data) throw notFound();
    return { data };
  },
  head: ({ params }) => {
    const data = fornecedores[params.fornecedor.toLowerCase()];
    const nome = data?.nome ?? "DSR";
    const title = `${nome} no Catálogo DSR — Proposta Exclusiva`;
    const desc = `Proposta exclusiva ${nome}: sua marca no catálogo DSR, com +9.000 PDVs em 94% da Bahia.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-white p-8">
      <p className="mb-4">Erro: {error.message}</p>
      <Link to="/" className="underline">Voltar ao início</Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-white p-8">
      <h1 className="font-display text-4xl mb-4">Fornecedor não encontrado</h1>
      <Link to="/" className="underline">Voltar ao início</Link>
    </div>
  ),
  component: Page,
});

function Page() {
  const { data } = Route.useLoaderData();
  return <FornecedorPage data={data} />;
}
