import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../App";
import API, { authAxios, endpoints } from "../configs/API";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";

const ApplicationDetail = () => {
  const [user, dispatch] = useContext(UserContext);
  const [applicationDetail, setApplicationDetail] = useState(null);
  const [applicationsId] = useParams();

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const res = user
          ? await authAxios().get(
              endpoints["applicationDetail"](applicationsId)
            )
          : await API.get(endpoints["applicationDetail"](applicationsId));

        setApplicationDetail(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadLesson();
  }, [applicationsId, user]);

  return (
    <>
      <Container>
        {applicationDetail && (
          <Row className="mt-3 shadow-lg bg-light rounded">
            <Col md={2} xs={12} key={applicationDetail.id}>
              <Card.Img
                variant="top"
                height={190}
                src={applicationDetail.company.image_path}
              />
            </Col>
            <Col md={10} xs={12}>
              <Card
                style={{ width: "100%", height: "12rem", border: "0" }}
                bg="light"
              >
                <Card.Body>
                  <Card.Title>{applicationDetail.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ApplicationDetail;
