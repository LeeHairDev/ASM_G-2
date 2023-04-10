import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  TableOutlined,
  AppstoreAddOutlined,
  ProjectOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";


const { Header, Content, Sider } = Layout;
const Adminlayout = () => {
  const { SubMenu } = Menu;
const {
  token: { colorBgContainer },
} = theme.useToken();
const token = JSON.parse(sessionStorage.getItem("token")!);
  const user = JSON.parse(sessionStorage.getItem("user")!);
  return (
    <Layout>
      <Header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <div className="logo">
          <h1 style={{ color: "#ffffff" }}>ADMIN</h1>
        </div>
        {user ? (
          <div className="logo">
            <h4 style={{ color: "gray" }}>
              Xin Chào <span style={{ color: "red" }}>{user.name}</span>
            </h4>
          </div>
        ) : (
          ""
        )}
      </Header>
      <Layout style={{ marginTop: "65px" }}>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["home"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to={"/admin"} style={{ textDecoration: "none" }}>
                Trang chủ Admin
              </Link>
            </Menu.Item>
            <SubMenu key="products" title="Products" icon={<ProjectOutlined />}>
              <Menu.Item key="Allproducts" icon={<TableOutlined />}>
                <Link to={"/admin/products"} style={{ textDecoration: "none" }}>
                  Tất cả sản phẩm
                </Link>
              </Menu.Item>
              <Menu.Item key="addproducts" icon={<AppstoreAddOutlined />}>
                <Link to={"products/add"} style={{ textDecoration: "none" }}>
                  Thêm sản phẩm
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="categories"
              title="Categories"
              icon={<ProjectOutlined />}
            >
              <Menu.Item key="Allcategory" icon={<TableOutlined />}>
                <Link
                  to={"products/category"}
                  style={{ textDecoration: "none" }}
                >
                  Tất cả danh mục
                </Link>
              </Menu.Item>
              <Menu.Item key="addcategory" icon={<AppstoreAddOutlined />}>
                <Link
                  to={"products/addCate"}
                  style={{ textDecoration: "none" }}
                >
                  Thêm danh mục
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="homepage" icon={<EnterOutlined />}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                Về trang Web
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              overflow: "initial",
            }}
          >
            {token && user.role === "admin" ? <Outlet /> : <Navigate to="/signin" replace />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Adminlayout
