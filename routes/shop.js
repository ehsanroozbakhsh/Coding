const { Route } = require("./router");
const shopController = require("../controllers/shop");

// GET /
Route.get("/", shopController.getIndex).name("shop.index");

Route.get("/products", shopController.getProducts);

Route.get("/products/:productId", shopController.getProduct);

Route.get("/cart", shopController.getCart);

Route.post("/cart", shopController.postCart);

Route.get("/orders", shopController.getOrders);

Route.get("/checkout", shopController.getCheckout);
