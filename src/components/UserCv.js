import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import API, { authAxios, endpoints } from "../configs/API";
import Loading from "../layout/Loading";
import { Row, Col, Card, Modal, Button, Form } from "react-bootstrap";
import CV from "../Css/CV.css";

export default function UserCv() {
  const [user, dispatch] = useContext(UserContext);
  const [cv, setCv] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);
  const [editedCv, setEditedCv] = useState({}); // Thêm state để theo dõi thông tin CV đã chỉnh sửa
  const [showAddCvModal, setShowAddCvModal] = useState(false);

  useEffect(() => {
    const loadCv = async () => {
      try {
        const res = user
          ? await authAxios().get(endpoints["userCV"])
          : await API.get(endpoints["userCV"]);

        setCv(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCv();
  }, []);
  const handleShowModal = (cv) => {
    setSelectedCv(cv);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setSelectedCv(null);
    setShowModal(false);
    console.log("Modal is hidden");
  };

  const handleShowAddCvModal = () => {
    setShowAddCvModal(true);
  };

  const handleHideAddCvModal = () => {
    setShowAddCvModal(false);
  };

  const handleInputChange = (field, value) => {
    setEditedCv((prevCv) => ({
      ...prevCv,
      [field]: value,
    }));
  };
  const updateCv = async (cvId, updatedCv) => {
    try {
      await authAxios().patch(endpoints["cvDetail"](cvId), updatedCv);
      const res = user
        ? await authAxios().get(endpoints["userCV"])
        : await API.get(endpoints["userCV"]);
      setCv(res.data);
      handleHideModal();
      alert("Update succes");
    } catch (error) {
      console.error("Error updating CV:", error);
    }
  };

  const updateCvIsDeleted = async (cvId) => {
    try {
      await authAxios().patch(endpoints["cvDetail"](cvId), {
        is_deleted: true,
      });
      const res = user
        ? await authAxios().get(endpoints["userCV"])
        : await API.get(endpoints["userCV"]);
      console.log(res.data); // In ra mảng cv sau khi cập nhật
      setCv(res.data);
      handleHideModal();
      alert("Delete succes");
    } catch (error) {
      console.error("Error updating is_deleted:", error);
    }
  };
  const yourAddCvFunction = async (newCvData) => {
    // Gọi API hoặc thực hiện thao tác thêm hồ sơ tại đây
    try {
      // Ví dụ: Gọi API thêm hồ sơ
      await authAxios().post(endpoints["createCV"], newCvData);

      // Sau khi thêm thành công, cập nhật danh sách hồ sơ
      const res = user
        ? await authAxios().get(endpoints["userCV"])
        : await API.get(endpoints["userCV"]);
      setCv(res.data);

      // Đóng modal "Thêm hồ sơ"
      handleHideAddCvModal();
    } catch (error) {
      console.error("Error adding CV:", error);
    }
  };

  if (user === null) return <Loading />;
  return (
    <div className="container my-2 cv-container">
      <h2 className="text-center text-info mt-3">List Curriculum_Vitae</h2>
      <hr />
      <Button
        variant="success"
        className="text-white"
        onClick={handleShowAddCvModal}
      >
        ADD NEW CV
      </Button>
      {cv?.map((c) => (
        <Row className="mt-3 shadow-lg bg-light rounded py-3 cv-section">
          <Col md={2} xs={12} key={c.id} className="cv-section">
            <img
              src={c.user.avatar_path}
              className="img-fluid"
              width={100}
              alt="Sample"
            />
          </Col>
          <Col md={8} xs={12} className="cv-section">
            <Card
              style={{ width: "100%", height: "auto", border: "0" }}
              bg="light"
            >
              <Card.Body>
                <Card.Text>CV {c.id}</Card.Text>
                <Card.Text>Skill: {c.skill}</Card.Text>
                <Card.Text>Infomation: {c.degree_detail}</Card.Text>
                <Card.Text>Foreign Language: {c.foreignLanguage}</Card.Text>
                <Card.Text>Degree:: {c.user.degree}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2} xs={12} className="cv-section">
            <button
              className="btn btn-dark mt-5"
              onClick={() => handleShowModal(c)}
            >
              CV DETAIL
            </button>
          </Col>
        </Row>
      ))}
      {showModal && (
        <CvModal
          cv={selectedCv}
          onDelete={() => updateCvIsDeleted(selectedCv.id)}
          onHide={handleHideModal}
          editedCv={editedCv}
          onInputChange={handleInputChange}
          onUpdate={updateCv}
        />
      )}
      {showAddCvModal && (
        <AddCvModal onHide={handleHideAddCvModal} onAddCv={yourAddCvFunction} />
      )}
    </div>
  );
}

const CvModal = ({
  cv,
  onDelete,
  onHide,
  editedCv,
  onInputChange,
  onUpdate,
}) => {
  return (
    <Modal show={true} onHide={onHide} className="cv-modal">
      <Modal.Header closeButton>
        <Modal.Title>CV DETAIL</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Form.Group>
          <Form.Label>FirstName:</Form.Label>
          <Form.Control
            type="text"
            value={cv.user.first_name}
            // onChange={(evt) => setFirstName(evt.target.value)}
          ></Form.Control>
        </Form.Group> */}
        <div>
          <p>
            <b>Name:</b> {cv.user.first_name} {cv.user.last_name}
          </p>
          <p>
            <b>Email:</b> {cv.user.email}
          </p>
          <p>
            <b>Birth:</b> {cv.user.dob}
          </p>
          <p>
            <b>Description:</b> {cv.user.description}
          </p>
          <p>
            <b>phone:</b> {cv.user.phone}
          </p>
          <p>
            <b>address: </b>
            {cv.user.address}
          </p>
          <p>
            <b>degree:</b> {cv.user.degree}
          </p>
        </div>

        <hr />
        <Form.Group>
          <Form.Label>Career goal:</Form.Label>
          <Form.Control
            type="text"
            value={editedCv.career_goals}
            onChange={(e) => onInputChange("career_goals", e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Experience::</Form.Label>
          <Form.Control
            type="text"
            value={editedCv.experience_detail}
            onChange={(e) => onInputChange("experience_detail", e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Skill:</Form.Label>
          <Form.Control
            type="text"
            value={editedCv.skill}
            onChange={(e) => onInputChange("skill", e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Link cv:</Form.Label>
          <Form.Control
            type="text"
            value={editedCv.cv_link}
            onChange={(e) => onInputChange("cv_link", e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Degree detail:</Form.Label>
          <Form.Control
            type="text"
            value={editedCv.degree_detail}
            onChange={(e) => onInputChange("degree_detail", e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Foreign Language:</Form.Label>
          <Form.Control
            type="text"
            value={editedCv.foreignLanguage}
            onChange={(e) => onInputChange("foreignLanguage", e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Thêm các thông tin khác của CV */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={() => onUpdate(cv.id, editedCv)}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AddCvModal = ({ onHide, onAddCv }) => {
  const [editedCv, setEditedCv] = useState({});

  const handleInputChange = (field, value) => {
    setEditedCv((prevCv) => ({
      ...prevCv,
      [field]: value,
    }));
  };

  const handleAddCv = () => {
    // Thực hiện thêm hồ sơ và gọi hàm onAddCv
    const newCvData = {
      // Dữ liệu mới của hồ sơ từ trường nhập liệu trong modal
      career_goals: editedCv.career_goals,
      experience_detail: editedCv.experience_detail,
      skill: editedCv.skill,
      degree_detail: editedCv.degree_detail,
      foreignLanguage: editedCv.foreignLanguage,
      cv_link: editedCv.cv_link,
    };

    onAddCv(newCvData);
  };

  return (
    <Modal show={true} onHide={onHide} className="add-cv-modal">
      <Modal.Header closeButton>
        <Modal.Title>ADD NEW CV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Thiết kế form để người dùng nhập liệu */}
        <Form.Group>
          <Form.Label>Career Goal:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={editedCv.career_goals}
            onChange={(e) => handleInputChange("career_goals", e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Experience Detail:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={editedCv.experience_detail}
            onChange={(e) =>
              handleInputChange("experience_detail", e.target.value)
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Skill:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={editedCv.skill}
            onChange={(e) => handleInputChange("skill", e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Link Cv:</Form.Label>
          <Form.Control
            type="text"
            value={editedCv.cv_link}
            onChange={(e) => handleInputChange("cv_link", e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Foreign Language:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={editedCv.foreignLanguage}
            onChange={(e) =>
              handleInputChange("foreignLanguage", e.target.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Degree Details:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={editedCv.degree_detail}
            onChange={(e) => handleInputChange("degree_detail", e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleAddCv}>
          Add CV
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
