import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/list" element={<ListPage />} />

        <Route path="/details/:id" element={<DetailsPage />} />

        <Route path="/analytics" element={<AnalyticsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;