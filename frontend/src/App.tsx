import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage.tsx";
import MainPage from "./components/index.tsx";
import RegisterPage from "./components/auth/RegisterPage.tsx";
import Navbar from "./components/Navbar.tsx";
import EventsPage from "./components/events/EventsPage.tsx";
import AuthorsPage from "./components/authors/AuthorsPage.tsx";
import UsersPage from "./components/users/UsersPage.tsx";
import EventDetailsPage from "./components/events/EventDetailsPage.tsx";
import AuthorsDetailsPage from "./components/authors/AuthorsDetailsPage.tsx";
import UserDetailsPage from "./components/users/UserDetailsPage.tsx";
import EventUpdateComponent from "./components/events/EventUpdateComponent.tsx";
import UserUpdateComponent from "./components/users/UserUpdateComponent.tsx";
import AuthorsUpdateComponent from "./components/authors/AuthorsUpdateComponent.tsx";
import UserProfile from "./components/users/UserProfile.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const Layout = () => {
    const location = useLocation();
    const noNavbarRoutes = ["/login", "/register"];
    const showNavbar = !noNavbarRoutes.includes(location.pathname);

    return (
      <UserProvider>
        <div className="flex min-h-screen max-h-screen">
          {showNavbar && (
            <div className="min-w-[250px]">
              <Navbar />
            </div>
          )}
          <div className="flex-grow overflow-auto m-10">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:eventId" element={<EventDetailsPage />} />
              <Route
                path="/events/update/:eventId"
                element={<EventUpdateComponent />}
              />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route
                path="/authors/:authorId"
                element={<AuthorsDetailsPage />}
              />
              <Route
                path="/authors/update/:authorId"
                element={<AuthorsUpdateComponent />}
              />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:userId" element={<UserDetailsPage />} />
              <Route
                path="/users/update/:userId"
                element={<UserUpdateComponent />}
              />
              <Route
                path="/"
                element={
                  isAuthenticated ? <MainPage /> : <Navigate to="/login" />
                }
              />
              <Route path="/users/profile" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
