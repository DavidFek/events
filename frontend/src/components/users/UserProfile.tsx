import React, { useState, useEffect } from "react";
import { usersService } from "../../services/api";
import { UpdateUserDto } from "../../services/dto";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useUser } from "../../providers/UserProvider";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UpdateUserDto>({
    name: undefined,
    email: undefined,
    password: undefined,
    role: undefined,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userID = localStorage.getItem("userId");
      if (userID) {
        const userData = await usersService.findOne(+userID);
        setUser(userData.data);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userID = localStorage.getItem("userId");
    if (userID) {
      await usersService.update(+userID, user);
      if (user.role) {
        localStorage.setItem("role", user.role);
        setIsAdmin(user.role === "ADMIN");
      }
    }
    openModal();
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-500 p-6 rounded-lg shadow mb-5 max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Update profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          {isAdmin && (
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          )}
          <button type="submit" className="btn">
            Update Profile
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Profile Update Notification"
            ariaHideApp={false}
            className="absolute top-1/2 left-1/2 max-w-md w-full transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="flex justify-center">
              <h2 className="text-lg font-semibold text-black mb-4">
                Profile Updated
              </h2>
            </div>
            <div className="flex justify-center">
              <button className="btn" onClick={closeModal}>
                To the main page
              </button>
            </div>
          </Modal>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
