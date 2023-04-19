import express from "express";
import { routes } from "./routes";
import { initializeDbConnection } from "./db";
// import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://1r3yps-5173.csb.app"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// app.use(
//   "/",
//   createProxyMiddleware({
//     target: "https://zer9tf-8080.csb.app/api/",
//     changeOrigin: true,
//   })
// );

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});
// Above is similar as below code just a lot modular
// app.get('/path', (req, response));

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.

// initializeDbConnection().catch(console.error);

initializeDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
