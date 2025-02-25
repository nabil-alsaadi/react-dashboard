import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          <Route path="/" element={<Users />} /> {/* Default page */}
        </Routes>
      </SidebarLayout>
    </Router>
  );
};

export default App;
