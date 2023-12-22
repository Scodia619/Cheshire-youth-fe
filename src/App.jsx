import "./App.css";

import Header from "./components/Header";
import ReportsList from "./components/ReportsList";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:commission" element={<ReportsList />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/admin" element={<AdminPanel />}/>
        <Route path="/admin/:commission" element={<ReportsList />} />
      </Routes>
    </>
  );
}

export default App;
