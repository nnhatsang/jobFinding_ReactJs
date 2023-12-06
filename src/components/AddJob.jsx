import {
  memo,
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
  useEffect,
} from "react";
import moment from "moment";

import { Button, Container, Form, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import API, { authAxios, endpoints } from "../configs/API";
import Loading from "../layout/Loading";
import { DatePicker, Select, Switch } from "antd";
import { UserContext } from "../App";
import TextArea from "antd/es/input/TextArea";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Option } = Select;

const AddJob = () => {
  const [user, dispatch] = useContext(UserContext);
  const [cities, setcities] = useState([]);
  const [experienceRequired, setExperienceRequired] = useState(false);
  const [sexRequired, setSexRequired] = useState(false);
  const [jobRequired, setJobRequired] = useState("");

  const handleExperienceRequiredChange = (checked) => {
    setExperienceRequired(checked);
  };

  const handleSexRequiredChange = (checked) => {
    setSexRequired(checked);
  };
  const handleChangeJobRequired = (value) => {
    setJobRequired(value);
  };

  const [job, setJob] = useState({
    name: "",
    description: "",
    salary_from: "",
    salary_to: "",
    age_from: "",
    age_to: "",
    position: "",
    degree_required: "",
    end_date: moment(),
    city: "",
    job_required: "",
    type_job: "",
    experience_required: experienceRequired,
    sex_required: sexRequired,
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { companyId } = useParams();
  const nav = useNavigate();
  const job_type_choices = [
    ["full_time", "Full-Time"],
    ["part_time", "Part-Time"],
    ["internship", "Internship"],
    ["contract", "Contract"],
  ];
  const handleTypeJobChange = (event) => {
    const selectedValue = event.target.value;
    setJob({ ...job, type_job: selectedValue });
  };
  const handleCityChange = (value) => {
    setJob({ ...job, city: value });
  };
  const handleEndDateChange = (date) => {
    setJob({ ...job, end_date: date });
  };
  const handleChange = (value, fieldName) => {
    setJob((prevJob) => ({
      ...prevJob,
      [fieldName]: value,
    }));
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

  const addJob = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Make an API request to add the job using the job data
      const res = await authAxios().post(endpoints["addJob"], job);

      if (res.status === 201) {
        alert("Success")
        nav("/jobs");
      }
    } catch (ex) {
      // Handle API errors and set an error message
      let e = "";
      for (let d of Object.values(ex.response.data)) e += `${d} <br />`;
      setErr(e);
      // setErr(
      //   ex.response.data.error || "An error occurred while adding the job."
      // );
    } finally {
      setLoading(false);
    }
  };

  const setValue = (value, key) => {
    setJob({ ...job, [key]: value });
  };

  return (
    <>
      <Container className="w-75">
        <h1 className="text-center text-info mt-3">Add a Job</h1>
        {err ? (
          <div
            className="alert alert-danger"
            dangerouslySetInnerHTML={{ __html: err }}
          ></div>
        ) : (
          ""
        )}
        <Form onSubmit={addJob}>
          {/* Input fields for job details */}
          <InputItem
            label="Job Name"
            controlId="name"
            value={job.name}
            type="text"
            setValue={(e) => setValue(e.target.value, "name")}
          />
          <div>
            <p className="mb-2">Description</p>
            <ReactQuill
              value={job.description}
              onChange={(value) => handleChange(value, "description")}
            />
          </div>

          {/* <InputItem
            label="Description"
            controlId="description"
            value={job.description}
            type="text"
            setValue={(e) => setValue(e.target.value, "description")}
          /> */}
          <InputItem
            label="Salary from"
            controlId="salary_from"
            value={job.salary_from}
            type="number"
            setValue={(e) => setValue(e.target.value, "salary_from")}
          />
          <InputItem
            label="Salary to"
            controlId="salary_to"
            value={job.salary_to}
            type="number"
            setValue={(e) => setValue(e.target.value, "salary_to")}
          />

          <InputItem
            label="Age from"
            controlId="age_from"
            value={job.age_from}
            type="number"
            setValue={(e) => setValue(e.target.value, "age_from")}
          />
          <InputItem
            label="Age to"
            controlId="age_to"
            value={job.age_to}
            type="number"
            setValue={(e) => setValue(e.target.value, "age_to")}
          />
          <InputItem
            label="Quantity"
            controlId="quantity"
            value={job.quantity}
            type="number"
            setValue={(e) => setValue(e.target.value, "quantity")}
          />
          {/* <InputItem
            label="Degree required"
            controlId="quantity"
            value={job.degree_required}
            setValue={(e) => setValue(e.target.value, "degree_required")}
          /> */}
          <div>
            <p className="mb-2">Degree required</p>
            <ReactQuill
              value={job.degree_required}
              onChange={(value) => handleChange(value, "degree_required")}
            />
          </div>
          {/* <TextArea
            label="Job required"
            controlId="job_required"
            value={job.job_required}
            onChange={handleChange}
            setValue={(e) => setValue(e.target.value, "job_required")}
          /> */}

          <div>
            <p className="mb-2">Job Required</p>
            <ReactQuill
              value={job.job_required}
              onChange={(value) => handleChange(value, "job_required")}
            />
          </div>

          <p className="mb-2">End Date</p>
          <DatePicker
            className="mb-3"
            value={job.end_date}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15} // Adjust this value
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            onChange={handleEndDateChange}
          />
          <p className="mb-2">City</p>
          <Select
            value={job.city}
            className="mb-3"
            onChange={handleCityChange}
            allowClear={true} // Cho phép xóa lựa chọn thành phố
            style={{ width: "100%", height: "40px" }}
            placeholder="Select a city"
          >
            {cities.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>

          <InputItem
            label="Position"
            controlId="Position"
            value={job.position}
            type="text"
            setValue={(e) => setValue(e.target.value, "position")}
          />
          <p className="mb-2">Type job</p>
          <select
            value={job.type_job}
            onChange={handleTypeJobChange}
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "8px",
            }}
          >
            {job_type_choices.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <div>
            <p className="mb-2 mt-3">Experience Required:</p>
            <Switch
              checked={experienceRequired}
              onChange={handleExperienceRequiredChange}
            />
          </div>

          <div>
            <p className="mb-2">Sex Required:</p>
            <Switch checked={sexRequired} onChange={handleSexRequiredChange} />
          </div>

          {loading ? (
            <Loading />
          ) : (
            <Button type="submit" variant="primary" className="w-100 mt-3">
              Add Job
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
};

// InputItem is a memoized functional component for rendering input fields
const InputItem = memo(({ label, value, setValue, controlId, type }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          value={value}
          onChange={setValue}
          placeholder={label}
        />
      </Form.Group>
    </>
  );
});

export default AddJob;
