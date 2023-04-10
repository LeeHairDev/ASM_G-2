import { Row, Col, Card, Typography, Divider, Image, Button } from "antd";
import { Iproduct } from "../types/products";
import { Link } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Meta } = Card;
interface Iprops {
  products: Iproduct[];
}
const HomePage = (props: Iprops) => {
 const latestProducts = props.products
   .sort((a:any, b:any) => {
     const aDate: any = new Date(a.createdAt);
     const bDate: any = new Date(b.createdAt);
     return bDate - aDate;
   })
   .slice(0, 6);

  return (
    <div>
      {/* Latest Products */}
      <Divider orientation="center" style={{ fontSize: "25px" }}>
        Sản Phẩm Mới Nhất
      </Divider>
      <Row justify="center" gutter={[32, 32]} style={{ marginBottom: "2rem" }}>
        {latestProducts.map((item) => {
          return (
            <Col span={4} key={item._id}>
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
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
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

      {/* Promotions */}
      <Divider orientation="center" style={{ fontSize: "25px" }}>
        Các Ưu Đãi
      </Divider>
      <Row justify="center" gutter={[32, 32]} style={{ marginBottom: "2rem" }}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <div style={{ height: "220px", overflow: "hidden" }}>
            <Image
              style={{ width: "100%" }}
              src="https://fptshop.com.vn/uploads/originals/2019/12/20/637124263559304211_nf_1200x628.png"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <div style={{ height: "220px", overflow: "hidden" }}>
            <Image
              style={{ width: "100%" }}
              src="https://bachlongmobile.com/bnews/wp-content/uploads/2022/10/HEADERPAGEIP14_975_3-1.png"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <div style={{ height: "220px", overflow: "hidden" }}>
            <Image
              style={{ width: "100%", height: "100%" }}
              src="https://cdn.tgdd.vn/Files/2020/06/11/1262208/sale_800x450.jpg"
            />
          </div>
        </Col>
      </Row>
      {/* Tech News */}
      <Divider orientation="center" style={{ fontSize: "25px" }}>
        Tin Tức Công Nghệ Mới Nhất
      </Divider>
      <Row justify="center" gutter={[32, 32]} style={{ marginBottom: "2rem" }}>
        <Col xs={24} sm={12} md={8}>
          <Link
            to={
              "https://cellphones.com.vn/sforum/moi-de-chua-day-thang-chatgpt-4-da-tuyen-bo-se-cho-20-cong-viec-cua-con-nguoi-ve-vuon"
            }
            style={{ textDecoration: "none" }}
          >
            <Card hoverable style={{ height: "100%" }}>
              <div style={{ height: "250px", overflow: "hidden" }}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/070223-chatgpt-ai.jpg"
                />
              </div>
              <Meta
                style={{ marginTop: "20px" }}
                title="Mới đẻ chưa đầy tháng, ChatGPT-4 đã tuyên bố sẽ cho 20 công việc của con người về vườn"
                description="Trí tuệ nhân tạo (AI) và sự phát triển của các công nghệ liên quan đến nó đang thay đổi cách mà chúng ta làm việc và sống."
              />
            </Card>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Link
            to={
              "https://cellphones.com.vn/sforum/day-la-cau-hinh-chi-tiet-vivo-pad-2-man-hinh-12-1-inch-144hz-chip-dimensity-9000"
            }
            style={{ textDecoration: "none" }}
          >
            <Card hoverable style={{ height: "100%" }}>
              <div style={{ height: "250px", overflow: "hidden" }}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/cau-hinh-Vivo-Pad-2.jpeg"
                />
              </div>
              <Meta
                style={{ marginTop: "20px" }}
                title="Đây là cấu hình chi tiết Vivo Pad 2: Màn hình 12.1 inch 144Hz, chip Dimensity 9000+,…"
                description="Hôm nay, leaker nổi tiếng Digital Chat Station vừa tiết lộ cho chúng ta thông số kỹ thuật chi tiết chiếc máy tính bảng cao cấp sắp tới của Vivo."
              />
            </Card>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Link
            to={
              "https://cellphones.com.vn/sforum/samsung-co-the-ra-mat-galaxy-smarttag-2-va-galaxy-buds-3-trong-nam-nay"
            }
            style={{ textDecoration: "none" }}
          >
            <Card hoverable style={{ height: "100%" }}>
              <div style={{ height: "250px", overflow: "hidden" }}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/Galaxy-SmartTag.jpeg"
                />
              </div>
              <Meta
                style={{ marginTop: "20px" }}
                title="Samsung có thể ra mắt Galaxy SmartTag 2 và Galaxy Buds 3 trong năm nay"
                description="Theo đó, Galaxy SmarTag thế hệ mới sẽ có phạm vi kết nối không dây xa hơn, các tính năng bảo mật tốt hơn để ngăn chặn theo dõi trái phép và pin lâu hơn so với thế hệ trước."
              />
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;