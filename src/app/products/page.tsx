import Link from "next/link";
import { ProductsView } from "./productsView";

export default async function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Volver al inicio
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Catálogo de Productos
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona y visualiza el listado completo de productos disponibles.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <ProductsView />
        </div>
      </div>
    </main>
  );
}
