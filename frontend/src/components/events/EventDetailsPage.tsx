import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventsService } from "../../services/api";
import { Event } from "../../interfaces/interfaces";

const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventDetails, setEventDetails] = useState<Event | null>(null);

  useEffect(() => {
    const id = Number(eventId);
    if (!isNaN(id)) {
      eventsService.findOne(id).then((response) => {
        const data: Event = response.data;
        setEventDetails(data);
      });
    }
  }, [eventId]);

  if (!eventDetails) return <div>Loading event details...</div>;

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto p-5 text-white">
      <h1 className="text-5xl font-bold text-white text-center">
        {eventDetails.name}
      </h1>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Date:</p>{" "}
        <span className="">
          {new Date(eventDetails.dateFrom).toLocaleDateString()}
        </span>{" "}
        -
        <span className="">
          {new Date(eventDetails.dateTo).toLocaleDateString()}
        </span>
      </p>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Description:</p> {eventDetails.description}
      </p>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Likes: </p>
        <span className="text-green-600">{eventDetails.likes}</span>
        <p className="underline">Dislikes:</p>{" "}
        <span className="text-red-600">{eventDetails.dislikes}</span>
      </p>
      <p className="mt-2 text-white flex gap-5 ">
        <p className="underline">Created by:</p>{" "}
        <span className="font-semibold">{eventDetails.createdBy}</span> on
        <span className="font-semibold">
          {new Date(eventDetails.createdTime).toLocaleDateString()}
        </span>
      </p>
      {}
      {eventDetails.authors && eventDetails.authors.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold text-white underline pb-5">
            Authors:
          </h3>
          <ul className="list-disc list-inside">
            {eventDetails.authors.map((author) => (
              <li key={author.id} className="text-white">
                {author.firstName + " " + author.lastName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
