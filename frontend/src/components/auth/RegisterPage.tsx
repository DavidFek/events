import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
// import { useRouter } from "next/router";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center align-middle text-center items-center justify-self-center h-screen gap-8 p-4">
      <h1 className="font-bold text-4xl pb-6">Register</h1>
      <RegisterForm />
      <button className="btn" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
}
