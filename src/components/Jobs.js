import { useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Fillter from "./Fillter";

const Jobs = () => {
  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        // Gửi yêu cầu GET đến Django API để lấy danh sách công ty
        const response = await API.get(endpoints["jobs"]);

        if (Array.isArray(response.data.results)) {
          setJobs(response.data.results);
        } else {
          console.error("Dữ liệu từ API không phải là một mảng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    loadJobs();
  }, []);

  return (
    <>
      <Container className="mt-3">
        <Fillter></Fillter>

        <hr />
        <h1 className="text-center text-info mt-3">ALL JOB</h1>
        <Row>
          {Jobs.map((c) => (
            <Col md={4} xs={12} key={c.id}>
              <Link className="nav-link mb-3" to={`/jobs/${c.id}`} href="#">
                <Card
                  style={{ width: "25rem", border: "2px solid black" }}
                  bg="light"
                >
                  <div className="bg-image">
                    <img
                      src="https://images.unsplash.com/photo-1629905679177-4c4e2623654f?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="img-fluid"
                      alt="Sample"
                    />
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                    ></div>
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <b>{c.company.name}</b>
                    </Card.Title>
                    <Card.Title>{c.name}</Card.Title>
                    <Card.Title>
                      End date: {format(new Date(c.end_date), "dd/MM/yyyy")}
                    </Card.Title>
                    <Card.Title>
                      <i class="bi bi-geo-alt-fill">{c.city}</i>
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

export default Jobs;
