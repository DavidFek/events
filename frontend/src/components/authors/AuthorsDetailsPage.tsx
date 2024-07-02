import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authorsService } from "../../services/api";
import { Author } from "../../interfaces/interfaces";
const AuthorDetailsPage = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const [authorDetails, setAuthorDetails] = useState<Author | null>(null);

  useEffect(() => {
    const id = Number(authorId);
    if (!isNaN(id)) {
      authorsService.findOne(id).then((response) => {
        const data: Author = response.data;
        setAuthorDetails(data);
      });
    }
  }, [authorId]);

  if (!authorDetails) return <div>Loading author details...</div>;

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto p-5 text-white">
      <h1 className="text-5xl font-bold text-white text-center">
        {authorDetails.firstName} {authorDetails.lastName}
      </h1>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Description: </p>
        {authorDetails.description}
      </p>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Born Date:</p>{" "}
        {new Date(authorDetails.bornDate).toLocaleDateString()}
      </p>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Specializations: </p>
        {authorDetails.specializations}
      </p>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Created Time:</p>{" "}
        {new Date(authorDetails.createdTime).toLocaleDateString()}
      </p>
      {/* Display events if any */}
      {authorDetails.events && authorDetails.events.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold text-white underline pb-5">
            Events:
          </h3>
          <ul className="list-disc list-inside">
            {authorDetails.events.map((event) => (
              <li className="text-white" key={event.id}>
                {event.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthorDetailsPage;
