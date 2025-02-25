import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import Users from "./pages/Users";
import Products from "./pages/Products";

const App = () => {
  return (
    <Router>
      <SidebarLayout>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Navigate to="/users" replace />} />
        </Routes>
      </SidebarLayout>
    </Router>
  );
};

export default App;
