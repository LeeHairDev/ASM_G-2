import instance from "./instance";
import { Iproduct } from "../types/products";
const getAllProducts = () => {
  return instance.get("/products");
};
const getOneProducts = (id: number | string) => {
  return instance.get("/products/" + id);
};
const addProducts = (product: Iproduct) => {
  return instance.post("/products/add", product);
};
const updateProducts = (product: Iproduct) => {
  return instance.put("/product/" + product._id, product);
};
const deleteProducts = (id: number) => {
  return instance.delete("/product/" + id);
};

export {
  getAllProducts,
  getOneProducts,
  addProducts,
  updateProducts,
  deleteProducts,
};
