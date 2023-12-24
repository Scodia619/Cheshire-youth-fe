import "./App.css";

import Header from "./components/Header";
import ReportsList from "./components/ReportsList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import PostReport from "./components/postReport";
import ViewReports from "./components/ViewReports";

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
        <Route path='/admin/reports/' element={<ViewReports />}/>
        <Route path="/admin/reports/:commission" element={<ReportsList />} />
      </Routes>
    </>
  );
}

export default App;
