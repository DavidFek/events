import React, { useState } from "react";
import { Event as EventType, Author } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { authorsService } from "../../services/api";
import { useUser } from "../../providers/UserProvider";
import deleteImage from "../../assets/delete.png";
import detailsImage from "../../assets/details.png";
import updateImage from "../../assets/update.png";
import addImage from "../../assets/add.png";

interface AuthorComponentProps {
  author: Author;
  onDeleteSuccess: (authorId: number) => void;
  onEventChange: () => void;
}

const AuthorComponent: React.FC<AuthorComponentProps> = ({
  author,
  onDeleteSuccess,
  onEventChange,
}) => {
  const {
    id,
    firstName,
    lastName,
    description,
    bornDate,
    specializations,
    createdTime,
    events = [],
  } = author;

  async function deleteAuthor(id: number) {
    if (window.confirm("Are you sure you want to delete this author?")) {
      try {
        await authorsService.delete(id);
        alert("Author deleted successfully");
        onDeleteSuccess(id);
      } catch (error) {
        console.error("Failed to delete author", error);
        alert("Failed to delete author");
      }
    }
  }

  const bornDateObject = new Date(bornDate);
  const createdTimeDateObject = new Date(createdTime);
  const [eventId, setEventId] = useState("");
  const { isAdmin } = useUser();
  // const isAdmin = localStorage.getItem("role") === "ADMIN";

  const addEvent = async (eventId: number) => {
    try {
      await authorsService.addEvent(author.id, eventId);
      alert("Event added successfully");
      onEventChange();
      setEventId("");
    } catch (error) {
      console.error("Failed to add event", error);
      alert("Failed to add event");
    }
  };

  const removeEvent = async (eventId: number) => {
    if (window.confirm("Are you sure you want to remove this event?")) {
      try {
        await authorsService.removeEvent(author.id, eventId);
        alert("Event removed successfully");
        onEventChange();
      } catch (error) {
        console.error("Failed to remove event", error);
        alert("Failed to remove event");
      }
    }
  };

  return (
    <div className="w-full mx-auto border border-gray-300 rounded-lg overflow-hidden p-4 mb-5">
      <div className="md:flex">
        <div className="w-full p-4 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold underline text-center pb-8">
            {firstName} {lastName}
          </h2>
          {isAdmin && (
            <p className="flex gap-4">
              <p className="underline">ID:</p> {id}
            </p>
          )}
          <p className="flex gap-4">
            <p className="underline">Description:</p> {description}
          </p>
          <p className="flex gap-4">
            <p className="underline"> Born:</p>{" "}
            {bornDateObject.toLocaleDateString()}
          </p>
          <p className="flex gap-4">
            <p className="underline">Specializations:</p> {specializations}
          </p>
          <p className="flex gap-4">
            <p className="underline">Created:</p>{" "}
            {createdTimeDateObject.toLocaleDateString()}
          </p>
          <p>
            <p className="underline">Events:</p>
            {author.events.map((event) => (
              <div key={event.id} className="flex justify-between items-center">
                <p>{event.name}</p>
                {isAdmin && (
                  <button className="btn" onClick={() => removeEvent(event.id)}>
                    <div className="flex items-center space-x-2">
                      <img src={deleteImage} alt="delete" className="w-6 h-6" />
                      <span>Remove</span>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </p>
          <div className="flex gap-4">
            <Link to={`/authors/${author.id}`} key={author.id}>
              <button className="btn">
                <div className="flex items-center space-x-2">
                  <img src={detailsImage} alt="details" className="w-6 h-6" />
                  <span>Details</span>
                </div>
              </button>
            </Link>
            {isAdmin && (
              <button className="btn" onClick={(e) => deleteAuthor(id)}>
                <div className="flex items-center space-x-2">
                  <img src={deleteImage} alt="delete" className="w-6 h-6" />
                  <span>Delete</span>
                </div>
              </button>
            )}
            {isAdmin && (
              <Link to={`/authors/update/${author.id}`}>
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
                type="text"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                placeholder="Event ID"
                className="border border-gray-300 rounded-lg h-15 px-3"
              />
              <button className="btn" onClick={(e) => addEvent(+eventId)}>
                <div className="flex items-center space-x-2">
                  <img src={addImage} alt="update" className="w-6 h-6" />
                  <span>Add Event</span>
                </div>
              </button>
              {}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorComponent;
