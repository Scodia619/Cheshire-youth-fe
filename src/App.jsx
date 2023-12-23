import "./App.css";

import Header from "./components/Header";
import ReportsList from "./components/ReportsList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import PostReport from "./components/postReport";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:commission" element={<PostReport />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/admin" element={<AdminPanel />}/>
        <Route path="/admin/:commission" element={<ReportsList />} />
      </Routes>
    </>
  );
}

export default App;
