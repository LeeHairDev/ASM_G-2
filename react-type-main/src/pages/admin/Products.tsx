import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Iproduct } from "../../types/products";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ICategory } from "../../types/categories";


interface Iprops {
  dataAd: Iproduct[];
  cateData: ICategory[];
  onRemove: (id: number) => void;
}

const AdminProducts = (props: Iprops) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: any, record: any) => formatter.format(record.price),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: any, record: any) => (
        <img src={record.image} alt={record.name} width={100} height={100} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      onFilter: (value: string, record: any) => record.category === value,
      filters: props.cateData.map((category: any) => ({
        text: category.name,
        value: category.name,
      })),
      width: "10%",
    },

    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có thật sự muốn xóa?"
            onConfirm={() => props.onRemove(record._id ?? 0)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button type="primary" icon={<EditOutlined />}>
            <Link
              className="text-decoration-none text-white"
              to={"/admin/products/" + record._id}
            >
              Update
            </Link>
          </Button>
        </Space>
      ),
    },
  ];
const [dataNew, setData] = useState<Iproduct[]>([]);

useEffect(() => {
  const data = props.dataAd.map((item, index) => {
    const foundCategory = props.cateData.find(
      (cat) => cat._id === item.category
    );
    const categoryName = foundCategory ? foundCategory.name : "Chưa có danh mục";
    return {
      ...item,
      index,
      key: item._id,
      category: categoryName,
    };
  });
  setData(data);
}, [props.dataAd, props.cateData]);

  const [searchTerm, setSearchTerm] = useState("");

const filteredData = dataNew.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div>
      <Input
        style={{ width: 200, margin: " 10px 0" }}
        placeholder="Search . . ."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default AdminProducts;
