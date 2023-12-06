import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import cookies from "react-cookies";
import { UserContext } from "../App";
import API, { authAxios, endpoints } from "../configs/API";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Loading from "../layout/Loading";
function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [user, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    try {
      //   const clientKey = await API.get(endpoints["oauth2_info"]);
      const res = await API.post(
        endpoints["login"],
        {
          client_id: "RGDidoKcPw5FSEfxrXBjvDukRwg525cpmhlxD0N2",
          client_secret:
            "D2ce2xj4Fw6ECXh1Ac3ndSHBWspO5TSm6eiJdKJx7Vdrpa8MqkBNOHIiGXbg46HLzeAR1N0pNf4S2B1i1X1WwWKvS6hoGrvKc5Lu0uABWhD5c07OfpR432pTqChuTnRj",
          username: username,
          password: password,
          grant_type: "password",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
        setLoading(true)
      );

      if (res.status === 200) {
        cookies.save("access_token", res.data.access_token);
        const user = await authAxios().get(endpoints["current_user"]);
        cookies.save("current_user", user.data);
        console.log(user.data);
        dispatch({
          type: "login",
          payload: user.data,
        });
        localStorage.setItem("USER", "Da dang nhap roi nhe");
        navigate(-1); // Chuyển hướng về trang trước đó nếu có
      }
    } catch (error) {
      console.info(error, error.stack);
      alert(`❌Thông tin đăng nhập không chính xác❌`);
    } finally {
      setLoading(false);
    }
  };

  if (user !== null) return <Navigate to="/" />;
  return (
    <>
      <Container className="w-50">
        <p></p>
        <h1 className="text-center">ĐĂNG NHẬP</h1>
        <hr />
        <Form onSubmit={login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </Form.Group>

          {loading ? (
            <Loading />
          ) : (
            <Button variant="outline-dark" type="submit">
              Đăng nhập
            </Button>
          )}

          <Link
            to="/recovery"
            className="loginPanel-login--resetPassword"
            // onClick={() => {
            //    closeModal(false);
            // }}
            style={{ color: "black", marginLeft: "10px" }}
          >
            Quên mật khẩu
          </Link>
          <hr />
          <Button variant="outline-dark">
            <Link className="nav-link" to="/register">
              Đăng ký
            </Link>
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
