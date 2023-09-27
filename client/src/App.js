import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import AddEdit from "./components/AddEdit";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pin/:noteId" element={<Home />} />
          <Route exact path="/addNotes" element={<AddEdit />} />
          <Route exact path="/update/:noteId" element={<AddEdit />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
