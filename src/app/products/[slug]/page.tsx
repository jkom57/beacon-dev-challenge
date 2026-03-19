import { getProduct } from "~/actions/products";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: `${product._doc.name} | Catálogo`,
    description:
      product._doc.description || `Detalles del producto ${product._doc.name}`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const { name, category, price, stock, description, image } = product._doc;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Volver al catálogo
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square bg-gray-100">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  Sin imagen
                </div>
              )}
            </div>
            <div className="px-6 py-8">
              <div className="flex items-start justify-between">
                <div>
                  <span className="mb-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">${price}</p>
                  <p
                    className={`mt-1 text-sm ${stock > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {stock > 0 ? `${stock} unidades disponibles` : "Sin stock"}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Descripción del producto
                </h2>
                <p className="leading-relaxed text-gray-600">
                  {description ||
                    "No hay una descripción disponible para este producto."}
                </p>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  disabled={stock === 0}
                  className="flex-1 rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
