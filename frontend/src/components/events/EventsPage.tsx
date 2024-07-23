import React, { useEffect, useState } from "react";
import EventComponent from "./EventComponent";
import { eventsService } from "../../services/api";
import { Event as EventType } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { CreateEventDto } from "../../services/dto";
import { formatISO } from "date-fns";
import { useUser } from "../../providers/UserProvider";
import addImage from "../../assets/add.png";
import { Helmet } from "react-helmet";

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [name, setName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");
  const { isAdmin } = useUser();

  const fetchEvents = async () => {
    try {
      const response = await eventsService.findAll();
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  // const isAdmin = localStorage.getItem("role") === "ADMIN";

  const sortedEvents = filteredEvents.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const onAuthorChange = () => {
    fetchEvents();
  };

  const onDeleteSuccess = (eventId: number) => {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== Number(eventId))
    );
  };

  const createEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    // Check for missing fields
    if (!name.trim()) {
      setError("Event Name is required.");
      return;
    }
    if (!dateFrom.trim()) {
      setError("Start Date is required.");
      return;
    }
    if (!dateTo.trim()) {
      setError("End Date is required.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!createdBy.trim()) {
      setError("Created By is required.");
      return;
    }

    const formattedDateFrom = formatISO(new Date(dateFrom));
    const formattedDateTo = formatISO(new Date(dateTo));

    const newEvent: CreateEventDto = {
      name,
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
      description,
      createdBy,
    };

    try {
      const response = await eventsService.create(newEvent);
      await fetchEvents();
      if (response.status === 201) {
      } else {
        const data = response.data;
        setError(data.message || "An error occurred during event creation.");
      }
    } catch (error) {
      console.error("Event creation error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Helmet>
        <title>Events Page - Your Site Name</title>
        <meta
          name="description"
          content="Explore our upcoming events and join us to connect, learn, and grow."
        />
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Events Page</h2>
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg flex-1"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {isAdmin && (
        <div className="bg-gray-500 p-6 rounded-lg shadow mb-5">
          <h2 className="text-xl font-semibold mb-4">Create Event</h2>
          <form onSubmit={createEvent} className="space-y-4">
            <input
              type="text"
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <input
              type="datetime-local"
              placeholder="Start Date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <input
              type="datetime-local"
              placeholder="End Date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <textarea
              placeholder="Created By"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <button type="submit" className="btn">
              <div className="flex items-center space-x-2">
                <img src={addImage} alt="update" className="w-6 h-6" />
                <span>Create Event</span>
              </div>
            </button>
          </form>
          {error && <p className="text-red-600 text-2xl font-bold">{error}</p>}
        </div>
      )}
      <div className="w-full ">
        {sortedEvents.map((event) => (
          <EventComponent
            key={event.id}
            event={event}
            onDeleteSuccess={onDeleteSuccess}
            onAuthorChange={onAuthorChange}
          />
        ))}
      </div>
    </div>
  );
}
