import { useContext, useEffect, useState } from "react";
import API, { authAxios, endpoints } from "../configs/API";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link, NavLink, useParams } from "react-router-dom";
import { UserContext } from "../App";
import ReactStars from "react-rating-stars-component";
import { format } from "date-fns";
import Moment from "react-moment";

const CompanyDetail = () => {
  const [companyDetail, setCompanyDetail] = useState(null);
  const { companiesId } = useParams();
  const [user, dispatch] = useContext(UserContext);
  const [jobCompany, setJobCompany] = useState(null);
  const [comment, setComment] = useState([]);
  // const [comments, setComments] = useState([]);

  const [commentCompany, setCommentCompany] = useState(null);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const res = user
          ? await authAxios().get(endpoints["companyDetail"](companiesId))
          : await API.get(endpoints["companyDetail"](companiesId));

        setCompanyDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadLesson();
  }, [companiesId, user]);

  useEffect(() => {
    const loadJobCompany = async () => {
      try {
        const res = user
          ? await authAxios().get(endpoints["jobCompany"](companiesId))
          : await API.get(endpoints["jobCompany"](companiesId));

        setJobCompany(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadJobCompany();
  }, [companiesId, user]);

  useEffect(() => {
    const loadComments = async () => {
      const comments = await API.get(endpoints["comment-company"](companiesId));
      setCommentCompany(comments.data);
    };

    loadComments();
  }, [comment]);

  const CommentForm = ({ companyId, setComment }) => {
    const [content, setContent] = useState("");
    const [starRate, setStarRate] = useState(0);

    const addComment = async (event) => {
      event.preventDefault();

      if (content.trim() === "") {
        alert("Nhập đầy đủ thông tin");
        // Nếu content trống hoặc chỉ chứa khoảng trắng, không thực hiện thêm bình luận
        return;
      }

      try {
        // Sử dụng starRate (số sao) thay vì input type="number"
        const res = await authAxios().post(endpoints["company-comment"], {
          content: content,
          company: companyId,
          rating: starRate,
        });

        // Xóa nội dung và sao sau khi thêm bình luận
        setContent("");
        setStarRate(0);

        // Thêm bình luận mới vào danh sách bình luận hiện tại
        setCommentCompany([...commentCompany, res.data]);
      } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    };

    return (
      <>
        <Form onSubmit={addComment}>
          <div className="mt-3">
            <div>
              {/* Sử dụng ReactStars để cho phép người dùng chọn số sao */}
              <ReactStars
                count={5}
                onChange={(newRating) => setStarRate(newRating)}
                value={starRate}
                size={24} // Đặt kích thước của các sao ở đây
                emptyIcon={<i className="bi bi-star text-muted"></i>}
                filledIcon={<i className="bi bi-star-fill text-warning"></i>}
                halfIcon={<i className="bi bi-star-half text-warning"></i>}
                activeColor="#124efe"
              />
            </div>
            <Form.Group className="my-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={content}
                onChange={(evt) => setContent(evt.target.value)}
                placeholder="Nhập bình luận"
              />
            </Form.Group>
          </div>

          <Button variant="primary" type="submit">
            Thêm bình luận
          </Button>
        </Form>
      </>
    );
  };

  return (
    <Container>
      {companyDetail && (
        <Row className="mt-3 shadow-lg bg-light rounded">
          <Col md={2} xs={12} key={companyDetail.id}>
            <Card.Img
              variant="top"
              height={190}
              src={companyDetail.image_path}
            />
          </Col>
          <Col md={10} xs={12} key={companyDetail.id}>
            <Card
              style={{ width: "100%", height: "12rem", border: "0" }}
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
                  <i class="bi bi-envelope"> </i>Email: {companyDetail.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <hr />
      <h2 className="text-center text-info mt-3">Job opportunities for you</h2>
      {/* Reload lại trang thì bị lỗi */}
      <Row>
        {jobCompany?.map((c) => {
          return (
            <Col md={4} xs={12} key={c.id}>
              <Link className="nav-link mb-2" to={`/jobs/${c.id}`} href="#">
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
          );
        })}
      </Row>
      <hr />
      {companyDetail && (
        <Row className="my-3 shadow-lg bg-light rounded">
          <Col md={10} xs={12} key={companyDetail.id}>
            <Card style={{ width: "100%", border: "0" }} bg="light">
              <Card.Body>
                <div
                  dangerouslySetInnerHTML={{
                    __html: companyDetail.description,
                  }}
                ></div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Row>
        {user ? (
          <CommentForm companyId={companiesId} setComment={setCommentCompany} />
        ) : (
          <NavLink className="nav-link" to="/login">
            <Alert variant="warning">LOGIN TO COMMENT</Alert>
          </NavLink>
        )}
      </Row>
      {/* <Row>
        {Array.isArray(commentCompany) ? (
          commentCompany.map((c, index) => (
            <div key={index}>
              {c.content}....{c.rating}
            </div>
          ))
        ) : (
          <p>Không có bình luận.</p>
        )}
      </Row> */}
      <Row>
        {Array.isArray(commentCompany) ? (
          commentCompany.map((comment, index) => (
            <div key={index}>
              <Card className="my-3">
                <Card.Body>
                  <Card.Title>Bình luận bởi {comment.user.username}</Card.Title>

                  <Moment fromNow>{comment.created_date}</Moment>
                  <Card.Subtitle className="my-2 text-muted">
                    Rated
                    <ReactStars
                      count={5}
                      value={comment.rating}
                      size={24}
                      edit={false} // Set to true if you want users to be able to change their ratings
                      activeColor="#ffd700" // Set the color of the stars
                    />
                  </Card.Subtitle>
                  <Card.Text>{comment.content}</Card.Text>
                  {/* <Card.Subtitle className="text-muted">
                    {new Date(comment.create_date).toLocaleString()}
                  </Card.Subtitle> */}
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </Row>
    </Container>
  );
};
export default CompanyDetail;
