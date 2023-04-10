import { useNavigate } from "react-router-dom";
import { Iproduct } from "../../types/products";
import { UploadOutlined } from "@ant-design/icons";
import { ICategory } from "../../types/categories";
import { Form, Input, Select, Button, message, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { nanoid } from "nanoid";

interface Iprops {
  onAdd: (product: Iproduct) => void;
  dataCate: ICategory[];
}

const AddProduct = (props: Iprops) => {
  const navigate = useNavigate();
  const { Option } = Select;

  const uploadFile = async (files: any) => {
    if (files) {
      const CLOUD_NAME = "dlu4tkcct";
      const PRESET_NAME = "upload-image";
      const FOLDER_NAME = "REACTTYPE";
      const urls = [];
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);

      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i].originFileObj);
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        urls.push(response.data.secure_url);
      }

      return urls;
    }
  };
  const [imageFiles, setImageFiles] = useState();
  const onFinish = async (values: any) => {
    const urls: any = await uploadFile(imageFiles);
    values.image = urls.join(", ");
    message.success("Thêm sản phẩm thành công");
    props.onAdd(values);
    navigate("/admin/products");
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
      <Form.Item
        name="price"
        rules={[
          { required: true, message: "Trường price là bắt buộc" },
          {
            pattern: /[0-9]$/,
            message: "Giá sản phẩm phải là số",
          },
          { whitespace: true, message: "Trường price không được để trống" },
        ]}
      >
        <Input type="number" placeholder="Product Price" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          { required: true, message: "Trường title là bắt buộc" },
          { whitespace: true, message: "Trường title không được để trống" },
        ]}
      >
        <Input placeholder="Product description" />
      </Form.Item>
      <Upload
        name="image"
        onChange={(info: any) => setImageFiles(info.fileList)}
        beforeUpload={(file: File) => {
          const isImage = file.type.indexOf("image") !== -1;
          if (!isImage) {
            message.error("Chỉ chấp nhận file ảnh");
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error("Ảnh phải nhỏ hơn 2MB");
          }
          return isImage && isLt2M;
        }}
      >
        <Button style={{ marginBottom: "20px" }} icon={<UploadOutlined />}>
          Click to Upload
        </Button>
      </Upload>

      <Form.Item
        name="category"
        rules={[{ required: true, message: "Trường category là bắt buộc" }]}
      >
        <Select placeholder="Chọn Loại Sản Phẩm">
          {props.dataCate.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
