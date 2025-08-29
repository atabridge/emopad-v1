import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusinessPlan from "./components/BusinessPlan";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BusinessPlan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;