import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import calendarImage from "../assets/calendar.png";
import userImage from "../assets/user.png";
import writerImage from "../assets/writer.png";
import editImage from "../assets/edit.png";
import mainPageImage from "../assets/mainpage.png";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  const { isAdmin } = useUser();

  return (
    <nav className="flex flex-col h-screen border-r-2 border-gray-600 w-64 bg-gray-900 shadow-2xl">
      <ul className="flex flex-col h-full">
        <li className="border-b-2 border-gray-600">
          <Link to="/" className="p-4 block hover:bg-gray-600">
            <div className="flex items-center space-x-2">
              {" "}
              <img src={mainPageImage} alt="calendar" className="w-6 h-6" />
              <span>Main Page</span>{" "}
            </div>
          </Link>
        </li>
        <li className="border-b-2 border-gray-600">
          <Link to="/events" className="p-4 block hover:bg-gray-600">
            <div className="flex items-center space-x-2">
              {" "}
              <img src={calendarImage} alt="calendar" className="w-6 h-6" />
              <span>Events</span>{" "}
            </div>
          </Link>
        </li>
        <li className="border-b-2 border-gray-600">
          <Link to="/authors" className="p-4 block hover:bg-gray-600">
            <div className="flex items-center space-x-2">
              <img src={writerImage} alt="author" className="w-6 h-6" />{" "}
              <span>Authors</span>{" "}
            </div>
          </Link>
        </li>
        <li className="border-b-2 border-gray-600">
          <Link to="/users/profile" className="p-4 block hover:bg-gray-600">
            <div className="flex items-center space-x-2">
              <img src={editImage} alt="edit" className="w-6 h-6" />{" "}
              <span>Edit Profile</span>{" "}
            </div>
          </Link>
        </li>
        {isAdmin && (
          <li className="border-b-2 border-gray-600">
            <Link to="/users" className="p-4 block hover:bg-gray-600">
              <div className="flex items-center space-x-2">
                <img src={userImage} alt="user" className="w-6 h-6" />{" "}
                <span>Users</span>{" "}
              </div>
            </Link>
          </li>
        )}
        <li className="mt-auto border-t-2 border-gray-600">
          <button
            onClick={handleLogout}
            className="p-4 w-full text-left hover:bg-gray-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
