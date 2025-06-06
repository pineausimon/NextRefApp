import { Button } from '../shared/components/Button/button.component';
import { useAuth } from '../features/auth/context/AuthContext';

export function AppNavbar() {
    const { logout } = useAuth();
    return (
        <nav className="navbar-custom">
            <div className="navbar-title">
                <a href="/home" className="btn btn-ghost text-xl font-semibold">NextRef</a>
            </div>
            <div className="navbar-actions">
                <Button variant="secondary" onClick={logout}>
                    Se déconnecter
                </Button>
            </div>
        </nav>
    );
}