import { useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Navbar,
  Row,
} from "react-bootstrap";
import { format } from "date-fns";
import { Link, useSearchParams } from "react-router-dom";

const Fillter = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [cities, setCities] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [s] = useSearchParams();

  const [error, setError] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await API.get(endpoints["cities"]);
        if (Array.isArray(response.data.results)) {
          setCities(response.data.results);
        } else {
          console.error("Dữ liệu từ API không phải là một mảng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    loadCities();
  }, []);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
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

  const handleSearch = async () => {
    setError("");
    if (
      !keyword &&
      !selectedCity &&
      !selectedCompany &&
      !minSalary &&
      !maxSalary
    ) {
      setError("Please enter or select some information!!!");
      return;
    }
    try {
      const filters = {};

      if (keyword !== "") {
        filters["q"] = keyword;
      }

      if (selectedCity !== "") {
        filters["city_name"] = selectedCity;
      }

      if (selectedCompany !== "") {
        filters["company_name"] = selectedCompany;
      }

      if (minSalary !== "") {
        filters["salary_from"] = minSalary;
      }

      if (maxSalary !== "") {
        filters["salary_to"] = maxSalary;
      }

      const response = await API.get(endpoints["jobs"], { params: filters });

      if (Array.isArray(response.data.results)) {
        setFilteredJobs(response.data.results);
      } else {
        console.error("Dữ liệu từ API không phải là một mảng");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  };

  const handleSortChange = (sortOption) => {
    if (sortOption === "sortSalary") {
      // Chuyển đổi giữa tăng dần và giảm dần
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    }

    // Cập nhật sắp xếp theo tùy chọn
    s.set("s", sortOption);
    // ... (cập nhật sắp xếp khác nếu có)

    // Nếu có thay đổi trong sắp xếp, refresh lại trang
    window.location.href = `/jobs?${s.toString()}`;
  };

  useEffect(() => {
    if (s.has("s")) {
      const sortOption = s.get("s");
      if (sortOption === "sortDate") {
        setFilteredJobs(
          [...filteredJobs].sort((a, b) => new Date(a.date) - new Date(b.date))
        );
      } else if (sortOption === "sortSalary") {
        setFilteredJobs(
          sortOrder === "asc"
            ? [...filteredJobs].sort((a, b) => a.salary - b.salary)
            : [...filteredJobs].sort((a, b) => b.salary - a.salary)
        );
      }
    }
  }, [s, sortOrder, filteredJobs]);
  //xử lí nút enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Gọi hàm thực hiện tìm kiếm khi nhấn phím Enter
      handleSearch();
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Navbar className="bg-body-tertiary justify-content-between m-2 p-4 rounded shadow-lg">
          <Form inline>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                style={{ width: "310px" }}
                placeholder="Company, job, description"
                aria-label="Keyword"
                aria-describedby="basic-addon1"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </InputGroup>
          </Form>
          <Form inline>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <i className="bi bi-geo-alt"></i>
              </InputGroup.Text>
              <Form.Select
                style={{ width: "200px" }}
                aria-label="City"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="" disabled>
                  Select location
                </option>
                {cities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form>
          <Form inline>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <i className="bi bi-building"></i>
              </InputGroup.Text>
              <Form.Select
                style={{ width: "200px" }}
                aria-label="Company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="" disabled>
                  Select Company
                </option>
                {companies.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form>
          <Form inline>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <i className="bi bi-cash-stack"></i>
              </InputGroup.Text>
              <Form.Control
                style={{ width: "110px" }}
                placeholder="Min Salary"
                aria-label="Min Salary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </InputGroup>
            <p></p>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <i className="bi bi-cash"></i>
              </InputGroup.Text>
              <Form.Control
                style={{ width: "110px" }}
                placeholder="Max Salary"
                aria-label="Max Salary"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
              />
            </InputGroup>
          </Form>
          <Form inline>
            <Col xs="auto">
              <Button className="bg-dark" type="button" onClick={handleSearch}>
                Search
              </Button>
            </Col>
            <hr />
            <Dropdown id="container-dropdown">
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Sắp xếp
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-childs">
                <Dropdown.Item href="/jobs?s=sortDate">
                  Ngày gần nhất
                </Dropdown.Item>
                <Dropdown.Item href="/jobs?s=sortInc">
                  Lương giảm dần
                </Dropdown.Item>
                <Dropdown.Item href="/jobs?s=sortDec">
                  Lương tăng dần
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar>

        <hr />
        {error && <div className="error-message">{error}</div>}
        <Row>
          {filteredJobs.map((c) => (
            <Col md={6} xs={12} key={c.id}>
              <Link className="nav-link mb-2" to={`/jobs/${c.id}`} href="#">
                <Card
                  style={{ width: "40rem", border: "2px solid red" }}
                  bg="light"
                >
                  <Card.Body>
                    <Card.Title>{c.company.name}</Card.Title>
                    <Card.Title>{c.name}</Card.Title>
                    <Card.Title>
                      End date: {format(new Date(c.end_date), "dd/MM/yyyy")}
                    </Card.Title>{" "}
                    <Card.Title>
                      <i className="bi bi-geo-alt-fill">{c.city}</i>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Fillter;
