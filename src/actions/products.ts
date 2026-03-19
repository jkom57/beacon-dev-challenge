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

export async function createProduct(data: any) {
    await dbConnect();

    const newProduct = new Product({
        ...data,
        createdAt: new Date(),
    });
    await newProduct.save();

    return newProduct;
}