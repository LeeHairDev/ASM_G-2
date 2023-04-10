import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ICategory } from "../../types/categories";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Iproduct } from "../../types/products";
// import "antd/dist/antd.css";

interface Iprops {
  dataAd: ICategory[];
  onRemove: (id: number) => void;
}

const AdminCategory = (props: Iprops) => {
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
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
              to={"/admin/products/cate/" + record._id}
            >
              Update
            </Link>
          </Button>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState<ICategory[]>([])
    useEffect(() => {
      const datap = props.dataAd.map((item, index) => ({
    key: item._id,
    index: index,
    name: item.name,
    _id: item._id,
  }));
      setData(datap);
    }, [props.dataAd]);
  const [searchTerm, setSearchTerm] = useState("");
 
  const filteredData = data.filter((item: any) =>
    ["name"].some((key) =>
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <div>
      <Input
        style={{ width: 200, margin: " 10px 0" }}
        placeholder="Search . . ."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  );
};

export default AdminCategory;
