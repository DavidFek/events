import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usersService } from "../../services/api";
import { useUser } from "../../providers/UserProvider";

const UserUpdateComponent = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { setIsAdmin } = useUser();
  const [userData, setUserData] = useState<{
    email: string;
    name: string;
    role: "ADMIN" | "USER" | undefined;
  }>({
    email: "",
    name: "",
    role: undefined,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const data = await (await usersService.findOne(+userId)).data;
        setUserData({
          email: data.email,
          name: data.name,
          role: data.role,
        });
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (userId) {
        await usersService.update(+userId, userData);
      }
      const currentUserId = localStorage.getItem("userId");
      if (currentUserId && userId) {
        if (+currentUserId === +userId) {
          if (userData.role) {
            localStorage.setItem("role", userData.role);
            setIsAdmin(userData.role === "ADMIN");
          }
        }
      }

      alert("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Failed to update user", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-500 p-6 rounded-lg shadow mb-5 max-w-4xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Update User</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="User email"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="User name"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg w-full"
          >
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
          <button type="submit" className="btn">
            Update user
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateComponent;
