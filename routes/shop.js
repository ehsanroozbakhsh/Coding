const { Route } = require("./router");
const shopController = require("../controllers/shop");

// GET /
Route.get("/", shopController.getIndex).name("shop.index");

Route.get("/products", shopController.getProducts);

Route.get("/cart", shopController.getCart);

Route.get("/orders", shopController.getOrders);

Route.get("/checkout", shopController.getCheckout);
