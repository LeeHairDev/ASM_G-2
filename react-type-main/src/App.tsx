import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Outlet} from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProductPage from './pages/Productpage';
import DetailProduct from './pages/DetailProduct';
import { addProducts, deleteProducts, getAllProducts, updateProducts } from './api/products';
import { Iproduct } from './types/products';
import AdminProducts from './pages/admin/Products';
import UpdateProduct from './pages/admin/updateProduct';
import AddProduct from './pages/admin/addProduct';
import SignUp from './pages/admin/signup';
import { Iauth } from './types/auth';
import { addAccount } from './api/auth';
import WebsiteLayout from './pages/Layout/WebsiteLayout';
import DashboardAdmin from './pages/admin/Dashboard';
import Adminlayout from './pages/Layout/Adminlayout';
import SignIn from "./pages/admin/signin";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from './api/categories';
import { ICategory } from './types/categories';
import AddCategory from './pages/admin/addCategory';
import UpdateCategory from './pages/admin/updateCategory';
import AdminCategory from './pages/admin/Categories';
import { message } from "antd";

function App() {
  const [products, setProducts] = useState<Iproduct[]>([]);
   const [dataAuth, setData] = useState<Iauth[]>([]);
   const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(()=>{
    getAllProducts().then(({ data: { products } }) => setProducts(products));
  },[]);
    useEffect(() => {
      getAllCategory().then(({ data: { categories } }) =>
        setCategories(categories)
      );
    }, []);
    
 const onHandleRemove = (id: number) => {
           deleteProducts(id).then(() =>
             setProducts(products.filter((item) => item._id !== id))
           );
           message.success("Xóa thành công");
         }
const onHandleAdd = (product: Iproduct) => {
  addProducts(product).then(() => {
    getAllProducts().then(({ data: { products } }) =>
      setProducts(products)
    );
  });
};


const onHandleAddCate = (category: ICategory) => {
  createCategory(category).then(() => {
    getAllCategory().then(() =>
      getAllCategory().then(({ data: { categories } }) =>
        setCategories(categories)
      )
    );
  });
};
  const onHandleUpdate = (product: Iproduct)=>{
    updateProducts(product).then(() =>setProducts(products.map((item) => item._id == product._id ? product : item)))
  }
  const onHandleUpdateCate = (category: ICategory) => {
    updateCategory(category).then(() =>
      setCategories(
        categories.map((item) => (item._id == category._id ? category : item))
      )
    );
  };
  const onHandleAddAccount = (data: Iauth) => {
    addAccount(data).then(() => setData([...dataAuth, data]));
  };
   const onHandleRemoveCate = (id: number) => {
             deleteCategory(id).then(() =>
               setCategories(categories.filter((item) => item._id !== id))
             );
             message.success("Xóa thành công");
           }

 return (
   <div className="App">
     <>
       <Routes>
         <Route path="/" element={<WebsiteLayout />}>
           <Route index element={<HomePage products={products} />} />
           <Route path="products">
             <Route index element={<ProductPage products={products} />} />
             <Route path=":id" element={<DetailProduct />} />
           </Route>
         </Route>
         <Route path="admin" element={<Adminlayout />}>
           <Route
             index
             element={
               <DashboardAdmin dataAd={products} cateData={categories} />
             }
           />
           <Route path="products">
             <Route
               index
               element={
                 <AdminProducts
                   dataAd={products}
                   onRemove={onHandleRemove}
                   cateData={categories}
                 />
               }
             />
             <Route
               path="category"
               element={
                 <AdminCategory
                   dataAd={categories}
                   onRemove={onHandleRemoveCate}
                 />
               }
             />
             <Route
               path="add"
               element={
                 <AddProduct onAdd={onHandleAdd} dataCate={categories} />
               }
             />
             <Route
               path="addCate"
               element={<AddCategory onAdd={onHandleAddCate} />}
             />
             <Route
               path=":id"
               element={
                 <UpdateProduct
                   product={products}
                   onUpdate={onHandleUpdate}
                   dataCate={categories}
                 />
               }
             />
             <Route
               path="cate/:id"
               element={
                 <UpdateCategory
                   dataCate={categories}
                   onUpdate={onHandleUpdateCate}
                 />
               }
             />
           </Route>
         </Route>
         <Route path="/signin" element={<SignIn />} />
         <Route path="signup" element={<SignUp onAdd={onHandleAddAccount} />} />
       </Routes>

       <ToastContainer
         position="top-right"
         autoClose={1000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
       />
     </>
   </div>
 );
}

export default App
