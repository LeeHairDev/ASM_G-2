import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Breadcrumb, Button, Carousel, Layout, Menu, Popover, theme } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LogoutOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Col } from 'antd';
import { Row } from 'antd';
import { Typography } from 'antd';
const { Header, Content, Footer } = Layout;
const WebsiteLayout = () => {
  const user = JSON.parse(sessionStorage.getItem("user")!);
  const contentStyle: React.CSSProperties = {
    height: "450px",
    color: "#fff",
    textAlign: "center",
    width: "100%",
  };
  const content = (
    <div>
      <Link
        style={{ textDecoration: "none", fontSize: "20px", color: "black" }}
        to={"/admin"}
      >
        Vào trang quản trị
      </Link>
      <br />
      <Link
        style={{ textDecoration: "none", fontSize: "20px", color: "black" }}
        to={"/"}
        onClick={() => {
          sessionStorage.clear();
          window.location.href = "/";
        }}
      >
        Đăng Xuất
      </Link>
    </div>
  );
  const content2 = (
    <div>
      <Link
        style={{ textDecoration: "none", fontSize: "20px", color: "black" }}
        to={"/"}
        onClick={() => {
          sessionStorage.clear();
          window.location.href = "/";
        }}
      >
        Đăng Xuất
      </Link>
    </div>
  );
   const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to={"/"}>
          <div
            style={{
              float: "left",
              width: 120,
              margin: "0px 24px 0px 0",
              // backgroundColor: "gray",
            }}
          >
            <img
              style={{
                width: "100%",
              }}
              src="https://res.cloudinary.com/dlu4tkcct/image/upload/v1680771628/ImageOther/Screenshot_2023-04-06_155654_ndaelx.png"
              alt=""
            />
          </div>
        </Link>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={"/products"} style={{ textDecoration: "none" }}>
              Products
            </Link>
          </Menu.Item>
        </Menu>
        <Menu theme="dark" mode="horizontal">
          {user ? (
            <Menu.Item>
              {user.role === "admin" ? (
                <Popover content={content} title={user.name}>
                  <UserOutlined style={{ fontSize: "24px" }} />
                </Popover>
              ) : (
                <Popover content={content2} title={user.name}>
                  <UserOutlined style={{ fontSize: "24px" }} />
                </Popover>
              )}
            </Menu.Item>
          ) : (
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to={"/signin"} style={{ textDecoration: "none" }}>
                Đăng Nhập
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Carousel autoplay>
        <div>
          <img
            style={contentStyle}
            src="https://znews-photo.zingcdn.me/Uploaded/ygtmvd/2022_10_12/Cover_1920_1080.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://znews-photo.zingcdn.me/Uploaded/ygtmvd/2022_10_12/Cover_1920_1080.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://znews-photo.zingcdn.me/Uploaded/ygtmvd/2022_10_12/Cover_1920_1080.jpg"
            alt=""
          />
        </div>
      </Carousel>
      <Content
        className="site-layout"
        style={{ padding: "0 10px", margin: "20px 0" }}
      >
        <div style={{ padding: 24, minHeight: 380 }}>
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#001529",
          color: "#fff",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <h3>Thông tin liên hệ</h3>
            <p>
              <PhoneOutlined /> 0123 456 789
            </p>
            <p>lehaishop@gmail.com</p>
            <p>
              <EnvironmentOutlined /> Địa chỉ: 35/7 Tu Hoàng, Quận Nam Từ Liêm,
              Hà Nội
            </p>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <h3>Về chúng tôi</h3>
            <p>Giới thiệu</p>
            <p>Chính sách bảo mật</p>
            <p>Điều khoản sử dụng</p>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <h3>Chính sách & hỗ trợ</h3>
            <p>Hướng dẫn mua hàng</p>
            <p>Chính sách đổi trả</p>
            <p>Chính sách bảo hành</p>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <h3>Kết nối với chúng tôi</h3>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </Col>
        </Row>
        <p style={{ marginTop: "24px" }}>
          © 2023 LeeHairShop. All Rights Reserved.
        </p>
      </Footer>
    </Layout>
  );
}

export default WebsiteLayout
