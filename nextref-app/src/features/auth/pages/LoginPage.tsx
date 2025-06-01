import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, type LoginUserCommand } from '../api/auth.endpoints';
import AuthForm from '../components/auth-form.component';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const loginResponseData = await loginUser({ userName, password } as LoginUserCommand);
            login(loginResponseData.token);
            navigate('/home');
        } catch {
            alert('Erreur lors de la connexion');
        }
    };

    const handleRegisterLink = (e: FormEvent) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <AuthForm
            title="Connexion"
            fields={
                <>
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
                            autoComplete="username"
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
                            autoComplete="current-password"
                        />
                    </div>
                </>
            }
            onSubmit={handleSubmit}
            mainButtonLabel="Se connecter"
            secondaryButtonLabel="S'inscrire"
            onSecondaryClick={handleRegisterLink}
        />
    );
}
