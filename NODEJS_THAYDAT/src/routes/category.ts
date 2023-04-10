import express from "express";
import { getOne, Create, getAll, Edit, Delete} from "../controller/category";
import { checkPermission } from "../middlewares/checkPermission";
// import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world");
});
router.get("/categories", getAll);
// Lấy ra 1 danh mục
router.get("/categories/:id", getOne);
// Thêm mới danh mục
router.post("/categories/add", checkPermission, Create);
// cập nhật danh mục
router.put("/categories/:id", checkPermission, Edit);

router.delete("/categories/:id", checkPermission, Delete);
export default router;
