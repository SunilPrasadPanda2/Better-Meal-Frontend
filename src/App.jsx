import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/common/login";
import adminRoutes from "./routes/admin.routes";
import AdminLayout from "./layout/admin.layout";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserType } from "./store/authSlice";
import Users from "./pages/admin/users/users";
function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);
  console.log(isAuthenticated);
  return (
    <Router>
      <Routes>
        {/* Redirect to admin dashboard if authenticated */}
        {isAuthenticated ? (
          <Route
            path="/"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        ) : (
          // Display login page if not authenticated
          <>
            <Route path="/" element={<Login />} />
            <Route path="/admin/users" element={<Users />} />
          </>
        )}

        {/* Render admin routes */}
        {isAuthenticated && (
          <Route path="/admin/*" element={<AdminLayout />}>
            {adminRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Route>
        )}

        {/* Redirect all other routes to login page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
