import Link from "next/link";

async function ProductCard({ product }) {
  const discount = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  return (
    <div className="group relative overflow-hidden bg-[#0d0d0d] cursor-pointer">

      {/* Limited badge */}
      {product.isLimited && (
        <div className="absolute top-4 right-4 z-20 border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-1">
          <span className="text-[8px] tracking-[.2em] uppercase text-[#8a7a5a] font-sans">
            Limited · {product.stock}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-[#111]">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-top grayscale-[30%] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.85] group-hover:scale-[1.03] transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1">
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
            </svg>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-[9px] tracking-[.25em] uppercase text-[#666] font-sans mb-1.5">
          {product.category} · SKU {product.sku}
        </p>
        <h2 className="text-base tracking-[.06em] text-[#e8e0d0] font-normal" style={{ fontFamily: "Georgia, serif" }}>
          {product.title}
        </h2>
        {product.material && (
          <p className="text-[11px] text-[#555] font-sans mt-0.5 tracking-[.05em]">
            {product.material}
          </p>
        )}

        <div className="w-10 h-px bg-[#2a2a2a] my-3" />

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-lg text-[#c8b99a] font-sans font-normal">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.mrp > product.price && (
            <span className="text-xs text-[#444] line-through font-sans">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          )}
          {discount && (
            <span className="text-[10px] text-[#8a7a5a] font-sans tracking-[.05em]">
              {discount}% off
            </span>
          )}
        </div>

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="flex gap-1.5 mt-2.5 flex-wrap">
            {product.sizes.map((s) => (
              <span key={s}
                className="text-[9px] border border-[#2a2a2a] text-[#555] px-2 py-0.5 font-sans tracking-[.08em]">
                {s}
              </span>
            ))}
          </div>
        )}

        {product.isLimited && product.stock && (
          <p className="text-[9px] text-[#5a4a3a] font-sans tracking-[.1em] uppercase mt-2">
            Only {product.stock} pieces exist
          </p>
        )}

        {/* CTA */}
        <Link href={`/checkout/${product._id}`}>
          <div className="mt-4 border border-[#2a2a2a] text-[#8a7a5a] text-center py-2.5 text-[10px] tracking-[.2em] uppercase font-sans hover:border-[#8a7a5a] hover:text-[#e8e0d0] transition-all duration-300">
            Acquire
          </div>
        </Link>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const result = await response.json();
  const products = result.data || [];

  return (
    <div className="min-h-screen bg-[#080808]">

      {/* Header */}
      <div className="text-center py-16 px-6">
        <p className="text-[10px] tracking-[.3em] uppercase text-[#555] font-sans mb-3">
          DIMON — 2026
        </p>
        <h1 className="text-3xl text-[#e8e0d0] font-normal tracking-[.05em]"
          style={{ fontFamily: "Georgia, serif" }}>
          The Unnamed Collection
        </h1>
        <div className="w-8 h-px bg-[#2a2a2a] mx-auto mt-6" />
      </div>

      {/* Grid — 1px gap acts as a dark border between cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#1a1a1a]">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {/* "Coming soon" placeholder if only 1 product */}
        {products.length === 1 && (
          <div className="bg-[#0d0d0d] aspect-[3/4] flex items-center justify-center">
            <div className="text-center px-8">
              <p className="text-5xl text-[#1e1e1e] mb-6" style={{ fontFamily: "Georgia, serif" }}>?</p>
              <p className="text-[9px] tracking-[.3em] uppercase text-[#333] font-sans">Prototype 2</p>
              <p className="text-[9px] tracking-[.2em] text-[#2a2a2a] font-sans mt-1.5">Unrevealed</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer line */}
      <div className="text-center py-10">
        <p className="text-[9px] tracking-[.25em] text-[#333] font-sans uppercase">
          Unisex · Above 16 · Black with Red Accents
        </p>
      </div>
    </div>
  );
}