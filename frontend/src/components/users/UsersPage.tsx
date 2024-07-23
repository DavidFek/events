import React, { useEffect, useState } from "react";
import UserComponent from "./UserComponent";
import { usersService } from "../../services/api";
import { User } from "../../interfaces/interfaces";
import { CreateUserDto } from "../../services/dto";
import { authService } from "../../services/publicApiClient";
import addImage from "../../assets/add.png";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await usersService.findAll();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const onDeleteSuccess = (userId: number) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== Number(userId))
    );
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    const fullNameA = a.name;
    const fullNameB = b.name;
    if (sortOrder === "asc") {
      return fullNameA.localeCompare(fullNameB);
    } else {
      return fullNameB.localeCompare(fullNameA);
    }
  });

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Email is required.");
      return;
    }
    if (!fullName.trim()) {
      setError("Name is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError("Invalid email address");
      return;
    }

    const newUser: CreateUserDto = {
      email: username,
      password: password,
      name: fullName,
      role: role,
    };
    try {
      const response = await authService.createUser(newUser);
      await fetchUsers();

      if (response.status === 201) {
      } else {
        const data = response.data;

        setError(data.message || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Users Page</h2>
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
      <div className="bg-gray-500 p-6 rounded-lg shadow mb-5 shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Create user</h2>
        <form className="space-y-4" onSubmit={register}>
          <label>
            Email:
            <input
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Email..."
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Name:
            <input
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Name..."
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <select
            className="border border-gray-300 p-2 rounded-lg w-full"
            value={role}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "ADMIN" || value === "USER") {
                setRole(value);
              } else {
                console.error("Invalid role selected");
              }
            }}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
          <button className="btn" type="submit">
            <div className="flex items-center space-x-2">
              <img src={addImage} alt="update" className="w-6 h-6" />
              <span>Register</span>
            </div>
          </button>
          {error && <p className="text-red-600 text-2xl font-bold">{error}</p>}
        </form>
      </div>
      <div className="w-full ">
        {sortedUsers.map((user) => (
          <UserComponent
            key={user.id}
            user={user}
            onDeleteSuccess={onDeleteSuccess}
          />
        ))}
      </div>
    </div>
  );
}
