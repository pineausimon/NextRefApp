import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, type LoginUserCommand } from '../api/auth.endpoints';
import AuthForm from '../components/auth-form.component';
import Input from '../../../shared/components/Input/input.component';
import { useNotification } from '../../../shared/notification/NotificationProvider';
import { authMessages } from '../models/authMessages';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const loginResponse = await loginUser({ userName, password } as LoginUserCommand);
            showNotification({ type: 'success', message: authMessages.success.login });
            login(loginResponse.data.token);
            return navigate('/home');
        } catch {
            showNotification({ type: 'error', message: authMessages.error.login });
        }
    }

    const handleRegisterLink = () => {
        navigate('/register');
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
                <AuthForm
                    title="Connexion"
                    fields={
                        <>
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
                                autoComplete="current-password"
                            />
                        </>
                    }
                    onSubmit={handleSubmit}
                    mainButtonLabel="Se connecter"
                    secondaryButtonLabel="Créer un compte"
                    onSecondaryClick={handleRegisterLink}
                />
            </div>
        </div>
    );
}
