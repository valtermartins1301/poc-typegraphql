import "reflect-metadata";
import * as path from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./schema/recipe/resolver";

async function bootstrap() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
  });

  // Start the server
  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();