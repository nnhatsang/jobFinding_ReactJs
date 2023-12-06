import "./App.css";
import { createContext, useReducer } from "react";
import myReducer from "./reducers/MyReducer";
import cookies from "react-cookies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./components/Home";
import Footer from "./layout/Footer";
import Login from "./components/Login";
import Companies from "./components/Companies";
import Jobs from "./components/Jobs";
import JobDetail from "./components/JobDetail";
import CompanyDetail from "./components/CompanyDetail";
import Register from "./components/Register";
import ProfileUser from "./components/ProfileUser";
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import Fillter from "./components/Fillter";
import AddJob from "./components/AddJob";
import Employers from "./components/Employers";
import UserApplication from "./components/UserApplication";
import ApplicationDetail from "./components/ApplicationDetail";
import UserCv from "./components/UserCv";
import RegisCompany from "./components/RegisCompany";
import ForCompany from "./components/ForCompany";

export const UserContext = createContext();

function App() {
  const [user, dispatch] = useReducer(
    myReducer,
    cookies.load("current_user") || null
  );

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={[user, dispatch]}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/profileuser/" element={<ProfileUser />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:jobId" element={<JobDetail />} />
            <Route path="/companies/:companiesId" element={<CompanyDetail />} />
            <Route path="/blog/" element={<Blog />} />
            <Route path="/blogs/:blogId" element={<BlogDetail />} />
            <Route path="/fillter" element={<Fillter />} />
            <Route path="/addjob" element={<AddJob />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/applications" element={<UserApplication />} />
            <Route
              path="/applications/:applicationsId"
              element={<ApplicationDetail />}
            />
            <Route path="/userCv" element={<UserCv />} />
            <Route path="/register_Company/" element={<RegisCompany />} />
            <Route path="/ForCompany/" element={<ForCompany />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
