import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import API, { endpoints } from "../configs/API";
import { Link } from "react-router-dom";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        // Gửi yêu cầu GET đến Django API để lấy danh sách công ty
        const response = await API.get(endpoints["companies"]);

        if (Array.isArray(response.data.results)) {
          setCompanies(response.data.results);
        } else {
          console.error("Dữ liệu từ API không phải là một mảng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    loadCompanies();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center text-info mt-3">ALL COMPANY</h1>
          <hr />
          {companies.map((c) => (
            <Col md={3} xs={12} key={c.id} className="mb-3">
              <Link className="nav-link" to={`/companies/${c.id}`} href="#">
                {" "}
                <Card
                  style={{ width: "19rem", border: "2px solid black" }}
                  bg="light"
                  title="View Company Detail"
                >
                  <Card.Img variant="top" height={300} src={c.image_path} />
                  <Card.Body>
                    <Card.Title>
                      <i class="bi bi-geo-alt-fill"></i>
                      {c.city_name}
                    </Card.Title>
                    <Card.Title>
                      <b>{c.name}</b>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Companies;
