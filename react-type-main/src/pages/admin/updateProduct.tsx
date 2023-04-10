import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, message, Upload } from "antd";
import { ICategory } from "../../types/categories";
import { Iproduct } from './../../types/products';
import { SubmitHandler } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

interface IProps {
  product: Iproduct[];
  dataCate: ICategory[];
  onUpdate: (product: Iproduct) => void;
}

const UpdateProduct = (props: IProps) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
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
const [oldImage, setOldImage] = useState<string | undefined>();
useEffect(() => {
  const currentProduct = props.product.find((item) => item._id === id);
  form.setFieldsValue(currentProduct);
  setOldImage(currentProduct?.image);
  
}, [props, id, form]);
const onFinish = async (data: any) => {
  
  let urls: any = oldImage ? [oldImage] : [];

  if (imageFiles) {
    urls = await uploadFile(imageFiles);
  }
  data.image = urls.join(", ");


  message.success("Sửa thành công");
  props.onUpdate(data);
  navigate("/admin/products");
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
      <Form.Item
        name="price"
        label="Product Price"
        rules={[{ required: true, message: "Trường price là bắt buộc" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Product Title"
        rules={[{ required: true, message: "Trường title là bắt buộc" }]}
      >
        <Input />
      </Form.Item>
      {oldImage && !imageFiles && (
        <Form.Item className="image" name="image" label="Product Image">
          <Input value={oldImage} />
        </Form.Item>
      )}
      <Upload
        name="image"
        onChange={(info: any) => setImageFiles(info.fileList)}
        beforeUpload={(file) => {
          setOldImage(undefined);
          return true;
        }}
      >
        <Button
          style={{
            margin: "0px 0px 20px 60px",
          }}
          icon={<UploadOutlined />}
        >
          Click to Upload
        </Button>
      </Upload>
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Trường category là bắt buộc" }]}
      >
        <Select>
          {props.dataCate.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProduct;
