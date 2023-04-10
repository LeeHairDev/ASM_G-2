import { Card, Col, Input, Row, Select, Image, Button } from "antd";
import { useEffect } from 'react';
import { useState } from 'react';
import { Iproduct } from "../types/products";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
const { Option } = Select;
interface Iprops {
  products: Iproduct[];
}
const ProductPage = (props: Iprops) => {
  const [data, setData] = useState<Iproduct[]>([]);
  const [filteredData, setFilteredData] = useState<Iproduct[]>([]);

  useEffect(() => {
    setData(props.products);
    setFilteredData(props.products);
  }, [props]);

  // const Remove = (id: number) => {
  //   props.onRemove(id);
  // };

  const handleSearch = (value: string) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilter = (value: string) => {
    let filtered = [...data];
    if (value === "price-filter") {
      filtered = filtered.filter(
        (item) => item.price < 5000000
      );
    }else if (value === "price-filter1") {
      filtered = filtered.filter(
        (item) => item.price >= 5000000 && item.price < 10000000
      );
    } else if (value === "price-filter2") {
      filtered = filtered.filter(
        (item) => item.price >= 10000000 && item.price <= 20000000
      );
    } else if (value === "price-filter3") {
      filtered = filtered.filter(
        (item) => item.price >= 20000000 && item.price <= 40000000
      );
    } else if (value === "price-filter4") {
      filtered = filtered.filter(
        (item) => item.price >= 50000000
      );
    }
    setFilteredData(filtered);
  };

  return (
    <div>
      <div style={{ margin: "16px 0" }}>
        <Input.Search placeholder="Search products" onSearch={handleSearch} />
        <Select
          defaultValue="all"
          style={{ margin: "16px 0" }}
          onChange={handleFilter}
        >
          <Option value="all">Tất cả</Option>
          <Option value="price-filter">Dưới 5 triệu</Option>
          <Option value="price-filter1">Từ 5 triệu đến 10 triệu</Option>
          <Option value="price-filter2">Từ 10 triệu đến 20 triệu</Option>
          <Option value="price-filter3">Từ 20 triệu đến 40 triệu</Option>
          <Option value="price-filter4">Trên 50 triệu</Option>
        </Select>
      </div>
      <Row gutter={16}>
        {filteredData.map((item) => {
          return (
            <Col span={4} key={item._id} style={{marginBottom:"5px"}}>
              <Link
                to={"/products/" + item._id}
                style={{ textDecoration: "none" }}
              >
                <Card hoverable style={{ width: 240 }}>
                  <div style={{ height: "220px", overflow: "hidden" }}>
                    <Image style={{ width: "100%" }} src={item.image} />
                  </div>
                  <Meta
                    title={item.name}
                    description={item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  />
                  <Button
                    style={{ marginTop: "15px", display: "flex", alignItems: "center" }}
                    icon={<ShoppingOutlined />}
                  >
                    Mua Ngay
                  </Button>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ProductPage;
