import dotenv from "dotenv";
import joi from "joi";
import Category from "../models/category";
dotenv.config();

const categorySchema = joi.object({
  _id: joi.string(),
  name: joi.string().required(),
  products: joi.array(),
});
const getAll = async (req, res) => {
  try {
    // const { data: products } = await axios.get(
    //   `${process.env.API_URL}/products`
    // );
    const categories = await Category.find({});
    if (categories.length === 0) {
      console.log("Không có danh mục để hiển thị!");
    }
    return res.json({
      message: "Lấy danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
const getOne = async (req, res) => {
  try {
    // const { data: product } = await axios.get(
    //   `${process.env.API_URL}/products/${req.params.id}`
    // );
    const category = await Category.findById(req.params.id).populate({
      path: "products",
      select: "name price title",
    });
    
    // console.log(category.products);
    
    if (!category) {
      console.log("Lấy danh mục không thành công");
    }
    return res.json({
      message: "Lấy 1 danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const Create = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    // const { data: product } = await axios.post(
    //   `${process.env.API_URL}/products`,
    //   req.body
    // );
    const product = await Category.create(req.body);
    if (!product) {
      console.log("Thêm danh mục không thành công");
    }
    return res.json({
      message: "Thêm danh mục thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
const Edit = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    // const { data: product } = await axios.put(
    //   `${process.env.API_URL}/products/${req.params.id}`,
    //   req.body
    // );
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!category) {
      console.log("Sửa danh mục không thành công");
    }
    return res.json({
      message: "Sửa danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
const Delete = async (req, res) => {
  try {
    // const { data: product } = await axios.delete(
    //   `${process.env.API_URL}/products/${req.params.id}`,
    //   req.body
    // );
    const product = await Category.findByIdAndDelete(req.params.id);
    if (!product) {
      console.log("Xóa danh mục không thành công");
    }
    return res.json({
      message: "Xóa danh mục thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export { getAll, getOne, Create, Edit, Delete };
