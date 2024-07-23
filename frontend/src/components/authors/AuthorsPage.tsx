import React, { useEffect, useState } from "react";
import AuthorComponent from "./AuthorsComponent";
import { authorsService } from "../../services/api";
import { Author } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { CreateAuthorDto } from "../../services/dto";
import { formatISO } from "date-fns";
import { useUser } from "../../providers/UserProvider";
import addImage from "../../assets/add.png";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [specializations, setSpecializations] = useState("");
  const { isAdmin } = useUser();

  const fetchAuthors = async () => {
    try {
      const response = await authorsService.findAll();
      setAuthors(response.data);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const filteredAuthors = authors.filter((author) =>
    (author.firstName + " " + author.lastName)
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  // const isAdmin = localStorage.getItem("role") === "ADMIN";

  const onEventChange = () => {
    fetchAuthors();
  };

  const onDeleteSuccess = (authorId: number) => {
    setAuthors((currentAuthors) =>
      currentAuthors.filter((author) => author.id !== Number(authorId))
    );
  };

  const sortedAuthors = filteredAuthors.sort((a, b) => {
    const fullNameA = a.firstName + " " + a.lastName;
    const fullNameB = b.firstName + " " + b.lastName;
    if (sortOrder === "asc") {
      return fullNameA.localeCompare(fullNameB);
    } else {
      return fullNameB.localeCompare(fullNameA);
    }
  });

  const createAuthor = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!firstName.trim()) {
      setError("First Name is required.");
      return;
    }
    if (!lastName.trim()) {
      setError("Last Name is required.");
      return;
    }
    if (!bornDate.trim()) {
      setError("Born Date is required.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!specializations.trim()) {
      setError("Specializations is required.");
      return;
    }

    const formattedBornDate = formatISO(new Date(bornDate));

    const newAuthor: CreateAuthorDto = {
      firstName,
      lastName,
      bornDate: formattedBornDate,
      specializations,
      description,
    };

    try {
      const response = await authorsService.create(newAuthor);
      await fetchAuthors();
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
      <h2 className="text-2xl font-bold mb-4">Authors Page</h2>
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
          <h2 className="text-xl font-semibold mb-4">Create Author</h2>
          <form onSubmit={createAuthor} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <input
              type="datetime-local"
              placeholder="Born Date"
              value={bornDate}
              onChange={(e) => setBornDate(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Specializations"
              value={specializations}
              onChange={(e) => setSpecializations(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <button type="submit" className="btn">
              <div className="flex items-center space-x-2">
                <img src={addImage} alt="update" className="w-6 h-6" />
                <span>Create Author</span>
              </div>
            </button>
          </form>
          {error && <p className="text-red-600 text-2xl font-bold">{error}</p>}
        </div>
      )}
      <div className="w-full ">
        {sortedAuthors.map((author) => (
          <AuthorComponent
            key={author.id}
            author={author}
            onDeleteSuccess={onDeleteSuccess}
            onEventChange={onEventChange}
          />
        ))}
      </div>
    </div>
  );
}
