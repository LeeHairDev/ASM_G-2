import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "antd";
import { Chart, Axis, Interval, Tooltip } from "bizcharts";
import { Iproduct } from "../../types/products";
import { ICategory } from "../../types/categories";

interface Iprops {
  dataAd: Iproduct[];
  cateData: ICategory[];
}

const DashboardAdmin = (props: Iprops) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  const [dataNew, setData] = useState<Iproduct[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    const data = props.dataAd.map((item, index) => {
      const foundCategory = props.cateData.find(
        (cat) => cat._id === item.category
      );
      const categoryName = foundCategory ? foundCategory.name : "";
      return {
        ...item,
        index,
        key: item._id,
        category: categoryName,
      };
    });
    setData(data);
  }, [props.dataAd, props.cateData]);

  useEffect(() => {
    const categories = props.cateData.map((category) => {
      const products = dataNew.filter(
        (product) => product.category === category.name
      );
      const totalPrice = products.reduce(
        (accumulator, currentProduct) => accumulator + currentProduct.price,
        0
      );
      return {
        key: category._id, // thêm key vào đây
        name: category.name,
        soluong: products.length,
        totalPrice: formatter.format(totalPrice),
      };
    });

    setCategoryData(categories);
  }, [props.cateData, dataNew]);

  const columns = [
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số Lượng Sản Phẩm",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "Tổng Số Tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  return (
    <>
      <Chart height={400} data={categoryData} autoFit>
        <Axis name="name" />
        <Axis name="soluong" />
        <Interval position="name*soluong" color="#1890ff" />
        <Tooltip shared />
      </Chart>
      <Table columns={columns} dataSource={categoryData} />
    </>
  );
};

export default DashboardAdmin;

