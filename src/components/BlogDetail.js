import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { authAxios, endpoints } from "../configs/API";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import { CardBody, CardText } from "reactstrap";
import { UserContext } from "../App";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setblog] = useState(null);
  const [user, dispatch] = useContext(UserContext);
  const [commentTour, setCommentTour] = useState(null);
  const [comments, setComments] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [view, setView] = useState();

  // useEffect(() => {
  //   const loadStatusLike = async () => {
  //     let like = null;
  //     like = await authAxios().get(endpoints["news-like-status"](blogId));
  //     if (like.data.like_status === true) {
  //       setLikeStatus(true);
  //     }
  //   };
  //   loadStatusLike();
  // }, []);
  console.log("hello");
  console.log(blogId);

  useEffect(() => {
    const loadblog = async () => {
      let res = null;
      if (user != null) {
        res = await authAxios().get(endpoints["blogdetail"](blogId));
      } else {
        res = await API.get(endpoints["blogdetail"](blogId));
      }
      // const countLike = await API.get(endpoints["count-like-news"](blogId));
      // setCountLike(countLike.data);
      // console.log(countLike.data);
      setblog(res.data);
      console.log(res.data)
    };
    loadblog();
  }, [likeStatus]);
  console.log(blog);

  return (
    <>
      {blog && (
        <Container>
          <Row>
            <Col lg={8}>
              {/* <div>{view.views}</div> */}
              <h2>{blog.title}</h2>
              <hr />
              <div>Đăng bởi: {blog.user.last_name}</div>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              {/* <div>
              <div className="mr-4">{likeButton}</div>
              <div>
                {user ? (
                  <CommentForm
                    blogId={blogId}
                    comments={comments}
                    setComments={setComments}
                  />
                ) : (
                  <div>Login to comment</div>
                )}
                <div className="mt-4">
                  {commentTour.map((item) => (
                    <div key={item.id} className="mb-4">
                      <div>
                        <div
                          style={{
                            background: `url(${item.user.image_avatar})`,
                          }}
                          width="40"
                          height="40"
                        ></div>
                        <div>
                          <div>{item.user.username}</div>
                          <Moment format="DD/MM/YYYY">
                            {item.updated_date}
                          </Moment>
                        </div>
                      </div>
                      <div>{item.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
            </Col>
            <Col lg={4}>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={blog.image_path}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardText>Hình ảnh liên quan</CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
// const CommentForm = ({ blogId, comments, setComments }) => {
//   const [content, setContent] = useState();
//   const [user] = useContext(UserContext);

//   const addComment = async (event) => {
//     event.preventDefault();

//     const res = await authAxios().post(endpoints["comment-blog"], {
//       content: content,
//       blog: blogId,
//     });

//     setComments([...comments, res.data]);
//   };

//   return (
//     <>
//       <Form onSubmit={addComment}>
//         <Form.Group controlId="formBasicEmail">
//           <Form.Control
//             type="text"
//             value={content}
//             onChange={(evt) => setContent(evt.target.value)}
//             placeholder="Nhap binh luan"
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Them binh luan
//         </Button>
//       </Form>
//     </>
//   );
// };
export default BlogDetail;
