import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth-form.component';

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
      navigate('/home');
    } catch {
      alert('Erreur lors de l\'inscription');
    }
  };
  
  const handleLoginLink = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login"); 
  };

  return (
      <AuthForm
  title="Inscription"
  fields={
    <>
      <div className="form-field-group">
        <label className="form-field-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="form-field-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-field-group">
        <label className="form-field-label" htmlFor="username">
          Nom d'utilisateur
        </label>
        <input
          id="username"
          className="form-field-input"
          type="text"
          placeholder="Nom d'utilisateur"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="form-field-group">
        <label className="form-field-label" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          className="form-field-input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </>
  }
  onSubmit={handleSubmit}
  mainButtonLabel="S'inscrire"
  secondaryButtonLabel="Se connecter"
  onSecondaryClick={handleLoginLink}
/>
  );
}
