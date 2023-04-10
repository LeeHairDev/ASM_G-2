import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Iproduct } from "../../types/products";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICategory } from "../../types/categories";
import { Button, Form, Input, message } from "antd";

interface Iprops {
  dataCate: ICategory[];
  onUpdate: (category: ICategory) => void;
}
const UpdateCategory = (props: Iprops) => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const currentProduct = props.dataCate.find((item) => item._id === id);
    form.setFieldsValue(currentProduct);
  }, [props, id, form]);
 
  const onFinish = async (data: any) => {
    props.onUpdate(data);
    navigate("/admin/products/category");
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="_id">
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: "Trường name là bắt buộc" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCategory;
