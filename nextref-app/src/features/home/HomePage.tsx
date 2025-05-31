import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

export default function HomePage() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Bienvenue 👋</h1>
      <p>Rôle : {role}</p>
      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/contents")}
        >
          Gérer les contenus
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/collections")}
        >
          Gérer les collections
        </button>
      </div>
      <button
        onClick={logout}
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded"
      >
        Se déconnecter
      </button>
    </div>
  );
}
