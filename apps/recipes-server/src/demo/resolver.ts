import { Request, Response } from "express";
import productService from "./demo";
// import { Product as p, Product, ProductInput } from "../../interfaces/products";

export const productResolvers = {
  Query: {
    getAllProducts: async (_: any, { input } ) => {
        const filters = input ? input : {};
      
        const products = await productService.getAllProducts(filters);
        if (!products) {
          throw new Error("Something went wrong!");
        }
        
        return products;
      },

      getProductById: async (_: any, { id } : { id: string }) => {
        const productId = id
      
        const product = await productService.getProductById(Number(productId));
        if (!product) {
          throw new Error("Something went wrong!");
        }

        return product;
      }

    },

    Mutation: {
      updateOrInsert: async (_: any, { input } ) => {
        const body = input ? input : [];

        const product = await productService.updateOrInsert(body);
        if (!product) {
          throw new Error("Something went wrong!");
        }

        return product;
      }
    }
  }

