

require('@babel/polyfill');

require('@babel/register')({
  extensions: ['.js'],
  "presets": [
    "@babel/preset-env",
  ],
  "plugins": [
    "transform-es2015-modules-commonjs",
    "@babel/plugin-proposal-class-properties"
  ],
});

const chalk = require("chalk");

const Module = require("../src").default;

 
const instance = new Module();

console.log(chalk.green("instance created"));


const schema = instance.getSchema();

console.log(chalk.green("schema"), schema);


const apiSchema = instance.getSchema();

console.log(chalk.green("apiSchema"), apiSchema);


const resolvers = instance.getResolvers();

console.log(chalk.green("resolvers"), resolvers);


console.log(chalk.green("Tests passed"));

