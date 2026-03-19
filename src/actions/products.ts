"use server"

import dbConnect from "~/lib/db"
import Product from "~/models/product";

export async function getProducts() {
    await dbConnect();

    const products = await Product.find({});

    return products.map(product => ({
        ...product,
        createdAt: product.createdAt.toISOString()
    }));
}

export async function getProduct(slug: string) {
    await dbConnect();

    const product = await Product.findOne({ slug });

    return product;
}