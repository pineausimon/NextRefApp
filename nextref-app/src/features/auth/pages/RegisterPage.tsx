import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth-form.component';
import Input from '../../../shared/components/Input/input.component';

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
            alert("Erreur lors de l'inscription");
        }
    };

    const handleLoginLink = async () => {
        navigate('/login');
    };

    return ( <div className="flex items-center justify-center min-h-[60vh] bg-base-200">
    <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
      <AuthForm
        title="Inscription"
        fields={
          <>
            <Input
              id="email"
              label="Email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              id="username"
              label="Nom d'utilisateur"
              type="text"
              placeholder="Nom d'utilisateur"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
            />
            <Input
              id="password"
              label="Mot de passe"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </>
        }
        onSubmit={handleSubmit}
        mainButtonLabel="S'inscrire"
        secondaryButtonLabel="J'ai déjà un compte"
        onSecondaryClick={handleLoginLink}
      />
    </div>
  </div>
    );
}