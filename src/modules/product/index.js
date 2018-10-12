
import chalk from "chalk";

import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

import PrismaCmsModule from "@prisma-cms/prisma-module";
import PrismaCmsProcessor from "@prisma-cms/prisma-processor";


export class ProductProcessor extends PrismaCmsProcessor {

  objectType = "Product";



  async mutate(method, args, info) {

    
    let {
      data: {
        name,
        ...data
      },
    } = args;

    if(name !== undefined){

      name = name && name.trim() || "";

      if(!name){
        this.addFieldError("name", "Не указано название");
      }
    }

    Object.assign(data, {
      name,
    });

    Object.assign(args, {
      data,
    });

    return super.mutate(method, args);

  }

}


class ECommerceModule extends PrismaCmsModule {




  product(source, args, ctx, info) {

    return ctx.db.query.product({}, info);
  }


  products(source, args, ctx, info) {

    return ctx.db.query.products({}, info);
  }


  productsConnection(source, args, ctx, info) {

    return ctx.db.query.productsConnection({}, info);
  }


  createProductProcessor(source, args, ctx, info) {

    return new ProductProcessor(ctx).createWithResponse("Product", args, info);
  }

  updateProductProcessor(source, args, ctx, info) {

    return new ProductProcessor(ctx).updateWithResponse("Product", args, info);
  }


  ProductResponse = {

    data: (source, args, ctx, info) => {

      const {
        id,
      } = source.data || {};

      return id ? ctx.db.query.product({
        where: {
          id,
        },
      }, info) : null;
    },
  }


  getResolvers() {

    // console.log("getResolvers");

    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      product: this.product,
      products: this.products,
      productsConnection: this.productsConnection,
    });


    Object.assign(resolvers.Mutation, {
      createProductProcessor: this.createProductProcessor,
      updateProductProcessor: this.updateProductProcessor,
    });


    Object.assign(resolvers, {
      ProductResponse: this.ProductResponse,
    });


    return resolvers;
  }
 

}


export default ECommerceModule;