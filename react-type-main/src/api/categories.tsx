import { ICategory } from "../types/categories";
import instance from "./instance";

const getAllCategory = () =>{
    return instance.get("/categories");
}
const createCategory = (category: ICategory) => {
  return instance.post("/categories/add", category);
};
const updateCategory = (category: ICategory) => {
  return instance.put("/categories/" + category._id, category);
};
const deleteCategory = (id: number) => {
  return instance.delete("/categories/" + id);
};
export { getAllCategory, createCategory, updateCategory, deleteCategory};