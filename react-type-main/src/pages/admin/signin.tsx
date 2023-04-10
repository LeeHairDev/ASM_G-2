import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import instance from "../../api/instance";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const { data } = await instance.post("/signin", values);
      sessionStorage.setItem("token", JSON.stringify(data.accessToken));
      sessionStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "admin") {
        message.success("Chào mừng bạn đến với trang quản trị");
        navigate("/admin/products");
      } else {
        message.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      message.error("Sai Tài Khoản hoặc Mật Khẩu");
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Trường email là bắt buộc",
                    },
                    {
                      whitespace: true,
                      message: "Trường email không được để trống",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Trường password là bắt buộc",
                    },
                    {
                      whitespace: true,
                      message: "Trường password không được để trống",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Sign in
                  </Button>
                  <span className="float-end mt-4">
                    Bạn chưa có tài khoản
                    <Link className="ms-2" to={"/signup"}>
                      đăng ký ngay
                    </Link>
                  </span>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;