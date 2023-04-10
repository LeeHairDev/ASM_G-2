import dotenv from "dotenv";
import joi from "joi";
import Product from "../models/products";
import category from "../models/category";
dotenv.config();

const productsSchema = joi.object({
  _id: joi.string(),
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  image: joi.string(),
  category: joi.string().required(),
});

const getAll = async (req, res) => {
  const { _limit=10, _sort= "price", _order} = req.query;

  // const options ={
  //   limit: _limit,
  //   [_sort]: 
  // }
  try {
    // const { data: products } = await axios.get(
    //   `${process.env.API_URL}/products`
    // );
    const products = await Product.find();
    if (products.length === 0) {
      console.log("Không có dữ liệu để hiển thị!");
    }
    return res.json({
      message: "Lấy dữ liệu thành công",
      products,
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
     const product = await Product.findById(req.params.id).populate({
        path: "category",
        select: "name",
     });
    if (!product) {
      console.log("Lấy sản phẩm không thành công");
    }
    return res.json({
      message: "Lấy 1 dữ liệu thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const Create = async (req, res) => {
  try {
     const { error } = productsSchema.validate(req.body);
     if (error) {
       return res.status(400).json({
        message: error.details[0].message,
       });
     }
    // const { data: product } = await axios.post(
    //   `${process.env.API_URL}/products`,
    //   req.body
    // );
    const product  = await Product.create(req.body);
    await category.findByIdAndUpdate(product.category,{
      $addToSet: { products: product._id}
    })
    if (!product) {
      console.log("Thêm sản phẩm không thành công");
    }
    return res.json({
      message: "Thêm dữ liệu thành công",
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
      const { error } = productsSchema.validate(req.body);
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
    const product = await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
    
    if (!product) {
      console.log("Sửa sản phẩm không thành công");
    }
    return res.json({
      message: "Sửa dữ liệu thành công",
      product,
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
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      console.log("Xóa sản phẩm không thành công");
    }
    return res.json({
      message: "Xóa dữ liệu thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export { getAll, getOne, Create, Edit, Delete };