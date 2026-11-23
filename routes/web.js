// const { Route } = require("./router");
// const auth = require("../middleware/auth");
// const orders = require("../controllers/orderController");

// Route.get("/", home).name("home");

// Route.group({ prefix: "api/v1", as: "api." }, () => {
//   Route.get("/cakes", cakes.index).name("cakes.index");

//   Route.group({ prefix: "orders", as: "orders.", middleware: [auth] }, () => {
//     Route.get("/", orders.index).name("index"); // api.v1/orders → api.orders.index
//     Route.get("/:id", orders.show).name("show");
//     Route.post("/", orders.store).name("store");
//   });
// });
