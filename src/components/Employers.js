import React, { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Employers() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <Container>
        <Row className="text-center text-info mt-3">
          <h1>For Employers</h1>
          <hr />
          <Col>
            <Card style={{ width: "26rem" }}>
              <Card.Body>
                <img
                  className="d-block w-100 rounded"
                  height={300}
                  src="https://media.licdn.com/dms/image/D4D12AQHTRdXrKHJM_g/article-cover_image-shrink_720_1280/0/1680509954434?e=2147483647&v=beta&t=wsrRw6epWp1pSFs8nuAQwZELMJBF2teYAKt0CZ6_coE"
                  alt="First slide"
                />
                <Card.Title>Post A Job</Card.Title>
                <Card.Text>
                  Your job advertisement will be automatically posted on our job
                  website.
                </Card.Text>
                <hr />
                <NavLink to="/AddJob">
                  {" "}
                  <Button variant="danger">
                    <i class="bi bi-upload"> </i> Post A Job
                  </Button>
                </NavLink>

                <Button variant="outline-danger" onClick={handleShowModal}>
                  View more <i class="bi bi-arrow-right"></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "26rem" }}>
              <Card.Body>
                <img
                  className="d-block w-100 rounded"
                  height={300}
                  src="https://blog.avotrix.com/wp-content/uploads/2020/01/Job-Hunting-Illustration-1-1280x640.jpg"
                  alt="First slide"
                />
                <Card.Title>Search Candidates</Card.Title>
                <Card.Text>
                  Find resumes by occupation, region, experience and skills of
                  the candidate.
                </Card.Text>
                <hr />
                <Button variant="danger">
                  <i class="bi bi-search"></i> Search Candidates
                </Button>{" "}
                <Button variant="outline-danger">
                  View more <i class="bi bi-arrow-right"></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "26rem" }}>
              <Card.Body>
                <img
                  className="d-block w-100 rounded"
                  height={300}
                  src="https://peekhelpers.com/images/posts/other_serviceimage.jpg"
                  alt="First slide"
                />
                <Card.Title>Other services</Card.Title>
                <Card.Text>
                  Our consultants and industry. There is a network of potential
                  and suitable candidates.
                </Card.Text>
                <hr />
                <Button variant="outline-danger">
                  View more <i class="bi bi-arrow-right"></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>ACCESS A LARGE, DIVERSE TALENT POOL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>STEP 1: JOIN JOBWEB</h6>
          <p>Sign up and get access to your free employer account.</p>
        </Modal.Body>
        <Modal.Body>
          <p>
            <h6>STEP 2: POST JOBS </h6>Solutions to search, connect and recruit
            talents.
          </p>
        </Modal.Body>
        <Modal.Body>
          <h6>STEP 3 : MANAGE YOUR BRAND</h6>
          <p>Sign up and get access to your free employer account.</p>
        </Modal.Body>
        <Modal.Body>
          <h6>STEP 4: ACCESS TALENT POOL - RESUME DATABASE</h6>
          <p>Sign up and get access to your free employer account.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* Thêm các nút khác nếu cần */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Employers;
