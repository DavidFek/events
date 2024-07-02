import React, { useEffect, useState } from "react";
import { Event as EventType } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { eventsService } from "../../services/api";
import { useUser } from "../../providers/UserProvider";

interface EventComponentProps {
  event: EventType;
  onDeleteSuccess: (eventId: number) => void;
  onAuthorChange: () => void;
}

const EventComponent: React.FC<EventComponentProps> = ({
  event,
  onDeleteSuccess,
  onAuthorChange,
}) => {
  const {
    id,
    name,
    dateFrom,
    dateTo,
    description,
    createdBy,
    createdTime,
    authors = [],
  } = event;

  const dateFromDateObject = new Date(dateFrom);
  const dateToDateObject = new Date(dateTo);
  const createdTimeDateObject = new Date(createdTime);
  const [likes, setLikes] = useState(event.likes || 0);
  const [dislikes, setDislikes] = useState(event.dislikes || 0);
  const [authorId, setAuthorId] = useState("");
  const { isAdmin } = useUser();

  async function deleteEvent(id: number) {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await eventsService.delete(id);
        alert("Event deleted successfully");
        onDeleteSuccess(id);
      } catch (error) {
        console.error("Failed to delete event", error);
        alert("Failed to delete event");
      }
    }
  }

  const handleLike = () => {
    eventsService.likeEvent(event.id).then(() => {
      setLikes(likes + 1);
    });
  };

  const handleDislike = () => {
    eventsService.dislikeEvent(event.id).then(() => {
      setDislikes(dislikes + 1);
    });
  };
  // const isAdmin = localStorage.getItem("role") === "ADMIN";

  const addAuthor = async (authorId: number) => {
    try {
      await eventsService.addAuthor(event.id, authorId);
      alert("Author added successfully");
      onAuthorChange();
      setAuthorId("");
    } catch (error) {
      console.error("Failed to add author", error);
      alert("Failed to add author");
    }
  };

  const removeAuthor = async (authorId: number) => {
    if (window.confirm("Are you sure you want to remove this author?")) {
      try {
        await eventsService.removeAuthor(event.id, authorId);
        alert("Author removed successfully");
        onAuthorChange();
      } catch (error) {
        console.error("Failed to remove author", error);
        alert("Failed to remove author");
      }
    }
  };

  return (
    <div className="w-full mx-auto border border-gray-300 rounded-lg overflow-hidden p-4 mb-5">
      <div className="md:flex">
        <div className="w-full p-4 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold underline text-center pb-8">
            {name}
          </h2>
          {isAdmin && (
            <p className="flex gap-4">
              <p className="underline">ID:</p> {id}
            </p>
          )}
          <p className="flex gap-4">
            <p className="underline"> Date: </p>{" "}
            {dateFromDateObject.toLocaleDateString()} -{" "}
            {dateToDateObject.toLocaleDateString()}
          </p>
          <p className="flex gap-4">
            {" "}
            <p className="underline">Description: </p> {description}
          </p>
          <p>
            <p className="underline"> Authors:</p>{" "}
            {authors.map((author) => (
              <div
                key={author.id}
                className="flex justify-between items-center"
              >
                <p>
                  {author.firstName} {author.lastName}
                </p>
                {isAdmin && (
                  <button
                    className="btn"
                    onClick={() => removeAuthor(author.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </p>
          <p className="flex gap-4">
            <p className="underline">Created by: </p>
            {createdBy} on {createdTimeDateObject.toLocaleDateString()}
          </p>
          <p className="flex gap-4">
            <p className="underline">Likes:</p>{" "}
            <p className="text-green-600">{likes}</p>{" "}
            <p className="underline">Dislikes:</p>{" "}
            <p className="text-red-600">{dislikes}</p>
          </p>
          <div className="flex gap-4">
            <Link to={`/events/${event.id}`} key={event.id}>
              <button className="btn">Details</button>
            </Link>
            <button className="btn" onClick={handleLike}>
              Like ({likes})
            </button>
            <button className="btn" onClick={handleDislike}>
              Dislike ({dislikes})
            </button>
            {isAdmin && (
              <button className="btn" onClick={(e) => deleteEvent(id)}>
                Delete
              </button>
            )}
            {isAdmin && (
              <Link to={`/events/update/${event.id}`}>
                <button className="btn">Update</button>
              </Link>
            )}
          </div>
          {isAdmin && (
            <div className="flex gap-5">
              <input
                className="border border-gray-300 rounded-lg h-15 px-3"
                type="text"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                placeholder="Author ID"
              />
              <button className="btn" onClick={(e) => addAuthor(+authorId)}>
                Add Author
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
