
import chalk from "chalk";

import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

import PrismaModule from "@prisma-cms/prisma-module";

import ProductModule from "./product";

class ECommerceModule extends PrismaModule {


  constructor(options = {}) {

    super(options);

    this.mergeModules([
      ProductModule,
    ]);

  }



  getSchema(types = []) {

    let schema = fileLoader(__dirname + '/schema/database/', {
      recursive: true,
    });

    if (schema) {
      types = types.concat(schema);
    }

    let typesArray = super.getSchema(types);

    return typesArray;

  }


  getApiSchema(types = []) {


    let apiSchema = super.getApiSchema(types, []);


    let schema = fileLoader(__dirname + '/schema/api/', {
      recursive: true,
    });

    apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });

    return apiSchema;

  }


  // getExcludableApiTypes(){

  //   return super.getExcludableApiTypes([
  //   ]);

  // }


}


export default ECommerceModule;