const { Route } = require("./router");
const adminController = require("../controllers/admin");
const { getProducts } = require("../controllers/shop");

Route.group({ prefix: "admin", as: "admin." }, () => {
  // GET /admin/add-product
  Route.get("/add-product", adminController.getAddProduct).name(
    "products.create",
  );

  Route.get("/products", adminController.getProducts);

  // POST /admin/add-product
  Route.post("/add-product", adminController.postAddProduct).name(
    "products.store",
  );
});

// module.exports = Route;
