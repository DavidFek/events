import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/publicApiClient";
import { CreateUserDto } from "../../services/dto";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  // const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError("Invalid email address");
      return;
    }

    const newUser: CreateUserDto = {
      email: username,
      password: password,
      name: fullName,
      role: "USER",
    };
    try {
      const response = await authService.createUser(newUser);
      console.log(response.status);
      if (response.status === 201) {
        navigate("/login");
      } else {
        // Assuming the response includes a JSON body with a message field
        const data = response.data;
        setError(data.message || "An error occurred during registration.");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Registration error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <form
        className="flex basis-1 justify-center align-middle gap-4"
        onSubmit={register}
      >
        <input
          className="p-2 rounded"
          placeholder="Email..."
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="p-2 rounded"
          placeholder="Name..."
          type="text"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <select
          className="p-2 rounded"
          value={role}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "ADMIN" || value === "USER") {
              setRole(value);
            } else {
              // Handle unexpected value or ignore
              console.error("Invalid role selected");
            }
          }}
          required
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select> */}
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      {error && <p className="font-bold text-xl text-red-600">{error}</p>}
    </>
  );
}
