import Signin from "./components/Signin";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import List from "./components/List";
import Create from "./components/Create";
import Response from "./components/Response";
import Submit from "./components/Submit";
import Home from "./components/Home";
import "./App.css";
import UserStaticalPage from "./components/UserStaticalPage";
import User from "./components/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetSurvey from "./components/GetSurvey";
import AdminHome from "./components/AdminHome";


// import GetResponse from "./components/GetResponse";


function App() {
  return (
    <>
      <Navbar/>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/signup" element={<Signin/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/Admin" element={<Admin/>} />
          <Route exact path="/create" element={<Create/>} />
          <Route exact path="/list" element={<List/>} />
          <Route exact path="/User" element={<User/>} />
          <Route exact path="/survey/:new" element={<GetSurvey/>} />
          <Route exact path="/response/:name" element={<Response />} />
          <Route exact path="/submit" element={<Submit/>} />
          <Route exact path="/userlist/:name" element={<UserList/>} />
          <Route exact path="/Admin" element={<AdminHome/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
