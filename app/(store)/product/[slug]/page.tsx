import { Suspense } from "react";
import { products } from "@/lib/data/products";
import ProductClient from "./ProductClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

async function ProductLoader({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductClient slug={slug} />;
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="container-x py-10">Loading formulation…</div>}>
      <ProductLoader params={params} />
    </Suspense>
  );
}
