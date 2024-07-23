import React, { useEffect, useState } from "react";
import { Event as EventType } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { eventsService } from "../../services/api";
import { useUser } from "../../providers/UserProvider";
import likeImage from "../../assets/like.png";
import dislikeImage from "../../assets/dislike.png";
import deleteImage from "../../assets/delete.png";
import detailsImage from "../../assets/details.png";
import updateImage from "../../assets/update.png";
import addImage from "../../assets/add.png";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>{event.name}</title>
        <meta name="description" content={event.description} />
        {/* Other relevant meta tags */}
      </Helmet>
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
                    <div className="flex items-center space-x-2">
                      <img src={deleteImage} alt="delete" className="w-6 h-6" />
                      <span>Remove</span>
                    </div>
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
              <button className="btn">
                <div className="flex items-center space-x-2">
                  <img src={detailsImage} alt="details" className="w-6 h-6" />
                  <span>Details</span>
                </div>
              </button>
            </Link>
            <button className="btn" onClick={handleLike}>
              <div className="flex items-center space-x-2">
                <img src={likeImage} alt="like" className="w-6 h-6" />
                <span>Like ({likes})</span>
              </div>
            </button>
            <button className="btn" onClick={handleDislike}>
              <div className="flex items-center space-x-2">
                <img src={dislikeImage} alt="dislike" className="w-6 h-6" />
                <span>Dislike ({dislikes})</span>
              </div>
            </button>
            {isAdmin && (
              <button className="btn" onClick={(e) => deleteEvent(id)}>
                <div className="flex items-center space-x-2">
                  <img src={deleteImage} alt="delete" className="w-6 h-6" />
                  <span>Delete</span>
                </div>
              </button>
            )}
            {isAdmin && (
              <Link to={`/events/update/${event.id}`}>
                <button className="btn">
                  <div className="flex items-center space-x-2">
                    <img src={updateImage} alt="update" className="w-6 h-6" />
                    <span>Update</span>
                  </div>
                </button>
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
                <div className="flex items-center space-x-2">
                  <img src={addImage} alt="update" className="w-6 h-6" />
                  <span>Add Author</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
