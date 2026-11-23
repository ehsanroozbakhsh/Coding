const { Route } = require("./router");
const productsController = require("../controllers/product");

Route.group({ prefix: "admin", as: "admin." }, () => {
  // GET /admin/add-product
  Route.get("/add-product", productsController.getAddProduct).name(
    "products.create",
  );

  // POST /admin/add-product
  Route.post("/add-product", productsController.postAddProduct).name(
    "products.store",
  );
});

// module.exports = Route;
