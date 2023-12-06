import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import API, { authAxios, endpoints } from "../configs/API";
import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const UserApplication = () => {
  const [user, dispatch] = useContext(UserContext);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const res = user
          ? await authAxios().get(endpoints["userApplication"])
          : await API.get(endpoints["userApplication"]);

        setApplication(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadApplication();
  }, []);

  if (user === null)
    return (
      <Container>
        <Spinner animation="grow" />
      </Container>
    );

  return (
    <>
      <Container>
        <h1 className="text-center mt-3">Application Of User</h1>
        <Row className="mt-3 shadow-lg bg-light rounded">
          <Col md={2} xs={12} key={user.id}>
            <Card.Img variant="top" height={200} src={user.avatar_path} />
          </Col>
          <Col md={10} xs={12} key={user.id}>
            <Card
              style={{ width: "100%", height: "auto", border: "0" }}
              bg="light"
            >
              <h2>Personal Info</h2>
              <Card.Body>
                <Card.Title>
                  {" "}
                  {user.first_name} {user.last_name}{" "}
                </Card.Title>
                <Card.Title></Card.Title>
                <Card.Text>
                  <i class="bi bi-geo-alt-fill"> </i>
                  {user.address}
                </Card.Text>
                <Card.Text>
                  <i class="bi bi-envelope"> </i>Email: {user.email}
                </Card.Text>
                <p>Degree: {user.degree}</p>
                <p>Description: {user.description}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <hr />

        {application?.map((c) => (
          <Row className="mt-3 shadow-lg bg-light rounded">
            <Col md={2} xs={12} key={user.id}>
              <img
                src="https://images.unsplash.com/photo-1629905679177-4c4e2623654f?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="img-fluid"
                alt="Sample"
              />
            </Col>
            <Col md={8} xs={12}>
              <Link className="nav-link mb-2" to={`/jobs/${c.job.id}`} href="#">
                <Card
                  style={{ width: "100%", height: "5rem", border: "0" }}
                  bg="light"
                >
                  <Card.Body>
                    <Card.Title>Company: {c.job.company.name}</Card.Title>
                    <Card.Title>Name Job: {c.job.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default UserApplication;
