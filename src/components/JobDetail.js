import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API, { authAxios, endpoints } from "../configs/API";
import { UserContext } from "../App";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { format } from "date-fns";

const JobDetail = () => {
  const [jobDetail, setjobDetail] = useState(null);
  const { jobId } = useParams();
  const { companiesId } = useParams();
  const [user, dispatch] = useContext(UserContext);
  const [Jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState(null);
  const [companyDetail, setCompanyDetail] = useState(null);

  // apply
  const [selectedCV, setSelectedCV] = useState(null);
  const [CVs, setCVs] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const [showCVDetailModal, setShowCVDetailModal] = useState(false);
  const [selectedCVDetail, setSelectedCVDetail] = useState(null);

  const handleApplyClick = () => {
    // Load danh sách CV của user khi nhấn "Apply Now"
    loadUserCVs();
    // Mở modal
    setShowApplyModal(true);
  };

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

  const loadUserCVs = async () => {
    try {
      const res = await authAxios().get(endpoints["userCV"]);
      setCVs(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy danh sách CV:", error);
    }
  };

  const handleApplySubmit = async () => {
    try {
      if (!selectedCV) {
        console.error("Vui lòng chọn một CV");
        alert("Vui lòng chọn một CV");
        return;
      }
      const existingApplication = application.find(
        (app) => app.user.id === user.id && app.job.id === jobDetail.id
        // (app) => app.user === user.id && app.job.id === jobDetail.id
      );
      console.log(application);

      if (existingApplication) {
        console.error("Đơn xin việc đã tồn tại");
        alert("Đơn xin việc đã tồn tại");
        return;
      }

      const applicationData = {
        user: user.id,
        job: jobDetail.id,
        cv: selectedCV.id,
        cover_letter: "Nội dung cover letter ở đây",
      };

      await authAxios().post(endpoints["createApplication"], applicationData);

      console.log("Đã gửi đơn xin việc thành công");
      alert("Đã gửi đơn xin việc thành công");
      window.location.reload();

      // Đóng modal sau khi gửi đơn thành công
      setShowApplyModal(false);
    } catch (error) {
      console.error("Lỗi khi gửi đơn xin việc:", error);
      alert("Lỗi khi gửi đơn xin việc:", error);
    }
  };
  const handleViewDetailClick = async (cv) => {
    try {
      // Tải thông tin chi tiết của CV từ API
      const res = await authAxios().get(endpoints["cvDetail"](cv.id));
      setSelectedCVDetail(res.data);
      console.log(res.data);
      // Mở modal chi tiết
      setShowCVDetailModal(true);
    } catch (error) {
      console.log("Lỗi khi tải chi tiết CV:", error);
    }
  };

  //

  useEffect(() => {
    const loadJobDetail = async () => {
      try {
        const res = user
          ? await authAxios().get(endpoints["jobDetail"](jobId))
          : await API.get(endpoints["jobDetail"](jobId));

        setjobDetail(res.data);
        console.log(jobDetail);
      } catch (error) {
        console.log(error);
      }
    };
    loadJobDetail();
  }, [jobId, user]);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const res = user
          ? await authAxios().get(
              endpoints["companyDetail"](jobDetail.company.id)
            )
          : await API.get(endpoints["companyDetail"](jobDetail.company.id));

        setCompanyDetail(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadLesson();
  }, [companiesId, user]);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={8} xs={12}>
            <Tabs
              id="controlled-tab-example"
              // activeKey={key}
              // onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="JobDetail" title="JobDetail">
                {jobDetail && (
                  <>
                    <Row className="mt-2">
                      <Col md={10} xs={12} key={jobDetail.id}>
                        <Card style={{ width: "50rem" }} bg="light">
                          <Card.Body>
                            <Button
                              variant="success"
                              className="text-white"
                              onClick={handleApplyClick}
                            >
                              <b>Apply Now</b>
                            </Button>
                            <Card.Text>
                              <b>Salary:</b>{" "}
                              {formatCurrency(jobDetail.salary_from)} -{" "}
                              {formatCurrency(jobDetail.salary_to)}
                            </Card.Text>
                            <Card.Text>
                              <b>Job Type:</b> {jobDetail.type_job}
                            </Card.Text>
                            <Card.Text>
                              <b>End Date:</b>{" "}
                              {format(
                                new Date(jobDetail.end_date),
                                "dd/MM/yyyy"
                              )}{" "}
                            </Card.Text>
                            <Card.Text>
                              <b>Level:</b> {jobDetail.position}
                            </Card.Text>
                            <Card.Text>
                              <b>Company: </b>
                              {jobDetail.company.name}
                            </Card.Text>
                            <Card.Text>
                              <b> Work Location:</b>
                              {jobDetail.city}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={6} xs={12} key={jobDetail.id}>
                        <Card style={{ width: "50rem" }} bg="light">
                          <Card.Body>
                            <Card.Title>JOB DESCRIPTION</Card.Title>
                            <Card.Text>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: jobDetail.description,
                                }}
                              ></div>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={6} xs={12} key={jobDetail.id}>
                        <Card style={{ width: "50rem" }} bg="light">
                          <Card.Body>
                            <Card.Title>JOB REQUIREMENT</Card.Title>
                            <Card.Text>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: jobDetail.job_required,
                                }}
                              ></div>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </>
                )}
              </Tab>
              <Tab eventKey="CompanyInfo" title="Company Infomation">
                Chưa hiển thị được company info
                {companyDetail && (
                  <>
                    <Row className="mt-2 shadow-lg bg-light rounded">
                      <Col md={2} xs={12} key={companyDetail.id}>
                        <Card.Img
                          variant="top"
                          height={190}
                          src={companyDetail.company.image_path}
                        />
                      </Col>
                      <Col md={10} xs={12} key={companyDetail.id}>
                        <Card
                          style={{
                            width: "100%",
                            height: "12rem",
                            border: "0",
                          }}
                          bg="light"
                        >
                          <Card.Body>
                            {/* <Card.Img variant="top" height={300} src={office} /> */}
                            <Card.Title>{companyDetail.name}</Card.Title>
                            <Card.Text>
                              <i class="bi bi-geo-alt-fill"> </i>
                              {companyDetail.address}
                            </Card.Text>
                            <Card.Text>
                              <i class="bi bi-envelope"> </i>Email:{" "}
                              {companyDetail.email}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </>
                )}
              </Tab>
              <Tab eventKey="CompanyJobs" title="Orther jobs from this company">
                Chưa hiển thị được job for company
              </Tab>
            </Tabs>
          </Col>
          <Col className="mt-5 bg-light" md={4} xs={12}>
            <h3 className="bg-light">Other jobs</h3>
            {Jobs.map((c) => (
              <Col md={3} xs={12} key={c.id}>
                <Link className="nav-link" to={`/jobs/${c.id}`} href="#">
                  <Card
                    className="m-2"
                    style={{ width: "25rem", border: "2px solid black" }}
                    bg="light"
                  >
                    {/* <Card.Img variant="top" height={300} src={c.name} /> */}
                    <Card.Body>
                      <Card.Title>{c.company.name}</Card.Title>
                      <Card.Text>{c.name}</Card.Text>
                      <Card.Text>
                        <i class="bi bi-geo-alt-fill">{c.city}</i>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn CV để ứng tuyển</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Hiển thị danh sách CV */}
          <ListGroup>
            {CVs.map((cv) => (
              <ListGroup.Item
                key={cv.id}
                action
                active={selectedCV && selectedCV.id === cv.id}
                onClick={() => setSelectedCV(cv)}
                style={{
                  backgroundColor:
                    selectedCV && selectedCV.id === cv.id
                      ? "#C0C0C0"
                      : "inherit",
                  color:
                    selectedCV && selectedCV.id === cv.id ? "white" : "black",
                }}
              >
                <p>Hồ sơ số: {cv.id}</p>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={() => handleViewDetailClick(cv)}
                >
                  Xem chi tiết
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplyModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleApplySubmit}>
            Gửi Đơn
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCVDetailModal}
        onHide={() => setShowCVDetailModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Hiển thị thông tin chi tiết của CV */}
          {selectedCVDetail && (
            <div>
              <p>
                Họ tên: {selectedCVDetail.user.last_name}
                {selectedCVDetail.user.first_name}
              </p>
              <p>Email: {selectedCVDetail.user.email}</p>
              <p>Mô tả cá nhân: {selectedCVDetail.user.description}</p>
              <p>Số điện thoại: {selectedCVDetail.user.phone}</p>
              <p>Địa chỉ: {selectedCVDetail.user.address}</p>
              <p>Bằng cấp: {selectedCVDetail.user.degree}</p>
              <p>Giải thưởng: {selectedCVDetail.career_goals}</p>
              <p>Chi tiết học vấn: {selectedCVDetail.degree_detail}</p>
              <p>Kinh nghiệm: {selectedCVDetail.experience_detail}</p>
              <p>Kỹ năng: {selectedCVDetail.skill}</p>
              <p>
                CV_link:{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedCVDetail.foreignLanguage,
                  }}
                ></div>
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCVDetailModal(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobDetail;
