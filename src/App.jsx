import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import EmployeeDashboard from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";

function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/employees" element={<EmployeeDashboard />} />

        <Route path="/employee/:id" element={<DetailsPage />} />

      </Routes>

    </Router>

  );

}

export default App;