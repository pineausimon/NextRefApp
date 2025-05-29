import { useAuth } from '../auth/AuthProvider';

export default function HomePage() {
  const { role, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenue 👋</h1>
      <p>Rôle : {role}</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Se déconnecter
      </button>
    </div>
  );
}
