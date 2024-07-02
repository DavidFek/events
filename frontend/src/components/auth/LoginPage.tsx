import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
// import { useRouter } from "next/router";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center align-middle text-center items-center justify-self-center h-screen gap-8 p-4">
      <h1 className="font-bold text-4xl pb-6">Login</h1>
      <LoginForm />
      <button className="btn" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
}
