import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import EmployeeDashboard from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/employees" element={<EmployeeDashboard />} />

        <Route path="/employee/:id" element={<DetailsPage />} />

        <Route path="/analytics" element={<AnalyticsPage />} />

      </Routes>

    </Router>

  );

}

export default App;