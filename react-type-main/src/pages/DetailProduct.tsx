import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Image, Divider, Space, Button, Rate } from "antd";
import { getOneProducts } from "../api/products";

const { Title, Paragraph } = Typography;

const DetailProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    id: 0,
    name: "",
    price: 0,
    image: "",
    description: "",
  });
  useEffect(() => {
    if (id) {
    getOneProducts(id).then(({ data: { product } }) => setData(product));
    }
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      <Card hoverable>
        <div>
          <Title level={2}>{data.name}</Title>
          <div style={{ width: "500px", height: "auto", overflow: "hidden" }}>
            <Image
              style={{ width: "100%", margin: "20px 0" }}
              src={data.image}
            />
          </div>
          <Rate allowHalf defaultValue={2.5} />
          <Title level={3} style={{ float: "right", color: "red" }}>
            {data.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Title>
        </div>
        <Divider orientation="left">Thông tin sản phẩm</Divider>
        <p>
            {data.description}
        </p>
        <Space>
          <Button type="primary">Thêm vào giỏ hàng</Button>
          <Button>Mua ngay</Button>
        </Space>
      </Card>
    </div>
  );
};

export default DetailProduct;
