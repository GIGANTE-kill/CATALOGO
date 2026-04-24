import { createFileRoute } from "@tanstack/react-router";
import { FornecedorPage } from "@/components/landing/FornecedorPage";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSR — Catálogo que Move o Mercado" },
      {
        name: "description",
        content:
          "Proposta exclusiva da Distribuidora São Roque: anuncie no catálogo que chega a +9.000 PDVs em 94% da Bahia.",
      },
      { property: "og:title", content: "DSR — Catálogo que Move o Mercado" },
      {
        property: "og:description",
        content:
          "Sua marca no catálogo que vende. +9K PDVs em 94% da Bahia, 48K exemplares por edição.",
      },
    ],
  }),
  component: () => <FornecedorPage />,
});
