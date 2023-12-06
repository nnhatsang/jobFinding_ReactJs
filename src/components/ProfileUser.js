import { useContext, useRef, useState } from "react";
import { authAxios, endpoints } from "../configs/API";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Button, Container, Form, Image, Spinner } from "react-bootstrap";

const ProfileUser = () => {
  const [user, dispatch] = useContext(UserContext);
  const avatarL = useRef();
  const nav = useNavigate();
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [degree, setDegree] = useState(user.degree);

  console.log(user);

  const changeProfile = async (event) => {
    event.preventDefault();

    const pack = await authAxios().patch(
      endpoints["user-id"](user.id),
      {
        avatar: avatarL.current.files[0],
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        address: address,
        degree: degree,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(pack.data);
    console.log(pack.status);
    if (pack.status === 200) {
      alert("Successful! Please log in again");
      dispatch({ type: "logout" });

      window.location.href = `/login`;
    }
  };
  if (user === null)
    return (
      <Container>
        <Spinner animation="grow" />
      </Container>
    );
  return (
    <>
      <Container>
        <Form onSubmit={changeProfile}>
          <h1 className="text-center mt-3">Personal Information</h1>
          <hr />
          <div>
            <div>
              <Image
                width={150}
                src={user.avatar_path}
                alt="avatar"
                className="avatar-user-profile"
              ></Image>
              <h6>(You can select the information and change them)</h6>
              <Form.Group>
                <Form.Label>Change avatar</Form.Label>
                <Form.Control
                  type="file"
                  name="avatar-upload"
                  ref={avatarL}
                ></Form.Control>
              </Form.Group>
            </div>

            <div>
              <div>
                <div>Username: {user.username}</div>
                <div>Email: {user.email}</div>
              </div>

              <Form.Group>
                <Form.Label>FirstName:</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(evt) => setFirstName(evt.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>LastName:</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(evt) => setLastName(evt.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(evt) => setPhone(evt.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(evt) => setAddress(evt.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Degree:</Form.Label>
                <Form.Control
                  type="text"
                  value={degree}
                  onChange={(evt) => setDegree(evt.target.value)}
                ></Form.Control>
              </Form.Group>
            </div>
          </div>
          <Form.Group className="text-center mt-3">
            <br />
            <Button variant="dark" type="submit">
              Confirm changes
            </Button>
            <text> </text>
            <Button href="/" variant="dark">
              Return to home page
            </Button>
          </Form.Group>
          <hr />
        </Form>
      </Container>
    </>
  );
};

export default ProfileUser;
