import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ICategory } from "../../types/categories";
import { Form, Input, Select, Button, message } from "antd";
interface Iprops {
  onAdd: (category: ICategory) => void;
}
const AddCategory = (props: Iprops) => {
   const navigate = useNavigate();
  const onFinish = (values: any) => {
    
    message.success("Thêm sản phẩm thành công");
    props.onAdd(values);
    navigate("/admin/products/category");
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Trường name là bắt buộc" },
          { whitespace: true, message: "Trường name không được để trống" },
        ]}
      >
        <Input placeholder="Product Name" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategory;
