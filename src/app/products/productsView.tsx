"use server";

import { getProducts } from "~/actions/products";
import Link from "next/link";

export async function ProductsView() {
  const products = await getProducts();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Categoría
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Precio
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((product) => (
            <tr key={product._doc._id}>
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                {product._doc.name}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {product._doc.category}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                ${product._doc.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {product._doc.stock}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                <Link
                  href={`/products/${product._doc.slug}`}
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
