import React from "react";
import { User } from "../../interfaces/interfaces";
import { usersService } from "../../services/api";
import { Link } from "react-router-dom";
import deleteImage from "../../assets/delete.png";
import detailsImage from "../../assets/details.png";
import updateImage from "../../assets/update.png";

interface UserComponentProps {
  user: User;
  onDeleteSuccess: (userId: number) => void;
}

const UserComponent: React.FC<UserComponentProps> = ({
  user,
  onDeleteSuccess,
}) => {
  const { id, email, name, role } = user;

  async function deleteUser(id: number) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await usersService.delete(id);
        alert("User deleted successfully");
        onDeleteSuccess(id);
      } catch (error) {
        console.error("Failed to delete user", error);
        alert("Failed to delete user");
      }
    }
  }

  return (
    <div className="w-full mx-auto border border-gray-300 rounded-lg overflow-hidden p-4 mb-5 shadow-2xl bg-gray-800">
      <div className="md:flex">
        <div className="w-full p-4 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold underline text-center pb-8">
            {name}
          </h2>
          <p className="flex gap-4">
            <p className="underline">ID:</p> {id}
          </p>
          <p className="flex gap-4">
            <p className="underline">Email:</p> {email}
          </p>
          <p className="flex gap-4">
            <p className="underline">Name:</p> {name}
          </p>
          <p className="flex gap-4">
            <p className="underline">Role:</p> {role}
          </p>
          <div className="flex gap-4">
            <button
              className="btn"
              onClick={(e) => {
                deleteUser(id);
              }}
            >
              <div className="flex items-center space-x-2">
                <img src={deleteImage} alt="delete" className="w-6 h-6" />
                <span>Delete</span>
              </div>
            </button>
            <Link to={`/users/${id}`}>
              <button className="btn">
                <div className="flex items-center space-x-2">
                  <img src={detailsImage} alt="details" className="w-6 h-6" />
                  <span>Details</span>
                </div>
              </button>
            </Link>
            <Link to={`/users/update/${id}`}>
              <button className="btn">
                <div className="flex items-center space-x-2">
                  <img src={updateImage} alt="update" className="w-6 h-6" />
                  <span>Update</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
