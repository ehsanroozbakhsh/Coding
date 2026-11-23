const { Route } = require("./router");
const productsController = require("../controllers/product");

// GET /
Route.get("/", productsController.getProduct).name("shop.index");
