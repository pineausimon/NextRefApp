import { useState } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/register', { userName, email, password });
      login(res.data.token);
      navigate('/');
    } catch {
      alert('Erreur lors de l\'inscription');
    }
  };
  
  const handleLoginLink = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login"); 
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <button onClick={handleLoginLink}>Se connecter</button>
        <h1 className="text-xl font-bold text-center">Inscription</h1>
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Nom d'utilisateur"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">S'inscrire</button>
      </form>
    </div>
  );
}
