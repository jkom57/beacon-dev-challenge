

import Link from "next/link";
import { createProduct } from "~/actions/products";

export default async function CreateProductPage() {

    const submit = async (data: FormData) => {
        "use server"
        const name = data.get("name") as string;
        const description = data.get("description") as string;
        const price = parseFloat(data.get("price") as string);
        const category = data.get("category") as string;
        const brand = data.get("brand") as string;
        const stock = parseInt(data.get("stock") as string, 10);
        const image = data.get("image") as string;
        const requiresPrescription = data.get("requiresPrescription") === "on";
        const slug = name.toLowerCase().replace(/\s+/g, "-");

        const response = await createProduct({
            name,
            description,
            price,
            category,
            brand,
            stock,
            image,
            requiresPrescription,
            slug
        })

        if (response) {
            console.log("Producto creado exitosamente");
        } else {
            console.log("Error al crear el producto");
        }
    }

    return (
        <div>
            <form action={submit} className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="name">Nombre del Producto</label>
                    <input type="text" id="name" name="name" className="border border-gray-300 rounded-md p-2" placeholder="Ibuprofeno" />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="description">Descripción</label>
                    <textarea id="description" name="description" className="border border-gray-300 rounded-md p-2" placeholder="Analgésico y antiinflamatorio"></textarea>
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="price">Precio</label>
                    <input type="number" id="price" name="price" className="border border-gray-300 rounded-md p-2" placeholder="9.99" step="0.01" />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="category">Categoría</label>
                    <select id="category" name="category" className="border border-gray-300 rounded-md p-2">
                        <option value="">Selecciona una categoría</option>
                        <option value="analgesicos">Analgésicos</option>
                    </select>
                </div>
                    <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="brand">Marca</label>
                    <input type="text" id="brand" name="brand" className="border border-gray-300 rounded-md p-2" placeholder="Bayer" />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" id="stock" name="stock" className="border border-gray-300 rounded-md p-2" placeholder="100" />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="image">URL de la Imagen</label>
                    <input type="text" id="image" name="image" className="border border-gray-300 rounded-md p-2" placeholder="https://example.com/image.jpg" />
                </div>
                <div className="mb-4 flex items-center gap-2">
                    <input type="checkbox" id="requiresPrescription" name="requiresPrescription" />
                    <label htmlFor="requiresPrescription">Requiere receta</label>
                </div>
                <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
                    Crear Producto
                </button>
                <Link href="/products" className="ml-4 inline-flex items-center gap-1 rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-500">
                    Cancelar
                </Link>
            </form>
        </div>
    )
}