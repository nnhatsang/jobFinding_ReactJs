import React, { useState, memo, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import API, { endpoints } from "../configs/API";
import ReactQuill from "react-quill";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

export default function RegisCompany() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    email_company: "",
    degree: "",
    gender: "",
    phone: "",
    description: "", // Provide a default value for description
    company_description: "", // Provide a default value for description
    address: "", // Provide a default value for address
    city: null,
    city_company: null,
    company_address: "",
    gender: "male",
    // ... (Thêm các trường dữ liệu khác)
  });

  const degreeOptions = [
    { value: "DaiHoc", label: "Đại học" },
    { value: "CaoDang", label: "Cao đẳng" },
    { value: "ThacSi", label: "Thạc sĩ" },
    { value: "TieuHoc", label: "Tiểu học" },
    { value: "TrungHoc", label: "Trung học" },
    { value: "PhoThong", label: "Phổ thông" },
  ];

  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cities, setcities] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCityChange = (value) => {
    console.log("Selected City:", value);
    setUser({ ...user, city: value, city_company: value });
  };

  useEffect(() => {
    const loadcities = async () => {
      try {
        // Gửi yêu cầu GET đến Django API để lấy danh sách công ty
        const response = await API.get(endpoints["cities"]);

        if (Array.isArray(response.data.results)) {
          setcities(response.data.results);
        } else {
          console.error("Dữ liệu từ API không phải là một mảng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    loadcities();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra validation cho các trường dữ liệu còn lại
    if (
      user.name === "" ||
      user.email === "" ||
      user.email_company === "" ||
      user.password === "" ||
      user.confirmPassword === "" ||
      user.username === "" ||
      user.city === null // Add a check for the city field
      // ... (Thêm các điều kiện kiểm tra khác nếu cần)
      // ... (Thêm các điều kiện kiểm tra khác nếu cần)
    ) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    if (user.password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        formData.append(key, value);
      });

      //   const res = await API.post(endpoints["regisCompany"], user, {
      //     headers: {
      //       "Content-Type": "multiple/form-data",
      //     },
      //   });

      const res = await API.post(endpoints["regisCompany"], formData);

      if (res.status === 201) {
        console.log("Company created successfully");
        alert("Company created successfully");
        window.location.href = `/`;
        // Thực hiện chuyển hướng hoặc hiển thị thông báo thành công
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Xử lý lỗi
      //   setError("Đăng ký thất bại. Vui lòng kiểm tra thông tin và thử lại.");
      let e = "";
      for (let d of Object.values(error.response.data)) e += `${d}<br/>`;
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="w-50">
      <h1 className="my-3 text-center">Đăng ký doanh nghiệp</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit}>
        {/* ... (Các trường input khác) */}
        <InputItem
          label="Tên đăng nhập"
          controlId="username"
          type="text"
          value={user.username}
          handleChange={handleChange}
        />
        <InputItem
          label="Mật khẩu"
          controlId="password"
          type="password"
          value={user.password}
          handleChange={handleChange}
        />
        <InputItem
          label="Xác nhận mật khẩu"
          controlId="confirmPassword"
          type="password"
          value={user.confirmPassword}
          handleChange={handleChange}
        />
        <InputItem
          label="Họ và tên"
          controlId="name"
          type="text"
          value={user.name}
          handleChange={handleChange}
        />
        <InputItem
          label="Email"
          controlId="email"
          type="email"
          value={user.email}
          handleChange={handleChange}
        />
        <InputItem
          label="Email công ty"
          controlId="email_company"
          type="email"
          value={user.email_company}
          handleChange={handleChange}
        />
        {/* ... (Thêm các trường input khác) */}
        <InputItemSelect
          label="Trình độ"
          controlId="degree"
          type="select" // Đặt kiểu là "select" để hiển thị trường chọn
          value={user.degree}
          handleChange={handleChange}
          options={degreeOptions}
        />

        <InputItem
          label="Địa chỉ người dùng"
          controlId="address"
          type="text"
          value={user.address}
          handleChange={handleChange}
        />
        <InputItem
          label="Địa chỉ công ty"
          controlId="company_address"
          type="text"
          value={user.company_address}
          handleChange={handleChange}
        />

        <InputItem
          label="Số điện thoại"
          controlId="phone"
          type="text"
          value={user.phone}
          handleChange={handleChange}
        />

        <Select
          value={user.city}
          className="mb-3"
          onChange={(value) => handleCityChange(value)} // Update the onChange handler
          allowClear={true}
          style={{ width: "100%", height: "40px" }}
          placeholder="Select a city"
        >
          {cities.map((city) => (
            <Option key={city.id} value={city.id}>
              {city.name}
            </Option>
          ))}
        </Select>
        <Select
          value={user.city_company}
          className="mb-3"
          onChange={(value) => handleCityChange(value)} // Update the onChange handler
          allowClear={true}
          style={{ width: "100%", height: "40px" }}
          placeholder="Select a city company"
        >
          {cities.map((city) => (
            <Option key={city.id} value={city.id}>
              {city.name}
            </Option>
          ))}
        </Select>

        <InputItemSelect
          label="Giới tính"
          controlId="gender"
          type="select" // Đặt kiểu là "select" để hiển thị trường chọn
          value={user.gender}
          handleChange={handleChange}
          options={gender}
        />
        <InputItem
          label="Mô tả bản thân"
          controlId="description"
          type="textarea"
          value={user.description}
          handleChange={handleChange}
        />
        <InputItem
          label="Mô tả công ty"
          controlId="company_description"
          type="textarea"
          value={user.company_description}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </Form>
    </Container>
  );
}

const InputItem = memo(({ label, controlId, type, value, handleChange }) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      {type === "textarea" ? (
        <Form.Control
          as="textarea"
          rows={5}
          value={value}
          onChange={handleChange}
          name={controlId}
          placeholder={label}
        />
      ) : (
        <Form.Control
          type={type}
          value={value}
          onChange={handleChange}
          name={controlId}
          placeholder={label}
        />
      )}
    </Form.Group>
  );
});

// InputItem component
const InputItemSelect = memo(
  ({ label, controlId, type, value, handleChange, options }) => {
    return (
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        {type === "select" ? (
          <Form.Control
            as="select"
            value={value}
            onChange={handleChange}
            name={controlId}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        ) : (
          <Form.Control
            type={type}
            value={value}
            onChange={handleChange}
            name={controlId}
            placeholder={label}
          />
        )}
      </Form.Group>
    );
  }
);
