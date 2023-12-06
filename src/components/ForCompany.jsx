import { useContext, useEffect, useState } from "react";
import API, { authAxios, endpoints } from "../configs/API";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
} from "react-bootstrap";
import { Link, NavLink, useParams } from "react-router-dom";
import { UserContext } from "../App";
import ReactStars from "react-rating-stars-component";
import { format } from "date-fns";
import Moment from "react-moment";

function ForCompany() {
  const addJob = () => {
    window.location.href = `/addjob`;
  };
  const [companyDetail, setCompanyDetail] = useState(null);
  const { companiesId } = useParams();
  const [user, dispatch] = useContext(UserContext);
  // const [jobCompany, setJobCompany] = useState(null);
  const [comment, setComment] = useState([]);
  // const [comments, setComments] = useState([]);

  const [commentCompany, setCommentCompany] = useState(null);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const res = user
          ? await authAxios().get(endpoints["user_company"])
          : await API.get(endpoints["user_company"]);

        setCompanyDetail(res.data);
        console.log(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    loadLesson();
  }, [companiesId, user]);

  // useEffect(() => {
  //   const loadJobCompany = async () => {
  //     try {
  //       const res = user
  //         ? await authAxios().get(endpoints["jobCompany"](companiesId))
  //         : await API.get(endpoints["jobCompany"](companiesId));

  //       setJobCompany(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loadJobCompany();
  // }, [companiesId, user]);
  console.log(companyDetail);
  return (
    <Container>
      <Button eventKey="link-event-key" onClick={addJob}>
        Thêm job
      </Button>

      <hr />
      <h2 className="text-center text-info mt-3">Job opportunities for you</h2>
      {/* Reload lại trang thì bị lỗi */}
    </Container>
  );
}

export default ForCompany;
