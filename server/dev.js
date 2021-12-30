import app from "./api/index.js";

app.listen({ port: 4001 }, () => {
  console.log(`🚀 Server ready at http://localhost:4001/graphql`);
});
