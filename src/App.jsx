import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <ListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <DetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;