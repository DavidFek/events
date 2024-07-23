import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { eventsService } from "../../services/api";
import updateImage from "../../assets/update.png";

const EventUpdateComponent = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    dateFrom: "",
    dateTo: "",
    description: "",
    createdBy: "",
  });

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        const data = await (await eventsService.findOne(+eventId)).data;
        setEventData({
          name: data.name,
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          description: data.description,
          createdBy: data.createdBy,
        });
      }
    };
    fetchEventData();
  }, [eventId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (eventId) await eventsService.update(+eventId, eventData);
      alert("Event updated successfully");
      navigate("/events");
    } catch (error) {
      console.error("Failed to update event", error);
      alert("Failed to update event");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-500 p-6 rounded-lg mb-5 max-w-4xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Update Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              placeholder="Event Name"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Date From:
            <input
              type="datetime-local"
              name="dateFrom"
              value={eventData.dateFrom}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Date To:
            <input
              type="datetime-local"
              name="dateTo"
              value={eventData.dateTo}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Created By:
            <input
              type="text"
              name="createdBy"
              value={eventData.createdBy}
              onChange={handleChange}
              placeholder="Created By"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </label>
          <button type="submit" className="btn">
            <div className="flex items-center space-x-2">
              <img src={updateImage} alt="update" className="w-6 h-6" />
              <span>Update Event</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventUpdateComponent;
