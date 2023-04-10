import { useState } from "react";
import { Iauth } from "./../../types/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

interface Iprops {
  onAdd: (data: Iauth) => void;
}

const SignUp = (props: Iprops) => {
  const [inputValue, setInputValue] = useState<Iauth>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    props.onAdd(values);
    toast.success("Bạn vừa đăng ký thành công");
    navigate("/admin/");
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
              <Form onFinish={onFinish}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Trường name là bắt buộc",
                    },
                    {
                      whitespace: true,
                      message: "Trường name không được để trống",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Name User" />
                </Form.Item>
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
                  <Input
                    prefix={<MailOutlined />}
                    type="email"
                    placeholder="Email address"
                  />
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
                    {
                      min: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Trường confirm là bắt buộc",
                    },
                    {
                      whitespace: true,
                      message: "Trường confirm không được để trống",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu không trùng")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Confirm password"
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="btn-block">
                  Sign up
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
