import "./App.css";

import Header from "./components/Header";
import ReportsList from "./components/ReportsList";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:commission" element={<ReportsList />} />
      </Routes>
    </>
  );
}

export default App;
