import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-3">
      <Container>
        <Row>
          <Col md={4}>
            <h5>
              <i class="bi bi-globe"></i> About Us
            </h5>
            <p>
              Your company description goes here. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </Col>
          <Col md={4}>
            <h5>
              <i class="bi bi-telephone"></i> Contact Us
            </h5>
            <address>
              <p>
                <i className="bi bi-geo-alt-fill"></i> 123 Main Street, City,
                Country
              </p>
              <p>
                <i className="bi bi-phone"></i> +84 (385626803)
              </p>
              <p>
                <i className="bi bi-envelope-fill"></i> nguyenh165201@gmail.com
              </p>
            </address>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li className="mt-2">
                <a href="/">
                  <i className="bi bi-facebook"></i> Facebook
                </a>
              </li>
              <li className="mt-2">
                <a href="/">
                  <i className="bi bi-twitter"></i> Twitter
                </a>
              </li>
              <li className="mt-2">
                <a href="/">
                  <i className="bi bi-linkedin"></i> LinkedIn
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3" />
        <p className="text-center">© 2023 Your Company. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
