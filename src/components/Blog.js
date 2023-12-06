import { useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
import { Card, CardImg, Col, Container, Row, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CardBody, CardText, CardTitle } from "reactstrap";

const Blog = () => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await API.get(endpoints["blogs"]);

        if (Array.isArray(response.data.results)) {
          setBlog(response.data.results);
        } else {
          console.error("Dữ liệu từ API không phải là một mảng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    loadBlog();
  }, []);

  if (blog === null)
    return (
      <Container>
        <Spinner animation="grow" />
      </Container>
    );
  return (
    <>
      <h1 className="text-center text-info mt-3">Blog</h1>

      <Container>
        <hr />
        <Row>
          {blog.map((c) => (
            <Col md="6" className="mb-4">
              <Card style={{ width: "40rem", height: "28rem" }} bg="light">
                <NavLink className="nav-link" to={`/blogs/${c.id}`}>
                  <CardImg top width="100%" src={c.image_path} alt={c.title} />
                  <CardBody>
                    <CardTitle>{c.title}</CardTitle>
                  </CardBody>
                </NavLink>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Blog;
