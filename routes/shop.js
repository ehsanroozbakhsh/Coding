const { Route } = require("./router");
const productsController = require("../controllers/product");

// GET /
Route.get("/", productsController.getProduct).name("shop.index");

Route.get("/products");
Route.get("/cart");
Route.get("/checkout");
