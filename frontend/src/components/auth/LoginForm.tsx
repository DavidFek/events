import { useState } from "react";
import { authService } from "../../services/publicApiClient";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setIsAdmin } = useUser();

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const credentials = { email: username, password: password };
      const response = await authService.login(credentials);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId);
        setIsAdmin(response.data.role === "ADMIN");

        navigate("/");
      } else {
        setErrorMessage("Login successful but no token received.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login.");
    }
  };

  return (
    <>
      <form
        className="flex basis-1 justify-center align-middle gap-4"
        onSubmit={login}
      >
        <input
          className="p-2 rounded"
          type="text"
          value={username}
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="p-2 rounded"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" type="submit">
          Login
        </button>
      </form>
      {errorMessage && (
        <p className="font-bold text-xl text-red-500">Wrong credentials</p>
      )}
    </>
  );
}
