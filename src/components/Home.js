import { Button, Card, Carousel, Container, Navbar } from "react-bootstrap";
import Fillter from "./Fillter";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={500}
            src="https://caodang.fpt.edu.vn/wp-content/uploads/1182.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={500}
            src="https://timviec365.vn/pictures/images/viec-lam-nhan-vien-IT-6.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={500}
            src="https://www.jobhopin.com/blog/wp-content/uploads/2019/10/digital-solutions.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <hr />
      <Fillter></Fillter>
      <h1 className="text-center text-info mt-3">Top Companies</h1>
      <Carousel className="m-4" style={{ width: "100%", margin: "0" }}>
        <Carousel.Item>
          <Card style={{ width: "20rem", height: "25rem", margin: "0 5px" }}>
            <Card.Img
              height={200}
              variant="top"
              src="https://marketplace.canva.com/EAFNYtCMxro/1/0/1600w/canva-t%C3%ADm-hi%E1%BB%87n-%C4%91%E1%BA%A1i-logo-c%C3%B4ng-ngh%E1%BB%87-%26-tr%C3%B2-ch%C6%A1i-UlNyH8FgU4A.jpg"
            />
            <Card.Body>
              <Card.Title>Vinatech</Card.Title>
              <Card.Text>Intern java</Card.Text>
              <Card.Text>Mô tả công việc</Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card style={{ width: "20rem", height: "25rem", margin: "0 5px" }}>
            <Card.Img
              height={200}
              variant="top"
              src="https://thietkelogo.vn/wp-content/uploads/2017/12/6.jpg"
            />
            <Card.Body>
              <Card.Title>HengYu Tech</Card.Title>
              <Card.Text>Intern java</Card.Text>
              <Card.Text>Mô tả công việc</Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card style={{ width: "20rem", height: "25rem", margin: "0 5px" }}>
            <Card.Img
              height={200}
              variant="top"
              src="https://www.beeart.vn/uploads/file/images/blog/logo-cong-nghe/logo-cong-nghe-bee-art-05.jpg"
            />
            <Card.Body>
              <Card.Title>Nextlogix</Card.Title>
              <Card.Text>Intern java</Card.Text>
              <Card.Text>Mô tả công việc</Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>

      <hr />
      <h1 className="text-center text-info mt-3">Create CV</h1>
      <div className="d-flex m-3">
        <Navbar className="bg-body-tertiary justify-content-between m-2 p-4 rounded">
          <div className="d-flex">
            <div className="m-1">
              <h4>Create A Resume</h4>
              <p>Create a profile now for recruiters can see you.</p>
            </div>
            <NavLink to="/userCv">
              <Button variant="danger">
                <i class="bi bi-plus-circle"></i> Create A Resume
              </Button>
            </NavLink>
          </div>
        </Navbar>
        {/* <Navbar className="bg-body-tertiary justify-content-between m-2 p-4 rounded ms-auto">
          <div className="d-flex">
            <div className="m-1">
              <h4>Load Profile</h4>
              <p>
                Load your CV in Word, PDF .. Employers will see your uploaded CV
              </p>
            </div>
            <NavLink to="/userCv">
              <Button variant="outline-danger">
                <i class="bi bi-cloud-upload"></i> Quick Upload CV
              </Button>
            </NavLink>
          </div>
        </Navbar> */}
      </div>
    </Container>
  );
};

export default Home;
