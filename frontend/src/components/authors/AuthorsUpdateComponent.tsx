import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authorsService } from "../../services/api";

const AuthorsUpdateComponent = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const navigate = useNavigate();
  const [authorData, setAuthorData] = useState({
    firstName: "",
    lastName: "",
    specializations: "",
    description: "",
    borndate: "",
  });

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (authorId) {
        const data = await (await authorsService.findOne(+authorId)).data;
        setAuthorData({
          firstName: data.firstName,
          lastName: data.lastName,
          specializations: data.specializations,
          description: data.description,
          borndate: data.borndate,
        });
      }
    };
    fetchAuthorData();
  }, [authorId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAuthorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (authorId) await authorsService.update(+authorId, authorData);
      alert("Author updated successfully");
      navigate("/authors");
    } catch (error) {
      console.error("Failed to update author", error);
      alert("Failed to update author");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-500 p-6 rounded-lg mb-5 max-w-4xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Update Author</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={authorData.firstName}
              onChange={handleChange}
              placeholder="Author first Name"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={authorData.lastName}
              onChange={handleChange}
              placeholder="Author last Name"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Born Date:
            <input
              type="datetime-local"
              name="bornDate"
              value={authorData.borndate}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={authorData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Specializations:
            <input
              type="text"
              name="specializations"
              value={authorData.specializations}
              onChange={handleChange}
              placeholder="specializations"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <button type="submit" className="btn">
            Update Author
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthorsUpdateComponent;
