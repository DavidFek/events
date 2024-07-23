import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usersService } from "../../services/api";
import { User } from "../../interfaces/interfaces";

const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userDetails, setUserDetails] = useState<Omit<User, "password"> | null>(
    null
  );

  useEffect(() => {
    const id = Number(userId);
    if (!isNaN(id)) {
      usersService.findOne(id).then((response) => {
        const { password, ...dataWithoutPassword } = response.data;
        setUserDetails(dataWithoutPassword);
      });
    }
  }, [userId]);

  if (!userDetails) return <div>Loading user details...</div>;

  return (
    <div className="flex flex-col w-1/2 gap-4 max-w-4xl mx-auto p-5 text-white border rounded-lg border-gray-300 shadow-2xl bg-gray-800 pb-10">
      <h1 className="text-5xl font-bold text-white text-center">
        {userDetails.name}
      </h1>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">ID:</p> {userDetails.id}
      </p>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Email:</p> {userDetails.email}
      </p>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Role:</p> {userDetails.role}
      </p>
    </div>
  );
};

export default UserDetailsPage;
