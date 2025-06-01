import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';
import Button from '../../shared/components/Button/button.component';

export default function HomePage() {
    const { role } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="p-6 flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">Bienvenue 👋</h1>
            <p>Rôle : {role}</p>
            <div className="flex gap-4 mt-4">
                <Button label="Gérer les contenus" onClick={() => navigate('/contents')} />
                <Button label="Gérer les collections" onClick={() => navigate('/collections')} />
            </div>
        </div>
    );
}
