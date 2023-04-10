import express from "express";
import { getAll, getOne, Create, Edit, Delete } from "../controller/products";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world");
});

// Lấy ra tất cả các sản phẩm
router.get("/products", getAll);
// Lấy ra 1 sản phẩm
router.get("/products/:id", getOne);
// Thêm mới sản phẩm
router.post("/products/add", checkPermission, Create);
// Sửa sản phẩm
router.put("/product/:id", checkPermission, Edit);
// Xóa sản phẩm
router.delete("/product/:id",checkPermission, Delete);

export default router;