import mongoose from "mongoose";

export interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  image: string;
  requiresPrescription: boolean;
  createdAt: Date;
}

const ProductsSchema = new mongoose.Schema<Product>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  requiresPrescription: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductsSchema);

export default Product;
